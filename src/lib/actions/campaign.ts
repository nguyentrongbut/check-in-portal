'use server'

import {CreateCampaignForm} from "@/components/pages/campaigns/form.create.campaign";

const url = `${process.env.API_URL}/campaigns`;

export async function createCampaign(data: CreateCampaignForm) {
    try {

        const { ssid, bssid, ...rest } = data;

        const payload = {
            ...rest,
            wifi: {
                ssid,
                bssid,
            },
            status: "pending",
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
        console.log(err);
    }
}