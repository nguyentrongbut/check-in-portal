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
import {createVoucher} from "@/lib/actions/voucher";
import {useScrollToFirstError} from "@/hooks/useScrollToFirstError";
import {uploadImage} from "@/lib/actions/uploadImg";
import {mergeDateAndTime} from "@/utils/helpersDateTime";
import {useDateValidation} from "@/hooks/useDateValidation";

export const voucherSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    imageUrl: z.union([
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
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
    isPublished: z.boolean(),
}).refine((data) => {
    if (!data.startDate || !data.endDate || !data.startTime || !data.endTime) return true;

    const start = mergeDateAndTime(data.startDate, data.startTime);
    const end = mergeDateAndTime(data.endDate, data.endTime);

    return start < end;
}, {
    message: "End date & time must be after start date & time",
    path: ["endTime"],
});

export type CreateVoucherForm = z.infer<typeof voucherSchema>;

const FormCreateVoucher = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const form = useForm<CreateVoucherForm>({
        resolver: zodResolver(voucherSchema),
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: {
            title: '',
            description: '',
            imageUrl: '',
            discountType: 'fixed',
            discountValue: 0,
            minOrderValue: 0,
            maxDiscount: undefined,
            pointCost: 0,
            quantity: 1,
            startDate: undefined,
            endDate: undefined,
            startTime: "",
            endTime: "",
            isPublished: false
        },
    });

    const startDate = form.watch("startDate");

    const onSubmit = async (values: CreateVoucherForm) => {
        setIsSubmitting(true);
        try {
            let imgUrl: string;

            if (values.imageUrl instanceof File) {
                const uploaded = await uploadImage(values.imageUrl);
                if (!uploaded) {
                    toast.error('Image upload failed. Please try again.');
                    return;
                }
                imgUrl = uploaded;
            } else {
                imgUrl = values.imageUrl;
            }

            const payload = {
                ...values,
                imageUrl: imgUrl
            }

            const result = await createVoucher(payload);

            if (result === 200) {
                toast.success("Voucher created successfully");
                router.push("/admin/voucher");
                return
            }

            toast.error("Create new voucher fail!");
            router.push("/admin/voucher");
        } catch (error) {
            toast.error("Failed to create voucher");
        } finally {
            setIsSubmitting(false);
        }
    };

    useScrollToFirstError(form);
    useDateValidation(form);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-2.5"
                  onKeyDown={(e) => {
                      if (e.key === "Enter" && e.target instanceof HTMLInputElement) {
                          e.preventDefault();
                      }
                  }}>
                <FormField name="title" control={form.control} render={({field}) => (
                    <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl><Input {...field} placeholder='e.g. 20% Off at Highlands'/></FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    <FormField
                        name="startDate"
                        control={form.control}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Start Date</FormLabel>
                                <FormControl>
                                    <CalendarDate value={field.value} onChange={field.onChange}
                                                  placeholder='Select start date'/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="startTime"
                        control={form.control}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Start Time</FormLabel>
                                <FormControl>
                                    <Input type="time"  {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="endDate"
                        control={form.control}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>End Date</FormLabel>
                                <FormControl>
                                    <CalendarDate
                                        value={field.value}
                                        onChange={field.onChange}
                                        placeholder="Select end date"
                                        disabled={!startDate} // disable when don't select startDate
                                        minDate={startDate}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="endTime"
                        control={form.control}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>End Time</FormLabel>
                                <FormControl>
                                    <Input type="time" {...field} disabled={!startDate}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
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
                            <FormControl>
                                <Input type="number" {...field}
                                       onChange={(e) => {
                                           const value = e.target.value;
                                           field.onChange(value === "" ? undefined : e.target.valueAsNumber);
                                       }}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField name="minOrderValue" control={form.control} render={({field}) => (
                        <FormItem>
                            <FormLabel>Minimum Order Value</FormLabel>
                            <FormControl>
                                <Input type="number"   {...field}
                                       onChange={(e) => {
                                           const value = e.target.value;
                                           field.onChange(value === "" ? undefined : e.target.valueAsNumber);
                                       }}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>

                    <FormField name="maxDiscount" control={form.control} render={({field}) => (
                        <FormItem>
                            <FormLabel>Maximum Discount</FormLabel>
                            <FormControl>
                                <Input type="number"   {...field}
                                       onChange={(e) => {
                                           const value = e.target.value;
                                           field.onChange(value === "" ? undefined : e.target.valueAsNumber);
                                       }}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField name="quantity" control={form.control} render={({field}) => (
                        <FormItem>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                                <Input type="number"   {...field}
                                       onChange={(e) => {
                                           const value = e.target.value;
                                           field.onChange(value === "" ? undefined : e.target.valueAsNumber);
                                       }}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>

                    <FormField name="pointCost" control={form.control} render={({field}) => (
                        <FormItem>
                            <FormLabel>Point Cost</FormLabel>
                            <FormControl
                            ><Input type="number"   {...field}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        field.onChange(value === "" ? undefined : e.target.valueAsNumber);
                                    }}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField name="imageUrl" control={form.control} render={({field}) => (
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
                    <Link href="/admin/voucher">
                        <Button variant="outline" type="button" disabled={isSubmitting}>Cancel</Button>
                    </Link>
                    <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
                        Create Voucher
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default FormCreateVoucher;