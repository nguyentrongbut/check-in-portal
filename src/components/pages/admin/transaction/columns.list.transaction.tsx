"use client"

import {ColumnDef} from "@tanstack/react-table"

import {ArrowUpDown, CheckCircle} from "lucide-react";
import {TTransaction} from "@/types/data";
import {Badge} from "@/components/ui/badge";
import {getBadgeStatusVariant, getBadgeWalletVariant} from "@/utils/getBadgeVariant";
import {getWalletTypeIcon} from "@/utils/getIcon";
import {getColorWallet} from "@/utils/getColor";
import {formatDate, formatNumber} from "@/utils/formatHelpers";
import ApprovedTransaction from "@/components/pages/admin/transaction/approved.transaction";
import {Button} from "@/components/ui/button";

export const columnsListTransaction: ColumnDef<TTransaction>[] = [
    {
        accessorKey: "type",
        header: ({column}) => {
            return (
                <div
                    className="flex gap-2 items-center cursor-pointer ml-4"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Type
                    <ArrowUpDown className="ml-2 size-4"/>
                </div>
            )
        },
        cell: ({row}) => {
            const type: string = row.getValue("type");

            return (
                <div className='ml-4 flex items-center gap-2'>
                    {getWalletTypeIcon(type?.toLowerCase())}
                    <Badge className='capitalize' variant={getBadgeWalletVariant(type?.toLowerCase())}>
                        {type?.toLowerCase()}
                    </Badge>
                </div>
            );
        },
    },
    {
        accessorKey: "description",
        header: ({column}) => {
            return (
                <div
                    className="flex gap-2 items-center cursor-pointer"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Description
                    <ArrowUpDown className="ml-2 size-4"/>
                </div>
            )
        },
        cell: ({row}) => {
            const description: string = row.getValue("description");

            return (
                <p className='font-medium'>
                    {description}
                </p>
            );
        },
    },
    {
        accessorKey: "status",
        header: ({column}) => {
            return (
                <div
                    className="flex gap-2 items-center cursor-pointer"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    <ArrowUpDown className="ml-2 size-4"/>
                </div>
            )
        },
        cell: ({row}) => {
            const status = row.getValue("status") as string;

            return (
                <Badge
                    variant={getBadgeStatusVariant(status?.toLowerCase())}
                >
                    {status?.toLowerCase()}
                </Badge>
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: ({column}) => {
            return (
                <div
                    className="flex gap-2 items-center cursor-pointer"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date
                    <ArrowUpDown className="ml-2 size-4"/>
                </div>
            )
        },
        cell: ({row}) => {
            const date: string = row.getValue("createdAt");

            return (
                <p>
                    {formatDate(date)}
                </p>
            );
        },
    },
    {
        accessorKey: "amount",
        accessorFn: (row) => {
            const amount = row.amount;
            const type = row.type;

            return type === "SPENT" ? -Math.abs(amount) : Math.abs(amount);
        },
        header: ({column}) => {
            return (
                <div
                    className="flex gap-2 items-center cursor-pointer"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Amount
                    <ArrowUpDown className="ml-2 size-4"/>
                </div>
            )
        },
        cell: ({row}) => {
            const amount: number = row.getValue("amount");
            const type: string = row.getValue("type");

            return (
                <p className={`font-medium ${getColorWallet(type)}`}>
                    {type === "SPENT" ? "" : "+"}
                    {amount} USD
                </p>
            );
        },
    },
    {
        id: "point",
        accessorFn: (row) => {
            const point = row.point;
            const type = row.type;

            return type === "SPENT" ? -Math.abs(point) : Math.abs(point);
        },
        header: ({column}) => {
            return (
                <div
                    className="flex gap-2 items-center cursor-pointer mr-4 justify-end"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Point
                    <ArrowUpDown className="ml-2 size-4"/>
                </div>
            )
        },
        cell: ({row}) => {
            const point: number = row.getValue("point");
            const type: string = row.getValue("type");

            return (
                <p className={`mr-4 text-right font-medium ${getColorWallet(type)}`}>
                    {type === "SPENT" ? "" : "+"}
                    {formatNumber(point)} pts
                </p>
            );
        },
    },
    {
        id: "actions",
        header: () => {
            return (
                <div
                    className="mr-4 flex items-center justify-center"
                >
                    Actions
                </div>
            )
        },
        cell:
            ({row}) => {
                const transaction = row.original;
                const transactionId = transaction?.id

                return (
                    <div className='flex justify-center'>
                        {
                            transaction?.status?.toLowerCase() === 'pending' ? (
                                <ApprovedTransaction transactionId={transactionId}/>
                            ) : (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-green-600 hover:text-red-700 hover:bg-red-50"
                                    disabled
                                >
                                    <CheckCircle className="size-4 cursor-pointer "/>
                                    <span>Approved</span>
                                </Button>
                            )
                        }
                    </div>
                )
            },
    }
    ,
]