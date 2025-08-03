'use client'

import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import React, {useState} from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {Textarea} from "@/components/ui/textarea";
import CalendarDate from "@/components/pages/campaign/calendar.date";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Switch} from "@/components/ui/switch";
import UploadImage from "@/components/common/upload.image";
import {fileToBase64} from "@/utils/convertFileToBase64";
import {TVoucher} from "@/types/data";
import {updateVoucher} from "@/lib/actions/voucher";

export const voucherSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    image: z.union([
        z.string().url("Image must be a valid URL or an uploaded image file."),
        z.instanceof(File)
    ]),
    discountType: z.enum(["fixed", "percent"]),
    discountValue: z.number().min(0),
    minOrderValue: z.number().min(0),
    maxDiscount: z.number().min(0).optional(),
    pointCost: z.number().min(0),
    quantity: z.number().min(1),
    startDate: z.date(),
    endDate: z.date(),
    isPublished: z.boolean()
});

export type UpdateVoucherForm = z.infer<typeof voucherSchema>;

const FormEditVoucher = ({voucher}:{voucher: TVoucher}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const form = useForm<UpdateVoucherForm>({
        resolver: zodResolver(voucherSchema),
        defaultValues: {
            title: voucher?.title,
            description: voucher?.description,
            image: voucher?.image,
            discountType: voucher?.discountType,
            discountValue: voucher?.discountValue,
            minOrderValue: voucher?.minOrderValue,
            maxDiscount: voucher?.maxDiscount,
            pointCost: voucher?.pointCost,
            quantity: voucher?.quantity,
            startDate: new Date(),
            endDate: new Date(),
            isPublished: false
        },
    });

    const onSubmit = async (values: UpdateVoucherForm) => {
        setIsSubmitting(true);
        try {

            let imageBase64 = "";

            if (values.image instanceof File) {
                imageBase64 = await fileToBase64(values?.image);
            } else {
                imageBase64 = values?.image;
            }

            const payload = {
                ...values,
                image: imageBase64
            }

            const result = await updateVoucher(voucher?.id, payload);


            if (result === 200) {
                toast.success("Voucher updated successfully");
                router.push("/voucher");
                return
            }

            toast.error("Update voucher fail!");
        } catch (error) {
            toast.error("Failed to create voucher");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <FormField name="title" control={form.control} render={({field}) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl><Input {...field} placeholder='e.g. 20% Off at Highlands'/></FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>

                    <div className="grid grid-cols-2 gap-4">
                        <FormField name="startDate" control={form.control} render={({field}) => (
                            <FormItem>
                                <FormLabel>Start Date</FormLabel>
                                <FormControl>
                                    <CalendarDate value={field.value} onChange={field.onChange}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                        <FormField name="endDate" control={form.control} render={({field}) => (
                            <FormItem>
                                <FormLabel>End Date</FormLabel>
                                <FormControl>
                                    <CalendarDate value={field.value} onChange={field.onChange}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                    </div>
                </div>

                <FormField name="description" control={form.control} render={({field}) => (
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl><Textarea {...field} placeholder='Description your voucher'/></FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>

                <div className="grid grid-cols-2 gap-4">
                    <FormField name="discountType" control={form.control} render={({field}) => (
                        <FormItem>
                            <FormLabel>Discount Type</FormLabel>
                            <FormControl>
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger className='w-full'>
                                        <SelectValue placeholder="Discount Type"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="fixed">Fixed</SelectItem>
                                        <SelectItem value="percent">Percent</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                    <FormField name="discountValue" control={form.control} render={({field}) => (
                        <FormItem>
                            <FormLabel>Discount Value</FormLabel>
                            <FormControl><Input type="number" {...field} /></FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField name="minOrderValue" control={form.control} render={({field}) => (
                        <FormItem>
                            <FormLabel>Minimum Order Value</FormLabel>
                            <FormControl><Input type="number" {...field} /></FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>

                    <FormField name="maxDiscount" control={form.control} render={({field}) => (
                        <FormItem>
                            <FormLabel>Maximum Discount</FormLabel>
                            <FormControl><Input type="number" {...field} /></FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField name="quantity" control={form.control} render={({field}) => (
                        <FormItem>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl><Input type="number" {...field} /></FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>

                    <FormField name="pointCost" control={form.control} render={({field}) => (
                        <FormItem>
                            <FormLabel>Point Cost</FormLabel>
                            <FormControl><Input type="number" {...field} /></FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField name="image" control={form.control} render={({field}) => (
                        <FormItem>
                            <FormLabel>Image</FormLabel>
                            <FormControl>
                                <UploadImage
                                    className='w-full h-60 rounded-md'
                                    value={field.value}
                                    onChange={field.onChange}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>

                    <FormField name="isPublished" control={form.control} render={({field}) => (
                        <FormItem>
                            <FormLabel>Published</FormLabel>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <Link href="/voucher">
                        <Button variant="outline" type="button" disabled={isSubmitting}>Cancel</Button>
                    </Link>
                    <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
                        Update Voucher
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default FormEditVoucher;