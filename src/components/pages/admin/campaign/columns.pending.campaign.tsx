"use client"

import {ColumnDef} from "@tanstack/react-table"
import {TCampaign} from "@/types/data";
import {ArrowUpDown} from "lucide-react";
import {formatDate, formatNumber} from "@/utils/formatHelpers";
import Image from "next/image";
import EntityActions from "@/components/common/entity.actions";
import {deleteCampaign} from "@/lib/actions/campaign";
import {Badge} from "@/components/ui/badge";
import {getBadgeStatusVariant} from "@/utils/getBadgeVariant";

export const columnsPendingCampaign: ColumnDef<TCampaign>[] = [
    {
        accessorKey: "name",
        header: ({column}) => {
            return (
                <div
                    className="flex gap-2 items-center cursor-pointer ml-4"
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
                <div className='ml-4'>
                    <div className='font-medium '>
                        {campaignName}
                    </div>
                    <div>{description}</div>
                </div>
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
                    variant={getBadgeStatusVariant(status.toLowerCase())}
                >
                    {status.toLowerCase()}
                </Badge>
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
                const endDate: string = original.endDate;
                return (
                    <div className='flex items-center gap-2'>
                        <Image src='/date.png' alt='start / end date' width={8} height={36}></Image>
                        <div className='flex flex-col gap-2 text-sm'>
                            <div>{formatDate(startDate)}</div>
                            <div>{formatDate(endDate)}</div>
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
                const nameCampaign = campaign.name;
                const canDelete = campaign.status.toLowerCase() !== 'cancelled';

                return (
                    <div className="flex justify-center space-x-2">
                        <EntityActions
                            id={id}
                            viewUrl={`/admin/campaign/detail/${id}`}
                            editUrl={`/admin/campaign/edit/${id}`}
                            entityName={`${nameCampaign} campaign`}
                            onDelete={() => deleteCampaign(id)}
                            edit
                            canDelete={canDelete}
                        />
                    </div>
                )
            },
    }
    ,
]