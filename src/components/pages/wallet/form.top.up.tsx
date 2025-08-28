'use client'

import {Button} from "@/components/ui/button";
import {
    Form, FormControl, FormField,
    FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import React, {useState} from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {DialogClose} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {formatNumber} from "@/utils/formatHelpers";
import WalletSummary from "@/components/pages/wallet/wallet.summary";
import {createTransactions} from "@/lib/actions/transaction";

export const formSchema = z.object({
    amount: z.number().min(10, "Amount must be greater than 10"),
});

export type TopUpForm = z.infer<typeof formSchema>;

export type CreateTransactionData = {
    type: string;
    userId: number;
    amount: number;
    point: number;
    description: string;
};

const exchangeRate = 100;
const quickAmounts = [10, 20, 30, 50, 100, 200];

// discount
const discountRules = [
    { minAmount: 50, discount: 0.05 },  // 5% bonus
    { minAmount: 100, discount: 0.1 },  // 10% bonus
    { minAmount: 200, discount: 0.15 }, // 15% bonus
];

const getDiscountRate = (amount: number): number => {
    let discount = 0;
    for (const rule of discountRules) {
        if (amount >= rule.minAmount) {
            discount = rule.discount;
        }
    }
    return discount;
};

const FormTopUp = ({userId, onClose}
                   : { userId: number, onClose?: () => void }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const form = useForm<TopUpForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amount: 10,
        },
    });

    const amountWatch = form.watch("amount");

    // Tính discount %
    const discountRate = getDiscountRate(amountWatch || 0);

    // Tính points (có bonus)
    const pointsToReceive = amountWatch
        ? Math.floor(Number(amountWatch) * exchangeRate * (1 + discountRate))
        : 0;

    const handleQuickAmount = (quickAmount: number) => {
        form.setValue("amount", quickAmount);
    };

    const onSubmit = async (values: TopUpForm) => {
        setIsSubmitting(true);
        try {
            const transactionData: CreateTransactionData = {
                type: 'TOPUP',
                userId,
                amount: values.amount,
                point: pointsToReceive,
                description: `Top up wallet with ${values.amount} USD ${discountRate * 100 ? `+ ${discountRate * 100} % bonus` : ''}`,
            };

            const resultTransaction = await createTransactions(transactionData);

            if (resultTransaction === 200) {
                toast.success("Top up transaction successfully");
                router.push('/wallet');
                onClose?.();
                return;
            }

            toast.error("Top up transaction fail!");
        } catch (error) {
            console.error(error);
            toast.error("Top up error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Quick Amount Selection */}
                <div>
                    <Label className="text-sm font-medium mb-3 block">Quick Select Amount</Label>
                    <div className="grid grid-cols-3 gap-2">
                        {quickAmounts.map((quickAmount) => {
                            const discountRate = getDiscountRate(quickAmount);
                            const basePoints = quickAmount * exchangeRate;
                            const bonusPoints = Math.floor(basePoints * discountRate);
                            const totalPoints = basePoints + bonusPoints;

                            return (
                                <Button
                                    key={quickAmount}
                                    type="button"
                                    onClick={() => handleQuickAmount(quickAmount)}
                                    variant="outline"
                                    className={`h-16 flex flex-col items-center justify-center hover:bg-primary/10 ${
                                        amountWatch === quickAmount ? "border-primary bg-primary/10" : ""
                                    }`}
                                >
                                    <div className="font-medium">{formatNumber(quickAmount)} USD</div>


                                    {/* Nếu có bonus thì hiện thêm */}
                                    {discountRate > 0 ? (
                                            <div className="text-xs text-gray-500">
                                                🎁 {totalPoints.toLocaleString()} pts ({discountRate * 100}%)
                                            </div>
                                    ) : (
                                        <div className="text-xs text-gray-500">
                                            {basePoints.toLocaleString()} pts
                                        </div>

                                    )}
                                </Button>
                            );
                        })}
                    </div>
                </div>

                {/* Amount */}
                <div>
                    <FormField
                        name="amount"
                        control={form.control}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Custom Amount</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type='number'
                                        onChange={(e) => {
                                            const value = parseFloat(e.target.value);
                                            field.onChange(isNaN(value) ? 0 : value);
                                        }}
                                        value={field.value}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-col mt-2 text-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">You will receive:</span>
                            <span className="font-medium text-primary">
                                {formatNumber(pointsToReceive) || 0} points
                            </span>
                        </div>

                        {discountRate > 0 && (
                            <div className="text-green-600 mt-1">
                                🎉 Bonus {discountRate * 100}% points for top up!
                            </div>
                        )}
                    </div>
                </div>

                {/* Summary */}
                {amountWatch && pointsToReceive > 0 && (
                    <WalletSummary
                        amount={amountWatch}
                        pointsToReceive={pointsToReceive}
                        exchangeRate={exchangeRate}
                    />
                )}

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4">
                    <DialogClose asChild>
                        <Button variant="outline" type="button" disabled={isSubmitting}>Cancel</Button>
                    </DialogClose>
                    <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
                        Checkout
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default FormTopUp;
