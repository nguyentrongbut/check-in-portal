'use server'

const url = `${process.env.NEXT_PUBLIC_API_URL}/dashboard`;

export async function getDailyCheckins(userId: number) {
    try {
        const res = await fetch(`${url}/dailyCheckins?userId=${userId}`, {
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

        return data?.data?.items;
    } catch (err) {
        console.error('Failed when get daily checkins:', err);
        throw err;
    }
}

export async function getCampaignPoints(userId: number) {
    try {
        const res = await fetch(`${url}/campaignCheckins?userId=${userId}`, {
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

        return data?.data?.items;
    } catch (err) {
        console.error('Failed when get campaign points:', err);
        throw err;
    }
}

export async function getTopMerchants() {
    try {
        const res = await fetch(`${url}/topMerchants`, {
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

        return data?.data?.items;
    } catch (err) {
        console.error('Failed when get Dashboard Metrics:', err);
        throw err;
    }
}

export async function getMonthlyRevenues() {
    try {
        const res = await fetch(`${url}/monthlyRevenues`, {
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

        return data?.data?.items;
    } catch (err) {
        console.error('Failed when get Dashboard Metrics:', err);
        throw err;
    }
}

export async function getDailyRevenues() {
    try {
        const res = await fetch(`${url}/dailyRevenues`, {
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

        return data?.data?.items;
    } catch (err) {
        console.error('Failed when get Dashboard Metrics:', err);
        throw err;
    }
}

export async function getDashboardAdmin() {
    try {
        const res = await fetch(`${url}/dashboardAdmin`, {
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

        return data?.data?.items;
    } catch (err) {
        console.error('Failed when get Dashboard Metrics:', err);
        throw err;
    }
}