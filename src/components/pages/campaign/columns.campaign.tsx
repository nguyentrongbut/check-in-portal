"use client"

import {ColumnDef} from "@tanstack/react-table"
import {TCampaign} from "@/types/data";
import EntityActions from "@/components/common/entity.actions";
import {ArrowUpDown} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {formatDate, formatNumber} from "@/utils/formatHelpers";
import {getBadgeStatusVariant} from "@/utils/getBadgeVariant";
import {QRCell} from "@/components/common/qr.cell";

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
        accessorKey: "remaining",
        header:
            ({column}) => {
                return (
                    <div
                        className="flex gap-2 items-center cursor-pointer"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Remaining Budget
                        <ArrowUpDown className="ml-2 size-4"/>
                    </div>
                )
            },
        cell: ({row}) => {
            const original = row.original;
            const remaining = original.pointBudget - original.used;

            return (
                <div>
                    {formatNumber(remaining)} pts
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
                        Start Date
                        <ArrowUpDown className="ml-2 size-4"/>
                    </div>
                )
            },
        cell:
            ({row}) => {
                const original = row.original;
                const startDate: string = original.startDate;
                return (
                    <div>{formatDate(startDate)}</div>
                )
            },
    }
    ,
    {
        accessorKey: "endDate",
        header:
            ({column}) => {
                return (
                    <div
                        className="flex gap-2 items-center cursor-pointer"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        End Date
                        <ArrowUpDown className="ml-2 size-4"/>
                    </div>
                )
            },
        cell:
            ({row}) => {
                const original = row.original;
                const endDate: string = original.endDate;
                return (
                    <div>{formatDate(endDate)}</div>
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
                // const isBeforeStart = (startDate: string) => new Date(startDate) > new Date();
                const canEdit = ['pending', 'rejected'].includes(campaign.status.toLowerCase());
                // const canCancel = ['pending'].includes(campaign.status) ||
                //     (campaign.status === 'approved' && isBeforeStart(campaign?.startDate));
                return (
                    <div>
                        <EntityActions
                            id={campaignId}
                            viewUrl={`/campaign/detail/${campaignId}`}
                            editUrl={`/campaign/edit/${campaignId}`}
                            entityName={`${nameCampaign} campaign`}
                            // onDelete={() => deleteCampaign(campaignId)}
                            edit={canEdit}
                            // canCancel={canCancel}
                            extraItems={
                                <QRCell data={campaign}/>
                            }
                        />
                    </div>
                )
            },
    }
    ,
]