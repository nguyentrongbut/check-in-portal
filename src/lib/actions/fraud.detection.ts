'use server'

const url = `${process.env.API_URL}/suspiciousCheckins`;

export async function getSuspiciousCheckins() {
    try {
        const res = await fetch(url, {
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
        console.error('Failed when get suspicious Checkins:', err);
        throw err;
    }
}

export async function getSuspiciousCheckin(id: number) {
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
        console.error('Failed when suspicious Checkin:', err);
        throw err;
    }
}

export async function deleteSuspiciousCheckin(id: number) {
    try {
        const res = await fetch(`${url}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to delete suspicious Checkin with ID ${id}. Status: ${res.status}`);
        }

        return true;
    } catch (err) {
        console.error(`Failed when delete suspicious Checkin with ID ${id}:`, err);
        throw err;
    }
}
