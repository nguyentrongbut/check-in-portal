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
import {updateCampaign} from "@/lib/actions/campaign";
import {TCampaign} from "@/types/data";

export const formSchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    startDate: z.date(),
    endDate: z.date(),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
    location: z.string().min(1),
    ssid: z.string().min(1),
    bssid: z.string().min(1),
    rewardPerCheckin: z.number().min(1),
    pointBudget: z.number().min(1),
});

export type UpdateCampaignForm = z.infer<typeof formSchema>;

const FormEditCampaign = ({campaign}:{campaign: TCampaign}) => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const form = useForm<UpdateCampaignForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: campaign?.name,
            description: campaign?.description,
            startDate: campaign?.startDate ? new Date(campaign.startDate) : undefined,
            endDate: campaign?.endDate ? new Date(campaign.endDate) : undefined,
            startTime: campaign?.startTime,
            endTime: campaign?.endTime,
            location: campaign?.location,
            ssid: campaign?.wifi?.ssid,
            bssid: campaign?.wifi?.bssid,
            rewardPerCheckin: campaign?.rewardPerCheckin,
            pointBudget: campaign?.pointBudget,
        },
    });

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
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <FormField name="name" control={form.control} render={({field}) => (
                        <FormItem>
                            <FormLabel>Campaign Name</FormLabel>
                            <FormControl><Input {...field} placeholder="e.g. Coffee Shop Promo"/></FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                    <FormField name="location" control={form.control} render={({field}) => (
                        <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl><Input {...field} placeholder="e.g. Ton That Thuyet"/></FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
                                    <CalendarDate value={field.value} onChange={field.onChange}
                                                  placeholder='Select end date'/>
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
                                    <Input type="time" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
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
                    <FormField name="ssid" control={form.control} render={({field}) => (
                        <FormItem>
                            <FormLabel>Wi-Fi SSID</FormLabel>
                            <FormControl><Input {...field} placeholder="e.g. CoffeeShop_WiFi"/></FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                    <FormField name="bssid" control={form.control} render={({field}) => (
                        <FormItem>
                            <FormLabel>Wi-Fi BSSID (MAC address)</FormLabel>
                            <FormControl><Input {...field} placeholder="e.g. A4:6C:2A:5B:3F:01"/></FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <FormField name="rewardPerCheckin" control={form.control} render={({field}) => (
                        <FormItem>
                            <FormLabel>Points per Check-in</FormLabel>
                            <FormControl><Input type="number" {...field} /></FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                    <FormField name="pointBudget" control={form.control} render={({field}) => (
                        <FormItem>
                            <FormLabel>Total Point Budget</FormLabel>
                            <FormControl><Input type="number" {...field} /></FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <Link href="/campaign">
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