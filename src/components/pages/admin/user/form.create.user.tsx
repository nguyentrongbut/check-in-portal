'use client';

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {DialogClose} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import UploadImage from "@/components/common/upload.image";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Switch} from "@/components/ui/switch";
import {useRouter} from "next/navigation";
import InputPassword from "@/components/common/input.password";
import {createUser} from "@/lib/actions/auth";
import {fileToBase64} from "@/utils/convertFileToBase64";

const roleOptions = ["admin", "merchant", "user"] as const;
const statusOptions = ["active", "inactive", "banned"] as const;

const formSchema = z.object({
    avatar: z.union([
        z.string().url("Avatar must be a valid URL or an uploaded image file."),
        z.instanceof(File)
    ]),
    name: z.string().min(4, 'Name must be at least 4 characters long'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    address: z.string().min(1, 'Address cannot be empty'),
    role: z.enum(roleOptions),
    status: z.enum(statusOptions),
    password: z.string()
        .min(12, 'Password must be at least 12 characters long')
        .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
});

export type UserFormCreate = z.infer<typeof formSchema>;

const FormCreateUser = ({onClose}: {onClose?: () => void, }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    // 1. Define your form.
    const form = useForm<UserFormCreate>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            avatar:  '',
            name: '',
            email: '',
            phone: '',
            address: '',
            role: 'merchant',
            status: 'active',
            password: 'UserUser123@.',
            confirmPassword: 'UserUser123@.',
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: UserFormCreate) {
        setIsSubmitting(true);
        try {
            let imageBase64 = "";

            if (values?.avatar instanceof File) {
                imageBase64 = await fileToBase64(values?.avatar);
            } else {
                imageBase64 = values?.avatar;
            }

            const payload = {
                ...values,
                avatar: imageBase64
            }

            const result = await createUser(payload);
            if (!result) return toast.error('Create user failed. Please try again.');
            if (result === 201) {
                router.refresh()
                toast.success('Create user successfully.');
                onClose?.();
            }
        } catch (error) {
            console.error('Error when create user:', error);
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
                    name="avatar"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Avatar</FormLabel>
                            <FormControl>
                                <UploadImage value={field.value} onChange={field.onChange}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
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
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <InputPassword
                                    placeholder="Enter your password"
                                    {...field}
                                ></InputPassword>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <InputPassword
                                    placeholder="Confirm your password"
                                    {...field}
                                ></InputPassword>
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
                        Create User
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default FormCreateUser;