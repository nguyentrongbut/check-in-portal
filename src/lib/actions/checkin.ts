'use server'

const url = `${process.env.API_URL}/check-ins`;

export async function getCheckIn(campaignId: number) {
    try {
        const res = await fetch(`${url}?campaignId=${campaignId}`, {
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
        console.error('Failed when get campaigns:', err);
        throw err;
    }
}