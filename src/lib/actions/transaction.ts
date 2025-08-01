'use server'

const url = `${process.env.API_URL}/transactions`;

export async function getTransactions(userId: number) {
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
        console.error('Failed when get transaction:', err);
        throw err;
    }
}
