'use server'

import {CreateTransactionData} from "@/components/pages/wallet/form.top.up";
import {getTokenFromCookies} from "@/utils/getTokenFromCookies";

const url = `${process.env.API_URL}/transactions`;
const urlApi = `${process.env.NEXT_PUBLIC_API_URL}/transactions`;

// api
export async function createTransactions(data: CreateTransactionData) {
    try {
        const token = await getTokenFromCookies();

        const res = await fetch(`${urlApi}/create`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`HTTP ${res.status}: ${errorText}`);
        }

        return res.status;
    } catch (err) {
        console.error('Failed when top up wallet:', err);
        throw err;
    }
}

export async function getTransactions() {
    try {
        const token = await getTokenFromCookies();

        const res = await fetch(`${urlApi}/get-all?page=0&size=10`, {
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
        console.error('Failed when get transaction:', err);
        throw err;
    }
}

