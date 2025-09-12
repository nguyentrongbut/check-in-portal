'use server'

const url = `${process.env.API_URL}`;
const urlDashboard = `${process.env.NEXT_PUBLIC_API_URL}/dashboard`;

export async function getCampaignCheckins(userId: number) {
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

        return data[0];
    } catch (err) {
        console.error('Failed when get campaign checkins:', err);
        throw err;
    }
}


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

        return data[0];
    } catch (err) {
        console.error('Failed when get daily checkins:', err);
        throw err;
    }
}

export async function getMapCheckins(userId: number) {
    try {
        const res = await fetch(`${url}/mapCheckins?userId=${userId}`, {
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
        console.error('Failed when get map checkins:', err);
        throw err;
    }
}

export async function getCampaignPoints(userId: number) {
    try {
        const res = await fetch(`${url}/campaignPoints?userId=${userId}`, {
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
        console.error('Failed when get campaign points:', err);
        throw err;
    }
}

export async function getDashboardMetrics(userId: number) {
    try {
        const res = await fetch(`${url}/dashboardMetrics?userId=${userId}`, {
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
        console.error('Failed when get Dashboard Metrics:', err);
        throw err;
    }
}

export async function getTopMerchants() {
    try {
        const res = await fetch(`${urlDashboard}/topMerchants`, {
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
        const res = await fetch(`${urlDashboard}/monthlyRevenues`, {
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
        const res = await fetch(`${urlDashboard}/dailyRevenues`, {
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

        return data;
    } catch (err) {
        console.error('Failed when get Dashboard Metrics:', err);
        throw err;
    }
}