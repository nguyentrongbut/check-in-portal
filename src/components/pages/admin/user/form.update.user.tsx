'use client';

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {DialogClose} from "@/components/ui/dialog";
import {TUser} from "@/types/data";
import toast from "react-hot-toast";
import UploadImage from "@/components/common/upload.image";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Switch} from "@/components/ui/switch";
import {useRouter} from "next/navigation";
// import {fileToBase64} from "@/utils/convertFileToBase64";
import {updateUser} from "@/lib/actions/user";

const roleOptions = ["admin", "merchant", "user"] as const;
const statusOptions = ["active", "inactive", "banned"] as const;

const formSchema = z.object({
    // avatarUrl: z.union([
    //     z.string().url("Avatar must be a valid URL or an uploaded image file."),
    //     z.instanceof(File)
    // ]),
    avatarUrl: z.string().optional(),
    fullName: z.string().min(4, 'Name must be at least 4 characters long'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    address: z.string().min(1, 'Address cannot be empty'),
    role: z.enum(roleOptions),
    status: z.enum(statusOptions),
});

export type UserFormUpdate = z.infer<typeof formSchema>;

const FormUpdateUser = ({infoUser, onClose}: { infoUser: TUser, onClose?: () => void, }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    // 1. Define your form.
    const form = useForm<UserFormUpdate>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            avatarUrl: infoUser.avatar || '',
            fullName: infoUser.fullName ?? '',
            email: infoUser.email ?? '',
            phone: infoUser.phone ?? '',
            address: infoUser.address ?? '',
            role: (infoUser.role.toLowerCase() === 'allocator' ? 'merchant' : infoUser.role.toLowerCase()) as typeof roleOptions[number],
            status: (infoUser.status?.toLowerCase() ?? 'active') as typeof statusOptions[number],
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: UserFormUpdate) {
        setIsSubmitting(true);
        try {
            // let imageBase64 = "";
            //
            // if (values?.avatarUrl instanceof File) {
            //     imageBase64 = await fileToBase64(values?.avatarUrl);
            // } else {
            //     imageBase64 = values?.avatarUrl;
            // }

            const payload = {
                ...values,
                avatarUrl: ''
            }

            const result = await updateUser(infoUser?.id, payload);
            if (!result) return toast.error('Update user failed. Please try again.');
            if (result === 200) {
                router.refresh()
                toast.success('Update user successfully.');
                onClose?.();
            }
        } catch (error) {
            console.error('Error when update user:', error);
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
                <FormField
                    control={form.control}
                    name="avatarUrl"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Avatar</FormLabel>
                            <FormControl>
                                <UploadImage value={field?.value} onChange={field.onChange}/>
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
                <FormField
                    control={form.control}
                    name="address"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Enter your address" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="role"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select role"/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {roleOptions.map((role) => (
                                        <SelectItem key={role} value={role}>
                                            {role.charAt(0).toUpperCase() + role.slice(1)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="status"
                    render={({field}) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel>Status</FormLabel>
                                <p className="text-sm text-muted-foreground">
                                    Toggle user status between Active and Inactive
                                </p>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value === 'active'}
                                    onCheckedChange={(checked) => field.onChange(checked ? 'active' : 'inactive')}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <div className="flex justify-end gap-4 !mt-8">
                    <DialogClose asChild>
                        <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
                        Update User
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default FormUpdateUser;