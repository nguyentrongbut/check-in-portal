'use client'

import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import React, {useEffect, useState} from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {Textarea} from "@/components/ui/textarea";
import CalendarDate from "@/components/pages/campaign/calendar.date";
import {createCampaign} from "@/lib/actions/campaign";
import LocationPickerWrapper from "@/components/pages/campaign/create/location-picker.wrapper";
import FormLabelTooltip from "@/components/common/form.label.tooltip";


export const formSchema = z.object({
    name: z.string().min(1, { message: "Campaign name is required" }),
    description: z.string().optional(),
    startDate: z.date(),
    endDate: z.date(),
    location: z.object({
        lat: z.number(),
        lng: z.number(),
    }).nullable().refine((val) => val !== null, {
        message: "Location is required",
    }),
    requiredWifiSsid: z.string().min(1, { message: "Wi-Fi SSID is required" }),
    requiredWifiBssid: z.string().min(1, { message: "Wi-Fi BSSID is required" }),
    pointsPerCheckin: z.number().min(1, { message: "Points per check-in must be at least 1" }),
    totalBudget: z.number().min(10, { message: "Total budget must be at least 10" }),
}).refine((data) => {
    if (!data.startDate || !data.endDate) return true;
    const minDate = new Date(data.startDate.getTime() + 24 * 60 * 60 * 1000);
    return data.endDate >= minDate;
}, {
    message: "End Date must be at least 1 day after Start Date",
    path: ["endDate"],
});


export type CreateCampaignForm = z.infer<typeof formSchema>;

const FormCreateCampaign = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const form = useForm<CreateCampaignForm>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: {
            name: "",
            description: "",
            startDate: undefined,
            endDate: undefined,
            location: null,
            requiredWifiSsid: "",
            requiredWifiBssid: "",
            pointsPerCheckin: 10,
            totalBudget: 10
        },
    });

    const { setFocus } = form;

    const onSubmit = async (values: CreateCampaignForm) => {
        setIsSubmitting(true);
        try {

            const result = await createCampaign(values);

            if (result === 200) {
                toast.success("Campaign created successfully");
                router.push("/campaign");
                return
            }

            toast.error("Create new campaign fail!");

        } catch (error) {
            console.error(error);
            toast.error("Campaign creation error");
        } finally {
            setIsSubmitting(false);
        }
    };


    // scroll first error
    useEffect(() => {
        const firstError = Object.keys(form.formState.errors)[0] as keyof CreateCampaignForm;
        if (firstError) {
            setFocus(firstError);
        }
    }, [form.formState.errors, setFocus]);


    // Reset endDate if startDate change and invalid
    useEffect(() => {
        const startDate = form.watch("startDate");
        const endDate = form.watch("endDate");

        if (startDate && endDate) {
            const minDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);
            if (endDate < minDate) {
                form.setValue("endDate", minDate);
            }
        }
    }, [form.watch("startDate")]);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2.5"
                onKeyDown={(e) => {
                    if (e.key === "Enter" && e.target instanceof HTMLInputElement) {
                        e.preventDefault();
                    }
                }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <FormField name="name" control={form.control} render={({field}) => (
                        <FormItem>
                            <FormLabel>Campaign Name</FormLabel>
                            <FormControl><Input {...field} placeholder="e.g. Coffee Shop Promo"/></FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <FormField name="pointsPerCheckin" control={form.control} render={({field}) => (
                            <FormItem>
                                <FormLabelTooltip
                                    label='Points per Check-in'
                                    description='This value determines how many points a user receives for each check-in they complete. Higher points encourage more frequent check-ins.'
                                />
                                <FormControl>
                                    <Input
                                        type="number"
                                        {...field}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            field.onChange(value === "" ? undefined : e.target.valueAsNumber);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                        <FormField name="totalBudget" control={form.control} render={({field}) => (
                            <FormItem>
                                <FormLabelTooltip
                                    label='Total Point Budget'
                                    description='This value defines the total number of points a user can accumulate from completing check-ins. A higher point budget allows users to earn more rewards over time, encouraging consistent engagement and participation.'
                                />
                                <FormControl>
                                    <Input
                                        type="number"
                                        {...field}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            field.onChange(value === "" ? undefined : e.target.valueAsNumber);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                        name="endDate"
                        control={form.control}
                        render={({ field }) => {
                            const startDate = form.watch("startDate");

                            const minDate = startDate
                                ? new Date(startDate.getTime() + 24 * 60 * 60 * 1000)
                                : undefined;

                            return (
                                <FormItem>
                                    <FormLabel>End Date</FormLabel>
                                    <FormControl>
                                        <CalendarDate
                                            value={field.value}
                                            onChange={field.onChange}
                                            placeholder="Select end date"
                                            disabled={!startDate}
                                            minDate={minDate}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                        }}
                    />

                </div>

                <FormField name="description" control={form.control} render={({field}) => (
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Textarea {...field} placeholder="Description your campaign..."/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <FormField name="requiredWifiSsid" control={form.control} render={({field}) => (
                        <FormItem>
                            <FormLabelTooltip
                                label="Wi-Fi SSID"
                                description="The SSID (Service Set Identifier) is the name of the Wi-Fi network. This value helps users identify and connect to the correct network. Make sure to enter the correct SSID to ensure a stable connection."
                            />
                            <FormControl><Input {...field} placeholder="e.g. CoffeeShop_WiFi"/></FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                    <FormField name="requiredWifiBssid" control={form.control} render={({field}) => (
                        <FormItem>
                            <FormLabelTooltip
                                label="Wi-Fi BSSID (MAC address)"
                                description="The BSSID is the MAC address of the Wi-Fi access point (AP). This unique identifier helps devices connect to the correct AP in a network with multiple access points. Ensure that you enter the correct BSSID to avoid connection issues."
                            />
                            <FormControl><Input {...field} placeholder="e.g. A4:6C:2A:5B:3F:01"/></FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                </div>

                <FormField name="location" control={form.control} render={({field}) => (
                    <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                            <LocationPickerWrapper value={field.value} onChange={field.onChange}/>
                        </FormControl>
                    </FormItem>
                )}/>

                <div className="flex justify-end gap-3 pt-4">
                    <Link href="/campaign">
                        <Button variant="outline" type="button" disabled={isSubmitting}>Cancel</Button>
                    </Link>
                    <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
                        Create Campaign
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default FormCreateCampaign