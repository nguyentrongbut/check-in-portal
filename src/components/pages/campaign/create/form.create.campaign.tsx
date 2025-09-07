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
import useWalletBalance from "@/hooks/useWalletBalance";
import {mergeDateAndTime} from "@/utils/helpersDateTime";
import {useDateValidation} from "@/hooks/useDateValidation";
import {useScrollToFirstError} from "@/hooks/useScrollToFirstError";
import {calculateCheckins, calculatePointsPerCheckin, calculateTotalBudget} from "@/utils/helpersCampaign";


export const formSchema = z.object({
    name: z.string().min(1, {message: "Campaign name is required"}),
    description: z.string().optional(),
    startDate: z.date(),
    endDate: z.date(),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
    location: z.object({
        lat: z.number(),
        lng: z.number(),
    }).nullable().refine((val) => val !== null, {
        message: "Location is required",
    }),
    requiredWifiSsid: z.string().min(1, {message: "Wi-Fi SSID is required"}),
    requiredWifiBssid: z.string().min(1, {message: "Wi-Fi BSSID is required"}),
    pointsPerCheckin: z.number().min(1, {message: "Points per check-in must be at least 1"}),
    requiredCheckins: z.number().min(1, {message: "Required check-ins must be at least 1"}),
    totalBudget: z.number().min(10, {message: "Total budget must be at least 10"}),
    radiusMeters: z.number().min(1, {message: "Radius must be at least 1m"})
}).refine((data) => {
    if (!data.startDate || !data.endDate || !data.startTime || !data.endTime) return true;

    const start = mergeDateAndTime(data.startDate, data.startTime);
    const end = mergeDateAndTime(data.endDate, data.endTime);

    return start < end;
}, {
    message: "End date & time must be after start date & time",
    path: ["endTime"],
});


export type CreateCampaignForm = z.infer<typeof formSchema>;

const FormCreateCampaign = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const {balance, loading} = useWalletBalance();

    const form = useForm<CreateCampaignForm>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: {
            name: "",
            description: "",
            startDate: undefined,
            endDate: undefined,
            startTime: "",
            endTime: "",
            location: null,
            requiredWifiSsid: "",
            requiredWifiBssid: "",
            pointsPerCheckin: 10,
            requiredCheckins: 1,
            totalBudget: 0,
            radiusMeters: 1,
        },
    });

    const startDate = form.watch("startDate");
    const pointsPerCheckin = form.watch("pointsPerCheckin");
    const requiredCheckins = form.watch("requiredCheckins");

    useScrollToFirstError(form);
    useDateValidation(form);

    useEffect(() => {
        const total = calculateTotalBudget(pointsPerCheckin, requiredCheckins);
        form.setValue("totalBudget", total, {shouldValidate: true});
    }, [pointsPerCheckin, requiredCheckins, form]);

    const maxCheckins = calculateCheckins(balance ?? 0, pointsPerCheckin);
    const maxPoints = calculatePointsPerCheckin(balance ?? 0, requiredCheckins);

    const onSubmit = async (values: CreateCampaignForm) => {
        setIsSubmitting(true);
        try {

            const result = await createCampaign(values);

            if (result === 200) {
                toast.success(" Campaign created successfully. Please wait for admin approval.");
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
                                            const value = e.target.valueAsNumber;

                                            if (!loading && balance !== null && value > maxPoints) {
                                                field.onChange(maxPoints);
                                            } else if (value < 1) {
                                                field.onChange(1);
                                            } else {
                                                field.onChange(value);
                                            }
                                        }}
                                        placeholder={
                                            loading ? "Loading..." : `Max point per checkins: ${maxPoints}`
                                        }
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                        <FormField
                            name="radiusMeters"
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabelTooltip
                                        label="Radius (m)"
                                        description="This value defines the radius around the campaign location within which users are allowed to check in. A smaller radius ensures more precise check-ins, while a larger radius allows more flexibility for users who are nearby."
                                    />
                                    <FormControl>
                                        <Input
                                            type="number"
                                            {...field}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                field.onChange(value === "" ? undefined : e.target.valueAsNumber);
                                            }}
                                            placeholder="Enter required radius in meters"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                    </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                    <FormField name="requiredCheckins" control={form.control} render={({field}) => (
                        <FormItem>
                            <FormLabelTooltip
                                label='Required Check-ins'
                                description='Number of check-ins required for this campaign.'
                            />
                            <FormControl>
                                <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) => {
                                        const value = e.target.valueAsNumber;

                                        if (!loading && balance !== null && value > maxCheckins) {
                                            field.onChange(maxCheckins);
                                        } else if (value < 1) {
                                            field.onChange(1);
                                        } else {
                                            field.onChange(value);
                                        }
                                    }}
                                    placeholder={
                                        loading ? "Loading..." : `Max checkins: ${maxCheckins}`
                                    }
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                    <FormField name="totalBudget" control={form.control} render={({field}) => (
                        <FormItem>
                            <FormLabelTooltip
                                label='Total Points Needed'
                                description='This value defines the total number of points a user can allocate. It cannot exceed your wallet balance.'
                            />
                            <FormControl>
                                <Input
                                    type="number"
                                    {...field}
                                    disabled
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
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
                                href='https://drive.google.com/file/d/1Nk1P7uJE2P0ur6ZRoTXImrHTatzHX8Dj/view?usp=sharing'
                                label="Wi-Fi SSID"
                                description="The SSID (Service Set Identifier) is the name of the Wi-Fi network. This value helps users identify and connect to the correct network. Make sure to enter the correct SSID to ensure a stable connection. Click here to view guide"
                            />
                            <FormControl><Input {...field} placeholder="e.g. CoffeeShop_WiFi"/></FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                    <FormField name="requiredWifiBssid" control={form.control} render={({field}) => (
                        <FormItem>
                            <FormLabelTooltip
                                href='https://drive.google.com/file/d/1Nk1P7uJE2P0ur6ZRoTXImrHTatzHX8Dj/view?usp=sharing'
                                label="Wi-Fi BSSID (MAC address)"
                                description="The BSSID is the MAC address of the Wi-Fi access point (AP). This unique identifier helps devices connect to the correct AP in a network with multiple access points. Ensure that you enter the correct BSSID to avoid connection issues. Click here to view guide"
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