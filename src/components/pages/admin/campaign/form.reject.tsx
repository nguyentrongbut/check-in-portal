'use client';

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {DialogClose} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {Textarea} from "@/components/ui/textarea";
import {changeStatusCampaign} from "@/lib/actions/campaign";

const formSchema = z.object({
    reason: z.string().min(10)
});

export type UserFormCreate = z.infer<typeof formSchema>;

const FormReject = ({campaignId, onClose}: {campaignId: number, onClose?: () => void, }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    // 1. Define your form.
    const form = useForm<UserFormCreate>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            reason: ''
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: UserFormCreate) {
        setIsSubmitting(true);
        try {
            const reason = values.reason.trim();
            const rejectedStatus = "rejected";
            const result = await changeStatusCampaign(campaignId, rejectedStatus, reason);
            if (result === 200) {
                toast.success("Campaign reject successfully.");
                router.refresh();
                onClose?.();
                return
            }

            toast.error("Change status campaign fail!");
        } catch (error) {
            console.error('Error reject campaign:', error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Form {...form}>
            <form
                autoComplete="off"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4">
                <FormField name="reason" control={form.control} render={({field}) => (
                    <FormItem>
                        <FormLabel>Rejection Reason</FormLabel>
                        <FormControl>
                            <Textarea {...field} placeholder="Please explain why this campaign is being rejected..." className='mt-2'/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>

                <div className="flex justify-end gap-4 !mt-8">
                    <DialogClose asChild>
                        <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                        variant="destructive"
                        type="submit"
                        isLoading={isSubmitting}
                        disabled={isSubmitting}
                    >
                        Reject Campaign
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default FormReject;