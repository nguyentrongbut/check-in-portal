import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {getCampaigns} from "@/lib/actions/campaign";
import {columnsPendingCampaign} from "@/components/pages/admin/campaign/columns.pending.campaign";
import {Metadata} from "next";
import {getPaginatedResult} from "@/utils/pagination";
import {TCampaign} from "@/types/data";
import {SearchParamsProps} from "@/app/(page)/wallet/page";
import {DataTableServer} from "@/components/common/data.table.server";

export const metadata: Metadata = {
    title: "Campaign Management - Local Hunt",
    description:
        "Review and manage pending campaigns in the Local Hunt admin dashboard. Approve or reject submissions to ensure quality and compliance.",
};

const ReviewCampaignPage = async ({searchParams}: SearchParamsProps) => {

    const {currentPage, pageSize, items: listCampaign, total, totalPages} =
        await getPaginatedResult<TCampaign>(searchParams, getCampaigns);

    return (
        <div className="space-y-6">
            {/* Table */}
            <Card>
                <CardHeader>
                    <div className='flex justify-between items-center'>
                        <div>
                            <CardTitle>List Campaign</CardTitle>
                            <CardDescription>List campaign details and approve or reject submissions</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <DataTableServer
                        data={listCampaign}
                        columns={columnsPendingCampaign}
                        total={total}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        totalPages={totalPages}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default ReviewCampaignPage