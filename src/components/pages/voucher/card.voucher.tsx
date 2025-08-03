'use client';

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {TicketPercent, Clock, Gift} from "lucide-react";
import {TVoucher} from "@/types/data";
import {getBadgeVoucherVariant} from "@/utils/getBadgeVariant";
import {formatDate, formatNumber} from "@/utils/formatHelpers";
import EntityActions from "../../common/entity.actions";
import Image from "next/image";
import {deleteVoucher} from "@/lib/actions/voucher";
import {Progress} from "@/components/ui/progress";
import Link from "next/link";

const CardVoucher = ({voucher}: { voucher: TVoucher }) => {
    const {
        id,
        title,
        description,
        image,
        discountType,
        discountValue,
        pointCost,
        quantity,
        claimed,
        endDate,
        status
    } = voucher;

    const remaining = quantity - claimed;
    const formattedDiscount =
        discountType === "fixed"
            ? `${formatNumber(discountValue)} USD`
            : `${discountValue}%`;

    const percentageClaimed = quantity > 0 ? (claimed / quantity) * 100 : 0;

    return (
        <Card
            className=" relative overflow-hidden border-0 shadow-sm hover:shadow-xl h-full flex flex-col justify-between">
            {/* Image Section with Overlay */}
            <Link href={`voucher/detail/${voucher.id}`}>
                <div className="relative aspect-video overflow-hidden group cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"/>
                    <Image
                        src={image || "/placeholder.svg"}
                        alt={title}
                        width={702}
                        height={398}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className='absolute top-3 right-3 z-20 '>
                        {/* Status Badge */}
                        <Badge
                            variant={getBadgeVoucherVariant(status)}
                            className="shadow-lg backdrop-blur-sm"
                        >
                            {status}
                        </Badge>

                        <div className='mt-4 -mr-4'>
                            <EntityActions
                                id={id}
                                viewUrl={`/voucher/detail/${id}`}
                                editUrl={`/voucher/edit/${id}`}
                                entityName={`${title} voucher`}
                                onDelete={() => deleteVoucher(id)}
                                canCancel={false}
                            />
                        </div>
                    </div>


                    {/* Discount Badge */}
                    <Badge className="absolute top-3 left-3 z-20">{formattedDiscount} OFF</Badge>
                </div>
            </Link>

            {/* Header Section */}
            <CardHeader className='flex flex-col justify-between'>
                <Link href={`voucher/detail/${voucher.id}`}>
                    <CardTitle className="text-lg flex items-center gap-2 hover:text-primary cursor-pointer" title={title}>
                        <TicketPercent className="size-5 text-primary"/>
                        <span className="line-clamp-1">
                        {title}
                    </span>
                    </CardTitle>
                </Link>
                <p className="text-sm text-muted-foreground line-clamp-2">
                    {description}
                </p>
            </CardHeader>

            {/* Content Section */}
            <CardContent className="flex-1 flex flex-col justify-end">
                {/* Points and Status */}
                <div className="flex justify-between items-center mb-4">
                    <div className="text-primary font-bold">
                        <span
                            className="text-2xl mr-1">
                            {formatNumber(pointCost)}
                        </span>
                        pts
                    </div>

                    {!voucher?.isPublished && (
                        <Badge variant="destructive" className="text-xs h-6 px-2 shadow-sm">
                            Unpublished
                        </Badge>
                    )}
                </div>

                {/* Discount Details */}
                <div className="space-y-4">
                    <div
                        className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                        <div className="text-sm font-medium text-gray-700">
                            Minimum Order
                        </div>
                        <div className="text-sm font-bold text-gray-900">
                            {formatNumber(voucher?.minOrderValue)} USD
                        </div>
                    </div>

                    {/* Availability */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Gift className="w-4 h-4"/>
                            <span>{remaining} remaining</span>
                        </div>

                        {/* Progress bar */}
                        <div className="flex-1 ml-4 mt-1">
                            <Progress value={percentageClaimed}/>
                        </div>
                    </div>

                    {/* Expiry Date */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-gray-50 rounded-md">
                        <Clock className="w-4 h-4"/>
                        <span>Expires: {formatDate(endDate)}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CardVoucher;