"use client";

import { useEffect, useState } from "react";

interface UserInfo {
    id: string;
    name: string;
    role: string;
}

export function useUserInfoFromCookie(): UserInfo | null {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    useEffect(() => {
        try {
            const cookies = document.cookie.split("; ");
            const cipCookie = cookies.find((row) => row.startsWith("CIPUserInfo="));
            if (!cipCookie) return;

            const raw = cipCookie.split("=")[1];
            const decoded = decodeURIComponent(raw);
            const parsed = JSON.parse(decoded);

            if (parsed?.id && parsed?.role && parsed?.name) {
                setUserInfo(parsed);
            }
        } catch (err) {
            console.error("Error reading cookie CIPUserInfo:", err);
            setUserInfo(null);
        }
    }, []);

    return userInfo;
}
