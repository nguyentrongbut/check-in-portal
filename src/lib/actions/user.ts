'use server'

import {GetUsersParams} from "@/app/(page)/admin/user/page";
import {getTokenFromCookies} from "@/utils/getTokenFromCookies";

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