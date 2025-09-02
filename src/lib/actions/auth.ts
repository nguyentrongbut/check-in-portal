'use server'

import {cookies} from "next/headers";
import {LoginForm} from "@/components/pages/auth/form.login";
import {RegisterForm} from "@/components/pages/auth/form.register";

const url = `${process.env.NEXT_PUBLIC_API_URL}/auth`

export async function loginUser(data: LoginForm) {
    try {
        const {email, password} = data
        const cookieStore = await cookies();
        const res = await fetch(`${url}/signin`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password}),
        });

        if (!res.ok) {
            return false;
        }

        const users = await res.json();

        const {id, roles, token} = users;
        const role = roles[0]

        if (role !== 'ROLE_ALLOCATOR' && role !== 'ROLE_ADMIN') {
            return null
        }

        cookieStore.set({
            name: 'CIPUserInfo',
            value: JSON.stringify({id, role}),
            httpOnly: false,
            path: '/',
        });

        cookieStore.set({
            name: 'LHToken',
            value: JSON.stringify({token}),
            httpOnly: true,
            path: '/',
        });

        return users;
    } catch (error) {
        console.error("Login failed:", error);
    }
}

export async function registerUser(data: RegisterForm) {
    const {confirmPassword, ...rest} = data;
    try {
        const payload = {
            ...rest,
            role: 'ALLOCATOR',
        };

        const res = await fetch(`${url}/signup`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload),
        });

        return res.status;
    } catch (err) {
        console.error('Failed when register:', err);
    }
}

export async function logout() {
    try {
        const cookieStore = await cookies();

        cookieStore.delete('CIPUserInfo');
        cookieStore.delete('LHToken')

        return {success: true};
    } catch (err) {
        console.error('Logout failed:', err);
        return {success: false, error: 'Logout failed'};
    }
}

