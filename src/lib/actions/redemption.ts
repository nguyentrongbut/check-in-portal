'use server'

const url = `${process.env.API_URL}/redemptions`;

export async function getRedemptions(voucherId: number) {
    try {
        const res = await fetch(`${url}?voucherId=${voucherId}`, {
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

        return data;
    } catch (err) {
        console.error('Failed when get redemption:', err);
        throw err;
    }
}