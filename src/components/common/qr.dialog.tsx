"use client";

import Image from "next/image";
import Link from "next/link";
import { QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import QRCodePrint from "@/components/pages/campaign/detail/qr.code.print";
import {ReactNode} from "react";

interface QRCodeDialogProps {
    qrUrl: string;
    campaignName: string;
    trigger?: ReactNode;
}

export function QRCodeDialog({ qrUrl, campaignName, trigger }: QRCodeDialogProps) {
    return (
        <div onClick={(e) => e.stopPropagation()}>
            <Dialog >
                <DialogTrigger asChild>
                    {trigger ?? (
                        <Button variant="outline" size="sm">
                            <QrCode className="h-4 w-4 mr-1" />
                            QR Code
                        </Button>
                    )}
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>
                        <div className="flex gap-2 items-center text-sm">
                            <QrCode className="size-4 text-primary" />
                            <span>QR Code</span>
                        </div>
                    </DialogTitle>

                    {/* QR hiển thị */}
                    <div className="size-[300px] mx-auto">
                        <Image
                            src={qrUrl}
                            alt="QR Code Local Hunt"
                            width={300}
                            height={300}
                            className="size-full object-contain"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-center gap-2">
                        <DialogClose asChild>
                            <Button variant="outline">Close</Button>
                        </DialogClose>

                        <Link href={qrUrl} download={`qr-code-${campaignName}`}>
                            <Button className="bg-black hover:bg-black/80">
                                Download QR Code
                            </Button>
                        </Link>

                        <QRCodePrint qrCodeUrl={qrUrl} title={campaignName} />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
