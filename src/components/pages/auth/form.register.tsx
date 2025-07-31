'use client'

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {registerUser} from "@/lib/actions/auth";
import toast from "react-hot-toast";
import InputPassword from "@/components/common/input.password";
import {z} from "zod";
import InputIcon from "@/components/common/input.icon";
import {Mail, MapPin, Phone} from "lucide-react";

const formSchema = z.object({
    name: z.string().min(4, 'Name must be at least 4 characters long'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    password: z.string()
        .min(12, 'Password must be at least 12 characters long')
        .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    address: z.string().optional()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export type RegisterForm = z.infer<typeof formSchema>;


const FormRegister = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();

    // 1. Define your form.
    const form = useForm<RegisterForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            address: '',
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: RegisterForm) {
        setIsSubmitting(true);
        try {
            const result = await registerUser(values);
            if (result !== 201) return toast.error('Register failed. Please check your credentials!');

            toast.success('Register successful!');

            return router.push('/login');
        } catch (error) {
            console.error('Register error:', error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Form {...form}>
            <form
                autoComplete="off"
                onSubmit={form.handleSubmit((values) => onSubmit(values))}
                className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
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
                            <FormControl>
                                <InputIcon
                                    icon={<Mail className="size-4"/>}
                                    placeholder="Enter your email"
                                    {...field}
                                ></InputIcon>
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
                            <FormControl>
                                <InputIcon
                                    type="tel"
                                    icon={<Phone className="size-4"/>}
                                    placeholder="Enter your phone number"
                                    {...field}
                                ></InputIcon>
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
                    name="address"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <InputIcon
                                    icon={<MapPin className="size-4"/>}
                                    placeholder="Enter your address"
                                    {...field}
                                ></InputIcon>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <div className='text-sm'>
                    <span className='opacity-60'>You are agreeing to the</span>
                    <span className='text-primary ml-1'>Terms of Services</span> <span className='opacity-60'>and</span>
                    <span className='text-primary ml-1'>Privacy Policy</span>
                </div>

                <Button type="submit" className="w-full" isLoading={isSubmitting} disabled={isSubmitting}>
                    Register
                </Button>
            </form>
        </Form>
    )
}

export default FormRegister