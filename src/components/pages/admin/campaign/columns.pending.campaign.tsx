"use client"

import {ColumnDef} from "@tanstack/react-table"
import {TCampaign} from "@/types/data";
import {ArrowUpDown} from "lucide-react";
import {formatDate, formatNumber} from "@/utils/formatHelpers";
import Image from "next/image";
import DialogViewCampaign from "@/components/pages/admin/campaign/dialog.view.campaign";
import DialogReject from "@/components/pages/admin/campaign/dialog.reject";
import ApprovedCampaign from "@/components/pages/admin/campaign/approved.campaign";

export const columnsPendingCampaign: ColumnDef<TCampaign>[] = [
    {
        accessorKey: "merchantName",
        header: ({column}) => {
            return (
                <div
                    className="flex gap-2 items-center cursor-pointer ml-4"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Merchant
                    <ArrowUpDown className="ml-2 size-4"/>
                </div>
            )
        },
        cell: ({row}) => {
            const merchantName: string = row.getValue("merchantName");

            return (
                <p className='font-medium ml-4'>
                    {merchantName}
                </p>
            );
        },
    },
    {
        accessorKey: "name",
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
            const campaign: TCampaign = row.original;
            const campaignName: string = row.getValue("name");
            const description: string = campaign?.description;

            return (
                <div>
                    <div className='font-medium'>
                        {campaignName}
                    </div>
                    <div>{description}</div>
                </div>
            );
        },
    },
    {
        accessorKey: "pointBudget",
        header:
            ({column}) => {
                return (
                    <div
                        className="flex gap-2 items-center cursor-pointer"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Budget
                        <ArrowUpDown className="ml-2 size-4"/>
                    </div>
                )
            },
        cell: ({row}) => {
            const pointBudget: number = row.getValue("pointBudget");

            return (
                <div>
                    {formatNumber(pointBudget)} pts
                </div>
            );
        },
    },
    {
        accessorKey: "rewardPerCheckin",
        header:
            ({column}) => {
                return (
                    <div
                        className="flex gap-2 items-center cursor-pointer"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Reward
                        <ArrowUpDown className="ml-2 size-4"/>
                    </div>
                )
            },
        cell: ({row}) => {
            const rewardPerCheckin: string = row.getValue("rewardPerCheckin");

            return (
                <div>
                    {formatNumber(rewardPerCheckin)} pts
                </div>
            );
        },
    },
    {
        accessorKey: "startDate",
        header:
            ({column}) => {
                return (
                    <div
                        className="flex gap-2 items-center cursor-pointer"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Start / End Date
                        <ArrowUpDown className="ml-2 size-4"/>
                    </div>
                )
            },
        cell:
            ({row}) => {
                const original = row.original;
                const startDate: string = original.startDate;
                const startTime: string = original.startTime;
                const endDate: string = original.endDate;
                const endTime: string = original.endTime;
                return (
                    <div className='flex items-center gap-2'>
                        <Image src='/date.png' alt='start / end date' width={8} height={36}></Image>
                        <div className='flex flex-col gap-2 text-sm'>
                            <div>{formatDate(startDate)} <span className='opacity-60'>{startTime}</span></div>
                            <div>{formatDate(endDate)} <span className='opacity-60'>{endTime}</span></div>
                        </div>
                    </div>
                )
            },
    },
    {
        accessorKey: "createdAt",
        header:
            ({column}) => {
                return (
                    <div
                        className="flex gap-2 items-center cursor-pointer"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Submitted
                        <ArrowUpDown className="ml-2 size-4"/>
                    </div>
                )
            },
        cell: ({row}) => {
            const submitted: string = row.getValue("createdAt");

            return (
                <div>
                    {formatDate(submitted)}
                </div>
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
                const campaign: TCampaign = row.original;
                const id: number = campaign.id;

                return (
                    <div className="flex justify-center space-x-2">
                        <DialogViewCampaign campaignId={id}/>

                        <ApprovedCampaign campaignId={id}/>

                       <DialogReject campaignId={id}/>
                    </div>
                )
            },
    }
    ,
]