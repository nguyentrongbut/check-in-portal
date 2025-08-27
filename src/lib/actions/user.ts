'use server'

import {GetUsersParams} from "@/app/(page)/admin/user/page";
import {getTokenFromCookies} from "@/utils/getTokenFromCookies";
import {UserFormUpdate} from "@/components/pages/admin/user/form.update.user";

const url = `${process.env.NEXT_PUBLIC_API_URL}/users`;

export async function getUsers(params: GetUsersParams = {}) {

    try {
        const token = await getTokenFromCookies();

        const searchParams = new URLSearchParams();
        if (params.keyword) searchParams.append("keyword", params.keyword);
        if (params.role) searchParams.append("role", params.role.toUpperCase());
        if (params.status) searchParams.append("status", params.status.toUpperCase());
        if (params.page !== undefined) searchParams.append("page", params.page.toString());
        if (params.size !== undefined) searchParams.append("size", params.size.toString());

        const res = await fetch(`${url}?${searchParams.toString()}`, {
            method: "GET",
            cache: "no-cache",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
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

export async function getUser(userId: number) {

    try {
        const token = await getTokenFromCookies();

        const res = await fetch(`${url}/${userId}`, {
            method: "GET",
            cache: "no-cache",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch user with ID ${userId}`);
        }

        const user = await res.json();
        return user.data;
    } catch (err) {
        console.error('Failed when get user:', err);
    }
}

export async function updateUser(userId: number, data: UserFormUpdate) {
    try {
        const token = await getTokenFromCookies();

        const { role, status, ...rest } = data;

        const roleData = role === 'merchant' ? 'ALLOCATOR' : role?.toUpperCase()

        const payload = {
            status : status.toUpperCase(),
            role: roleData,
            ...rest
        }

        const res = await fetch(`${url}/${userId}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
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

export async function blockUser(id: number) {
    try {
        const token = await getTokenFromCookies();

        const res = await fetch(`${url}/${id}/block`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to block user with ID ${id}. Status: ${res.status}`);
        }

        return true;
    } catch (err) {
        console.error(`Failed when block user with ID ${id}:`, err);
        throw err;
    }
}

export async function approveUser(id: number) {
    try {
        const token = await getTokenFromCookies();

        const res = await fetch(`${url}/${id}/approve`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to block user with ID ${id}. Status: ${res.status}`);
        }

        return true;
    } catch (err) {
        console.error(`Failed when block user with ID ${id}:`, err);
        throw err;
    }
}
