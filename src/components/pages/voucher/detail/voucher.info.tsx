import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import {TVoucher} from "@/types/data";
import {Badge} from "@/components/ui/badge";
import {getBadgeStatusVariant} from "@/utils/getBadgeVariant";
import {Calendar, Gift, Target} from "lucide-react";
import {formatDate, formatNumber} from "@/utils/formatHelpers";

const VoucherInfo = ({voucher}: { voucher: TVoucher }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Voucher Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 flex flex-col justify-end">
                <div className="grid grid-cols-1 lg:grid-cols-3 place-items-center gap-4 lg:gap-8">
                    <Image
                        width={400}
                        height={400}
                        src={voucher?.image || "/default-avatar.png"}
                        alt={voucher?.title}
                        className="w-full h-40 object-cover rounded-md col-span-2"
                    />

                    <div className='flex flex-row lg:flex-col justify-between lg:justify-center lg:gap-4 size-full'>
                        <div className='flex gap-2 justify-center items-center lg:block'>
                            <h4 className="font-medium text-sm text-gray-500">Created</h4>
                            <p className="font-medium">{formatDate(voucher?.createdAt)}</p>
                        </div>
                        <div className='flex gap-2 justify-center items-center lg:block'>
                            <h4 className="font-medium text-sm text-gray-500">Status</h4>
                            <Badge variant={getBadgeStatusVariant(voucher?.status)}>{voucher?.status}</Badge>
                        </div>
                    </div>

                </div>

                <div className="space-y-3 pt-4 border-t">
                    <div className="flex items-center space-x-3">
                        <Calendar className="h-4 w-4 text-gray-500"/>
                        <span className="text-sm">Expires: {formatDate(voucher?.endDate)}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Target className="h-4 w-4 text-gray-500"/>
                        <span className="text-sm">
                      Stock: {voucher?.claimed} / {voucher?.quantity} remaining
                    </span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Gift className="h-4 w-4 text-gray-500"/>
                        <span className="text-sm">Cost:
                            <span className='text-primary ml-1'>{formatNumber(voucher?.pointCost)} points</span>
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default VoucherInfo