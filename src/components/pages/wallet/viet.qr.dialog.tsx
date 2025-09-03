'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import VietQR from "@/components/pages/wallet/viet.qr";
import {formatNumber} from "@/utils/formatHelpers";
import {TTransactionTopUp} from "@/types/data";
import VietQRSkeleton from "@/components/skeleton/merchant/viet.qr.skeleton";

const usdToVndRate = 25000;

const VietQRDialog = ({open, onOpenChange, dataTopUp}: {
    open: boolean,
    onOpenChange: (open: boolean) => void,
    dataTopUp: TTransactionTopUp | null
}) => {

    const ID = dataTopUp ? `${dataTopUp.type}${dataTopUp.id}${dataTopUp.userId}` : "";
    const amount = dataTopUp ? dataTopUp.amount * usdToVndRate : 0;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg h-[80vh] px-0">
                {!dataTopUp ? (
                    <VietQRSkeleton/>
                ) : (
                    <div className='overflow-y-auto custom-scroll px-6 space-y-6'>
                        <DialogHeader className="text-center"> <DialogTitle
                            className="text-xl font-semibold text-gray-800"> Complete Your Payment </DialogTitle>
                            <DialogDescription className="text-gray-600 mt-2"> Scan the QR code below to transfer
                                payment </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-6 py-4"> {/* QR Code Section */}
                            <div className="flex flex-col items-center space-y-4">
                                <div
                                    className="bg-white p-4 rounded-lg shadow-sm border-2 border-dashed border-gray-200">
                                    {dataTopUp && (
                                        <VietQR
                                            amount={amount}
                                            addInfo={ID}
                                        />
                                    )}
                                </div>
                                {/* Payment Instructions */}
                                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 w-full">
                                    <div className="flex items-start space-x-3">
                                        <div className="flex-shrink-0">
                                            <div
                                                className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                                                <svg className="w-4 h-4 text-white" fill="currentColor"
                                                     viewBox="0 0 20 20">
                                                    <path fillRule="evenodd"
                                                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                                          clipRule="evenodd"/>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="flex-1"><h4
                                            className="text-sm font-medium text-amber-800 mb-1"> Important Payment
                                            Instructions </h4>
                                            <div className="text-sm text-amber-700 space-y-1"><p>• Use exactly this
                                                payment
                                                note: <span
                                                    className="font-mono bg-white px-2 py-1 rounded border font-semibold">{ID}</span>
                                            </p> <p>• Transfer
                                                amount: <strong>{formatNumber(amount)} VND</strong></p>
                                                <p>• Wait for admin approval after payment</p></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Status Steps */}
                            <div className="bg-gray-50 rounded-lg p-4"><h5
                                className="text-sm font-medium text-gray-700 mb-3">Payment Process</h5>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-3">
                                        <div
                                            className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-white text-xs font-bold">1</span></div>
                                        <span className="text-sm text-gray-500">Scan QR & Transfer Payment</span></div>
                                    <div className="flex items-center space-x-3">
                                        <div
                                            className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-white text-xs font-bold">2</span></div>
                                        <span className="text-sm text-gray-500">Wait for Admin Verification</span></div>
                                    <div className="flex items-center space-x-3">
                                        <div
                                            className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-white text-xs font-bold">3</span></div>
                                        <span className="text-sm text-gray-500">Points Added to Wallet</span></div>
                                </div>
                            </div>
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Close</Button>
                            </DialogClose>
                        </DialogFooter>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default VietQRDialog;
