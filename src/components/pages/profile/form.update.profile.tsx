'use client';

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import toast from "react-hot-toast";
import UploadImage from "@/components/common/upload.image";
import {TUser} from "@/types/data";
import {useRouter} from "next/navigation";
import {updateProfile} from "@/lib/actions/user";


const formSchema = z.object({
    // avatar: z.union([
    //     z.string().url("Avatar must be a valid URL or an uploaded image file."),
    //     z.instanceof(File)
    // ]),
    avatarUrl: z.string().optional(),
    fullName: z.string().min(4, 'Name must be at least 4 characters long'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    // address: z.string().min(1, 'Address cannot be empty'),
});

export type UpdateProfileForm = z.infer<typeof formSchema>;

const FormUpdateProfile = ({userInfo}: { userInfo: TUser }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();

    // 1. Define your form.
    const form = useForm<UpdateProfileForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            avatarUrl: userInfo?.avatarUrl || '',
            fullName: userInfo?.fullName ?? '',
            email: userInfo?.email ?? '',
            phone: userInfo?.phone ?? '',
            // address: userInfo?.address ?? '',
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: UpdateProfileForm) {
        setIsSubmitting(true);
        try {
            // let imageBase64 = "";
            //
            // if (values?.avatarUrl instanceof File) {
            //     imageBase64 = await fileToBase64(values?.avatarUrl);
            // } else {
            //     imageBase64 = values?.avatarUrl;
            // }

            const role = userInfo?.role.toLowerCase() === 'merchant' ? 'ALLOCATOR' : userInfo?.role;

            const payload = {
                ...values,
                avatarUrl: ''
            }

            const result = await updateProfile(userInfo?.id, payload, role)

            if (!result) return toast.error('Update profile failed. Please try again.');

            if (result === 200) {
                router.refresh()
                toast.success('Update profile successfully.');
            }

        } catch (error) {
            console.error('Error when update profile:', error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Form {...form}>
            <form
                autoComplete="off"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2 mt-4">
                <FormField
                    control={form.control}
                    name="avatarUrl"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Avatar</FormLabel>
                            <FormControl>
                                <div className="flex items-center gap-4">
                                    <UploadImage value={field.value} onChange={field.onChange} className='size-24'/>
                                    <div>
                                        <h3 className="font-medium">Profile Picture</h3>
                                        <p className="text-sm text-gray-600">Upload a new profile picture. JPG, PNG or
                                            GIF</p>
                                    </div>
                                </div>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="fullName"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Enter your name" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="Enter your email" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Enter your phone" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                {/*<FormField*/}
                {/*    control={form.control}*/}
                {/*    name="address"*/}
                {/*    render={({field}) => (*/}
                {/*        <FormItem>*/}
                {/*            <FormLabel>Address</FormLabel>*/}
                {/*            <FormControl>*/}
                {/*                <Input type="text" placeholder="Enter your address" {...field} />*/}
                {/*            </FormControl>*/}
                {/*            <FormMessage/>*/}
                {/*        </FormItem>*/}
                {/*    )}*/}
                {/*/>*/}
                <div className="flex justify-end gap-4">
                    <Button onClick={() => router.back()} type="button" variant="outline">Cancel</Button>

                    <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
                        Update Profile
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default FormUpdateProfile;