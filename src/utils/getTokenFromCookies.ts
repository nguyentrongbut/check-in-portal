'use server'

import { cookies } from "next/headers";

export async function getTokenFromCookies() {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("LHToken");

    if (!tokenCookie) {
        throw new Error("No token found in cookies");
    }

    try {
        const { token } = JSON.parse(tokenCookie.value);
        return token as string;
    } catch (error) {
        throw new Error("Invalid token format in cookies");
    }
}
