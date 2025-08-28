"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { generateVietQR } from "@/utils/generateVietQR";

interface VietQRProps {
    amount: number;
    addInfo: string;
}

export default function VietQR({ amount, addInfo }: VietQRProps) {
    const [qrUrl, setQrUrl] = useState<string>("");

    useEffect(() => {
        const url = generateVietQR(amount, addInfo);
        setQrUrl(url);
    }, [amount, addInfo]);

    if (!qrUrl) return <div>Generating QR...</div>;

    return (
        <div className="flex flex-col items-center gap-2">
            <Image
                src={qrUrl}
                alt="VietQR"
                width={350}
                height={350}
                className="rounded-lg border"
            />
            <p className="text-sm text-gray-500">Scan to pay</p>
        </div>
    );
}
