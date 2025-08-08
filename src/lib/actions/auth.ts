'use server'

import {cookies} from "next/headers";
import {LoginForm} from "@/components/pages/auth/form.login";
import {RegisterForm} from "@/components/pages/auth/form.register";
import {UpdateProfileForm} from "@/components/pages/profile/form.update.profile";
import {TStatusUser} from "@/types/data";
import {UserFormUpdate} from "@/components/pages/admin/user/form.update.user";
import {UserFormCreate} from "@/components/pages/admin/user/form.create.user";

const url = `${process.env.API_URL}/users`;

export async function getUsers() {
    try {
        const res = await fetch(url, {
            method: "GET",
            cache: "no-cache",
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch list user`);
        }

        const user = await res.json();
        return user;
    } catch (err) {
        console.error('Failed when get list user:', err);
    }
}

export async function updateStatus(userId: number, status: TStatusUser, reason?: string) {
    try {
        if (!reason) {
            reason = '';
        }

        const payload = {
            status,
            reason,
            updatedAt: new Date(),
        };

        const res = await fetch(`${url}/${userId}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            throw new Error(`Failed to update status with ID ${userId}`);
        }

        return res.status;
    } catch (err) {
        console.error('Failed when update status:', err);
    }
}

export async function getUser(userId: number) {
    try {
        const res = await fetch(`${url}/${userId}`, {
            method: "GET",
            cache: "no-cache",
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch user with ID ${userId}`);
        }

        const user = await res.json();
        return user;
    } catch (err) {
        console.error('Failed when get user:', err);
    }
}

export async function createUser(data: UserFormCreate) {
    const {confirmPassword, ...rest} = data;
    try {
        const payload = {
            ...rest,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const res = await fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload),
        });

        return res.status;
    } catch (err) {
        console.error('Failed when create user:', err);
    }
}

export async function updateProfile(userId: number, data: UpdateProfileForm) {
    try {
        const payload = {
            ...data,
            updatedAt: new Date(),
        };

        const res = await fetch(`${url}/${userId}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            throw new Error(`Failed to update user with ID ${userId}`);
        }

        return res.status;
    } catch (err) {
        console.error('Failed when update profile:', err);
    }
}

export async function updateUser(userId: number, data: UserFormUpdate) {
    try {
        const payload = {
            ...data,
            updatedAt: new Date(),
        };

        const res = await fetch(`${url}/${userId}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            throw new Error(`Failed to update user with ID ${userId}`);
        }

        return res.status;
    } catch (err) {
        console.error('Failed when update user:', err);
    }
}

export async function deleteUser(id: number) {
    try {
        const res = await fetch(`${url}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to delete user with ID ${id}. Status: ${res.status}`);
        }

        return true;
    } catch (err) {
        console.error(`Failed when delete user with ID ${id}:`, err);
        throw err;
    }
}

//  auth actions

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

        return res.status;
    } catch (err) {
        console.error('Failed when register:', err);
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

        if (role !== 'merchant' && role !== 'admin') {
            return null
        }

        cookieStore.set({
            name: 'CIPUserInfo',
            value: JSON.stringify({id, role, name}),
            httpOnly: false,
            path: '/',
        });

        return users[0];
    } catch (error) {
        console.error("Login failed:", error);
    }
}

export async function logout() {
    try {
        const cookieStore = await cookies();

        cookieStore.delete('CIPUserInfo');

        return {success: true};
    } catch (err) {
        console.error('Logout failed:', err);
        return {success: false, error: 'Logout failed'};
    }
}

