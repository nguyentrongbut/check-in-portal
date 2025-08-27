'use server'

import {getTokenFromCookies} from "@/utils/getTokenFromCookies";

const url = `${process.env.NEXT_PUBLIC_API_URL}/check-ins`;

export async function getCheckIn(campaignId: number) {
    try {
        const token = await getTokenFromCookies();

        const res = await fetch(`${url}/campaign/${campaignId}`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            cache: 'no-cache',
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();

        return data?.data;
    } catch (err) {
        console.error('Failed when get campaign:', err);
        throw err;
    }
}