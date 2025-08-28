'use server'

import {CreateVoucherForm} from "@/components/pages/voucher/form.create.voucher";
import {UpdateVoucherForm} from "@/components/pages/voucher/form.edit.voucher";
import {getTokenFromCookies} from "@/utils/getTokenFromCookies";

const url = `${process.env.NEXT_PUBLIC_API_URL}/v1/vouchers`;

export async function getVouchers() {
    try {
        const token = await getTokenFromCookies();

        const res = await fetch(`${url}`, {
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

        return data;
    } catch (err) {
        console.error('Failed when get vouchers:', err);
        throw err;
    }
}

export async function getVoucher(id: number) {
    try {
        const token = await getTokenFromCookies();

        const res = await fetch(`${url}/${id}`, {
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

        return data;
    } catch (err) {
        console.error('Failed when get voucher:', err);
        throw err;
    }
}

export async function createVoucher(data: CreateVoucherForm) {
    try {
        const token = await getTokenFromCookies();

        const payload = {
            ...data,
            claimed: 0,
            status: 'ACTIVE',
        };

        const res = await fetch(url, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
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
        const token = await getTokenFromCookies();

        const payload = {
            ...data,
            claimed: 0,
            status: 'ACTIVE',
        };

        const res = await fetch(`${url}/${id}`, {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        console.log('res:: ', res)

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
        const token = await getTokenFromCookies();

        const res = await fetch(`${url}/${id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`,
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