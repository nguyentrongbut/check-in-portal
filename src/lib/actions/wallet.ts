'use server'

import {CreateTransactionData, TopUpForm} from "@/components/pages/wallet/form.top.up";
import {getTokenFromCookies} from "@/utils/getTokenFromCookies";

const url = `${process.env.API_URL}/wallets`;
const urlApi = `${process.env.NEXT_PUBLIC_API_URL}/transactions`;

// json server
export async function getWallet(userId: number) {
    try {
        const res = await fetch(`${url}?userId=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-cache',
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();

        return data[0];
    } catch (err) {
        console.error('Failed when get wallet:', err);
        throw err;
    }
}

export async function updateWallet(id: number, data: TopUpForm, currentBalance: number, totalCurrentTopup: number) {
    try {

        const {amount} = data;
        const point = amount * 100;
        const balance = currentBalance + point;
        const totalTopup = totalCurrentTopup + point;

        const payload = {
            balance,
            totalTopup,
            updatedAt: new Date(),
        };

        const res = await fetch(`${url}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`HTTP ${res.status}: ${errorText}`);
        }

        return res.status;
    } catch (err) {
        console.error('Failed when update wallet:', err);
        throw err;
    }
}
