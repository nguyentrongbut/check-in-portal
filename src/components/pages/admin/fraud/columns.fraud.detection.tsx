"use client"

import {ColumnDef} from "@tanstack/react-table"
import {TSuspiciousCheckins, TVelocity} from "@/types/data";
import {ArrowUpDown, MapPin} from "lucide-react";
import {formatDate} from "@/utils/formatHelpers";
import {Badge} from "@/components/ui/badge";
import {getBadgeVelocityVariant} from "@/utils/getBadgeVariant";
import DialogViewFraud from "@/components/pages/admin/fraud/dialog.view.fraud";
import DialogBanUser from "@/components/pages/admin/fraud/dialog.ban.user";
import ApprovedFraud from "@/components/pages/admin/fraud/approved.fraud";

export const columnsFraudDetection: ColumnDef<TSuspiciousCheckins>[] = [
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
        accessorKey: "campaignName",
        header: ({column}) => {
            return (
                <div
                    className="flex gap-2 items-center cursor-pointer"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Campaign
                    <ArrowUpDown className="ml-2 size-4"/>
                </div>
            )
        },
        cell: ({row}) => {
            const campaignName: string = row.getValue("campaignName");

            return (
                <div className='font-medium'>
                    {campaignName}
                </div>
            );
        },
    },
    {
        accessorKey: "checkInTime",
        header:
            ({column}) => {
                return (
                    <div
                        className="flex gap-2 items-center cursor-pointer"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Time
                        <ArrowUpDown className="ml-2 size-4"/>
                    </div>
                )
            },
        cell: ({row}) => {
            const checkInTime: string = row.getValue("checkInTime");

            return (
                <div>
                    {formatDate(checkInTime)}
                </div>
            );
        },
    },
    {
        accessorKey: "riskScore",
        header:
            ({column}) => {
                return (
                    <div
                        className="flex gap-2 items-center cursor-pointer"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Risk Score
                        <ArrowUpDown className="ml-2 size-4"/>
                    </div>
                )
            },
        cell: ({row}) => {
            const riskScore: string = row.getValue("riskScore");

            return (
                <div className='text-center mr-8'>
                    {riskScore}
                </div>
            );
        },
    },
    {
        accessorKey: "gpsMatch",
        header:
            ({column}) => {
                return (
                    <div
                        className="flex gap-2 items-center cursor-pointer"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        GPS Match
                        <ArrowUpDown className="ml-2 size-4"/>
                    </div>
                )
            },
        cell:
            ({row}) => {

                const gpsMatch: boolean = row.getValue("gpsMatch");
                return (
                    <div className={`${gpsMatch ? "text-green-500" : "text-red-500"} flex items-center gap-1`}>
                        <MapPin className='size-4'/>
                        {gpsMatch ? "Matched" : "Not Matched"}
                    </div>
                )
            },
    },
    {
        accessorKey: "wifiMatch",
        header:
            ({column}) => {
                return (
                    <div
                        className="flex gap-2 items-center cursor-pointer"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        GPS Match
                        <ArrowUpDown className="ml-2 size-4"/>
                    </div>
                )
            },
        cell:
            ({row}) => {

                const wifiMatch: boolean = row.getValue("wifiMatch");
                return (
                    <div className={`${wifiMatch ? "text-green-500" : "text-red-500"} flex items-center gap-1`}>
                        <MapPin className='size-4'/>
                        {wifiMatch ? "Matched" : "Not Matched"}
                    </div>
                )
            },
    },
    {
        accessorKey: "velocity",
        header:
            ({column}) => {
                return (
                    <div
                        className="flex gap-2 items-center cursor-pointer"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Velocity
                        <ArrowUpDown className="ml-2 size-4"/>
                    </div>
                )
            },
        cell:
            ({row}) => {

                const velocity: TVelocity = row.getValue("velocity");
                return (
                    <Badge variant={getBadgeVelocityVariant(velocity.toLowerCase())}>{velocity}</Badge>
                )
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
                const suspiciousCheckins: TSuspiciousCheckins = row.original;
                const id: number = suspiciousCheckins.id;
                const userId: number = suspiciousCheckins?.userId;

                return (
                    <div className="flex justify-center space-x-2">
                        <DialogViewFraud fraudId={id}/>

                        <ApprovedFraud fraudId={id}/>

                        <DialogBanUser userId={userId} fraudId={id}/>
                    </div>
                )
            },
    }
    ,
]