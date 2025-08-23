'use server'

import { cookies } from 'next/headers';

export async function getUserInfoFromCookie()  {
    const cookieStore = await cookies();
    const userInfoRaw = cookieStore.get('CIPUserInfo')?.value;

    if (!userInfoRaw) return null;

    try {
        const userInfo = JSON.parse(userInfoRaw);

        if (userInfo.id && userInfo.role) {
            return userInfo;
        }

        return null;
    } catch (error) {
        console.error('Lỗi khi parse cookie CIPUserInfo:', error);
        return null;
    }
}
