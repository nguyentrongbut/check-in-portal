'use server'

import {cookies} from "next/headers";
import {LoginForm} from "@/components/pages/auth/form.login";
import {RegisterForm} from "@/components/pages/auth/form.register";

const url = `${process.env.API_URL}/users`;

export async function registerUser(data: RegisterForm) {
    const {confirmPassword, ...rest} = data;
    try {
        const payload = {
            ...rest,
            role: 'merchant',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const res = await fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload),
        });

        console.log(res)

        return res.status;
    } catch (err) {
        console.error('Failed when get campaigns:', err);
    }
}

export async function loginUser(data: LoginForm) {
    try {
        const {email, password} = data
        const cookieStore = await cookies();
        const res = await fetch(`${url}?email=${email}&password=${password}`, {
            method: "GET",
            cache: "no-cache",
        });

        if (!res.ok) {
            return res.status;
        }

        const users = await res.json();

        if (!Array.isArray(users) || users.length === 0) {
            throw new Error("Invalid email or password");
        }

        const {id, role, name} = users[0];

        cookieStore.set({
            name: 'CIPUserInfo',
            value: JSON.stringify({id, role, name}),
            httpOnly: true,
            path: '/',
        });

        return users[0];
    } catch (error) {
        console.error("Login failed:", error);
    }
}

export async function logoutUser() {
    try {
        const cookieStore = await cookies();

        cookieStore.delete('CIPUserInfo');

        return {success: true};
    } catch (err) {
        console.error('Logout failed:', err);
        return {success: false, error: 'Logout failed'};
    }
}