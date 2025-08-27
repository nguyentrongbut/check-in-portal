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
import {updateCampaign} from "@/lib/actions/campaign";
import {TCampaign} from "@/types/data";
import LocationPickerWrapper from "@/components/pages/campaign/create/location-picker.wrapper";
import {CreateCampaignForm} from "@/components/pages/campaign/create/form.create.campaign";

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

export type UpdateCampaignForm = z.infer<typeof formSchema>;

const FormEditCampaign = ({campaign, href}:{campaign: TCampaign, href: string}) => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const form = useForm<UpdateCampaignForm>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: {
            name: campaign?.name,
            description: campaign?.description,
            startDate: campaign?.startDate ? new Date(campaign.startDate) : undefined,
            endDate: campaign?.endDate ? new Date(campaign.endDate) : undefined,
            location: {
                lat: campaign?.location?.lat || 0,
                lng: campaign?.location?.lng || 0,
            },
            requiredWifiSsid: campaign?.wifi?.ssid || '',
            requiredWifiBssid: campaign?.wifi?.bssid || '',
            pointsPerCheckin: campaign?.rewardPerCheckin || 10,
            totalBudget: campaign?.pointBudget || 10,
        },
    });

    const { setFocus } = form;

    const onSubmit = async (values: UpdateCampaignForm) => {
        setIsSubmitting(true);
        try {
            const {id} = campaign

            const result = await updateCampaign(id, values);

            if (result === 200) {
                toast.success("Campaign updated successfully");
                router.push(`/campaign/detail/${id}`);
                return
            }

            toast.error("Update new campaign fail!");

        } catch (error) {
            console.error(error);
            toast.error("Campaign update error");
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
                                <FormLabel>Points per Check-in</FormLabel>
                                <FormControl><Input type="number" {...field} /></FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                        <FormField name="totalBudget" control={form.control} render={({field}) => (
                            <FormItem>
                                <FormLabel>Total Point Budget</FormLabel>
                                <FormControl><Input type="number" {...field} /></FormControl>
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
                            <FormLabel>Wi-Fi SSID</FormLabel>
                            <FormControl><Input {...field} placeholder="e.g. CoffeeShop_WiFi"/></FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                    <FormField name="requiredWifiBssid" control={form.control} render={({field}) => (
                        <FormItem>
                            <FormLabel>Wi-Fi BSSID (MAC address)</FormLabel>
                            <FormControl><Input {...field} placeholder="e.g. A4:6C:2A:5B:3F:01"/></FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                </div>

                <FormField name="location" control={form.control} render={({field}) => (
                    <FormItem>
                        <FormLabel>Location (Lat,Lng or Address)</FormLabel>
                        <FormControl>
                            <LocationPickerWrapper value={field.value} onChange={field.onChange}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>

                <div className="flex justify-end gap-3 pt-4">
                    <Link href={href}>
                        <Button variant="outline" type="button" disabled={isSubmitting}>Cancel</Button>
                    </Link>
                    <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
                        Update Campaign
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default FormEditCampaign