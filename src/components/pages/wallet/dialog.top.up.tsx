'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Coins, Plus} from "lucide-react";
import {Button} from "@/components/ui/button";
import FormTopUp from "@/components/pages/wallet/form.top.up";
import {useState} from "react";
import VietQRDialog from "@/components/pages/wallet/viet.qr.dialog";
import {TTransactionTopUp} from "@/types/data";

const DialogTopUp = ({userId}: { userId: number }) => {
    const [open, setOpen] = useState(false);
    const [openQR, setOpenQR] = useState(false);
    const [dataTopUp, setDataTopUp] = useState<TTransactionTopUp | null>(null);

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button>
                        <Plus />
                        Top up
                    </Button>
                </DialogTrigger>
                <DialogContent className='h-[80vh] px-0'>
                    <div className='overflow-y-auto custom-scroll px-6 space-y-6'>
                        <DialogHeader>
                            <DialogTitle className="flex items-center space-x-2">
                                <Coins className="h-5 w-5 text-primary"/>
                                <span>Top Up Points</span>
                            </DialogTitle>
                            <DialogDescription>
                                Add funds to your account and convert them to points for campaigns
                            </DialogDescription>
                        </DialogHeader>

                        <FormTopUp
                            userId={userId}
                            onSuccess={(data: TTransactionTopUp) => {
                                setDataTopUp(data);
                                setOpen(false);
                                setOpenQR(true);
                            }}
                            onClose={() => setOpen(false)}
                        />
                    </div>
                </DialogContent>
            </Dialog>

            <VietQRDialog
                open={openQR}
                onOpenChange={setOpenQR}
                dataTopUp={dataTopUp}
            />
        </>
    );
};

export default DialogTopUp;
