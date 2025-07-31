"use client"

import {ColumnDef} from "@tanstack/react-table"
import {TCheckIn} from "@/types/data";
import {ArrowUpDown} from "lucide-react";
import {formatNumber} from "@/utils/formatHelpers";

export const columnsCheckin: ColumnDef<TCheckIn>[] = [
    {
        accessorKey: "userName",
        header: ({column}) => {
            return (
                <div
                    className="flex gap-2 items-center cursor-pointer ml-4"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    User
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
        accessorKey: "checkInTime",
        header: ({column}) => {
            return (
                <div
                    className="flex gap-2 items-center cursor-pointer"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Check-in Time
                    <ArrowUpDown className="ml-2 size-4"/>
                </div>
            )
        },
        cell: ({row}) => {
            const checkInTime = row.getValue("checkInTime")

            return (
                <div>
                    {checkInTime}
                </div>
            );
        },
    },
    {
        accessorKey: "pointsEarned",
        header: 'Points Earned',
        cell: ({row}) => {
            const pointsEarned: number = row.getValue("pointsEarned");

            return (
                <div className='font-medium text-green-600'>
                    + {formatNumber(pointsEarned)} pts
                </div>
            );
        },
    },
    {
        accessorKey: "verify",
        header:
            ({column}) => {
                return (
                    <div
                        className="flex gap-2 items-center cursor-pointer"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Verify
                        <ArrowUpDown className="ml-2 size-4"/>
                    </div>
                )
            },
        cell: ({row}) => {
            const verify = row.getValue("verify");

            return (
                <div>
                    {verify}
                </div>
            );
        },
    },
]