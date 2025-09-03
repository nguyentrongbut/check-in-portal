'use client'

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import React, {useState} from "react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {loginUser} from "@/lib/actions/auth";
import toast from "react-hot-toast";
import InputPassword from "@/components/common/input.password";
import {z} from "zod";

const formSchema = z.object({
    email: z.string().email({message: 'Invalid email address'}),
    password: z.string().min(1, 'Password is required'),
});

export type LoginForm = z.infer<typeof formSchema>;


const FormLogin = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();

    // 1. Define your form.
    const form = useForm<LoginForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: LoginForm) {
        setIsSubmitting(true);
        try {
            const result = await loginUser(values);

            if (!result) return toast.error('Login failed. Please check your credentials!');
            const roles = result?.roles[0] || '';

            toast.success('Login successful!');

            if (roles[0] !== 'ROLE_ADMIN') return router.push('/dashboard');
            return router.push('/admin/dashboard');
        } catch (error) {
            toast.error('Login failed. Please check your credentials!');
            console.error('Login error:', error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Form {...form}>
            <form
                autoComplete="off"
                onSubmit={form.handleSubmit((values) => onSubmit(values))}
                className="space-y-3">
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="Enter your email" {...field} />
                            </FormControl>
                            <FormMessage className='min-h-0'/>
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
                            <FormMessage className='min-h-0'/>
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full" isLoading={isSubmitting} disabled={isSubmitting}>
                    Login
                </Button>
            </form>
        </Form>
    )
}

export default FormLogin