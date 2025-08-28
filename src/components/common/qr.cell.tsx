"use client";

import { useEffect, useState } from "react";
import { generateQRCodeBase64 } from "@/utils/generateQRCodeBase64";
import {TCampaign} from "@/types/data";
import {QRCodeDialog} from "@/components/common/qr.dialog";
import { QrCode} from "lucide-react";

export function QRCell({data}: {data: TCampaign}) {
    const [qrUrl, setQrUrl] = useState<string | null>(null);

    const { id, name, startDate, endDate, location, wifi, status} = data

    const qrData = {
        id,
        name,
        startDate,
        endDate,
        location,
        wifi,
        status
    }

    useEffect(() => {
        (async () => {
            const qr = await generateQRCodeBase64(qrData);
            setQrUrl(qr);
        })();
    }, [data]);

    if (!qrUrl) return <div className="text-xs text-gray-400">Generating...</div>;

    return (
        <QRCodeDialog
            trigger={
                <div className="flex items-center gap-2 cursor-pointer text-primary text-sm py-1.5 px-2 hover:bg-accent">
                    <QrCode className="size-4 text-primary"/>
                    <span>QR Code</span>
                </div>
            }
            qrUrl={qrUrl}
            campaignName={name}/>
    );
}
