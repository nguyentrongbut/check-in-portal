'use server'

import {CreateCampaignForm} from "@/components/pages/campaign/create/form.create.campaign";
import {UpdateCampaignForm} from "@/components/pages/campaign/form.edit.campaign";
import QRCode from "qrcode";

const url = `${process.env.API_URL}/campaigns`;

export async function getCampaigns(userId: number) {
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
        console.error('Failed when get campaign:', err);
        throw err;
    }
}

export async function getCampaign(id: number) {
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
        console.error('Failed when get campaign:', err);
        throw err;
    }
}

export async function createCampaign(data: CreateCampaignForm, userId: number) {
    try {

        const { ssid, bssid, ...rest } = data;

        // Generate QR string (tùy chỉnh dữ liệu bạn muốn encode)
        const qrData = JSON.stringify({
            userId
        });

        const qrUrl = await QRCode.toDataURL(qrData);

        const payload = {
            ...rest,
            wifi: {
                ssid,
                bssid,
            },
            status: "pending",
            qrUrl,
            used: 0,
            checkIns: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
            userId
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
        console.error('Failed when create campaign:', err);
        throw err;
    }
}

export async function deleteCampaign(id: number) {
    try {
        const res = await fetch(`${url}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to delete campaign with ID ${id}. Status: ${res.status}`);
        }

        return true;
    } catch (err) {
        console.error(`Failed when delete campaign with ID ${id}:`, err);
        throw err;
    }
}

export async function updateCampaign(id:number, data: UpdateCampaignForm) {
    try {

        const { ssid, bssid, ...rest } = data;

        const payload = {
            ...rest,
            wifi: {
                ssid,
                bssid,
            },
            status: "pending",
            used: 0,
            checkIns: 0,
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
        console.error('Failed when update campaign:', err);
        throw err;
    }
}