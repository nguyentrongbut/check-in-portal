'use server'

import {CreateVoucherForm} from "@/components/pages/voucher/form.create.voucher";
import {UpdateVoucherForm} from "@/components/pages/voucher/form.edit.voucher";

const url = `${process.env.API_URL}/vouchers`;

export async function getVouchers(userId: number) {
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

        return data;
    } catch (err) {
        console.error('Failed when get vouchers:', err);
        throw err;
    }
}

export async function getVoucher(id: number) {
    try {
        const res = await fetch(`${url}/${id}`, {
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
        console.error('Failed when get voucher:', err);
        throw err;
    }
}

export async function createVoucher(data: CreateVoucherForm, userId: number) {
    try {

        const payload = {
            ...data,
            userId,
            claimed: 0,
            status: 'active',
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };

        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        return res.status
    } catch (err) {
        console.error('Failed when create voucher:', err);
        throw err;
    }
}

export async function updateVoucher(id:number, data: UpdateVoucherForm) {
    try {

        const payload = {
            ...data,
            updatedAt: Date.now(),
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
        console.error('Failed when update voucher:', err);
        throw err;
    }
}

export async function deleteVoucher(id: number) {
    try {
        const res = await fetch(`${url}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to delete voucher with ID ${id}. Status: ${res.status}`);
        }

        return true;
    } catch (err) {
        console.error(`Failed when delete voucher with ID ${id}:`, err);
        throw err;
    }
}