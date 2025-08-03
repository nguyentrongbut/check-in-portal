"use client"

import {ColumnDef} from "@tanstack/react-table"
import {ArrowUpDown} from "lucide-react"
import {formatDate, formatNumber} from "@/utils/formatHelpers";
import {TRedemption} from "@/types/data";

export const columnsRedemption: ColumnDef<TRedemption>[] = [
    {
        accessorKey: "userName",
        header: ({column}) => {
            return (
                <div
                    className="flex gap-2 items-center cursor-pointer ml-4"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Campaign Name
                    <ArrowUpDown className="ml-2 size-4"/>
                </div>
            )
        },
        cell: ({row}) => {
            const userName: string = row.getValue("userName");

            return (
                <p className='font-medium ml-4'>
                    {userName}
                </p>
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
                    Redemption Time
                    <ArrowUpDown className="ml-2 size-4"/>
                </div>
            )
        },
        cell: ({row}) => {
            const redemptionTime = row.getValue("createdAt")

            return (
               <div>{formatDate(redemptionTime)}</div>
            );
        },
    },
    {
        accessorKey: "pointsSpent",
        header: ({column}) => {
            return (
                <div
                    className="flex gap-2 items-center cursor-pointer"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Points Spent
                    <ArrowUpDown className="ml-2 size-4"/>
                </div>
            )
        },
        cell: ({row}) => {
            const pointsSpent = row.getValue("pointsSpent")

            return (
                <div className='text-red-800 font-medium'>- {formatNumber(pointsSpent)} pts</div>
            );
        },
    },
]