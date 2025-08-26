"use client"

import {ColumnDef} from "@tanstack/react-table"
import {TCampaign} from "@/types/data";
import EntityActions from "@/components/common/entity.actions";
import {ArrowUpDown} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {formatDate, formatNumber} from "@/utils/formatHelpers";
import Image from "next/image";
import {getBadgeStatusVariant} from "@/utils/getBadgeVariant";

export const columnsCampaign: ColumnDef<TCampaign>[] = [
    {
        accessorKey: "name",
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
            const nameCampaign: string = row.getValue("name");

            return (
                <p className='font-medium ml-4'>
                    {nameCampaign}
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
        accessorKey: "used",
        header:
            ({column}) => {
                return (
                    <div
                        className="flex gap-2 items-center cursor-pointer"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Used
                        <ArrowUpDown className="ml-2 size-4"/>
                    </div>
                )
            },
        cell: ({row}) => {
            const used: number = row.getValue("used");

            return (
                <div>
                    {formatNumber(used)} pts
                </div>
            );
        },
    },
    {
        accessorKey: "checkIns",
        header:
            ({column}) => {
                return (
                    <div
                        className="flex gap-2 items-center cursor-pointer"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Check-ins
                        <ArrowUpDown className="ml-2 size-4"/>
                    </div>
                )
            },
        cell: ({row}) => {
            const checkIns: number = row.getValue("checkIns");

            return (
                <div>
                    {formatNumber(checkIns)}
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
                const startDate: string =  original.startDate;
                const startTime: string =  original.startTime;
                const endDate: string =  original.endDate;
                const endTime: string =  original.endTime;
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
    }
    ,
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
                const campaign = row.original;
                const nameCampaign = campaign.name;
                const campaignId = campaign.id;
                const isBeforeStart = (startDate: string) => new Date(startDate) > new Date();
                const canEdit = ['pending', 'rejected'].includes(campaign.status);
                // const canDelete = ['pending', 'rejected'].includes(campaign.status) ||
                //     (campaign.status === 'approved' && isBeforeStart(campaign?.startDate));
                const canCancel = ['pending'].includes(campaign.status) ||
                    (campaign.status === 'approved' && isBeforeStart(campaign?.startDate));
                return (
                    <EntityActions
                        id={campaignId}
                        viewUrl={`/campaign/detail/${campaignId}`}
                        editUrl={`/campaign/edit/${campaignId}`}
                        entityName={`${nameCampaign} campaign`}
                        // onDelete={() => deleteCampaign(campaignId)}
                        edit={canEdit}
                        canCancel={canCancel}
                    />
                )
            },
    }
    ,
]