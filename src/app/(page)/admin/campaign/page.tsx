import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {getCampaigns} from "@/lib/actions/campaign";
import {DataTable} from "@/components/common/data.table";
import {columnsPendingCampaign} from "@/components/pages/admin/campaign/columns.pending.campaign";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Review Campaigns - Local Hunt Admin",
    description:
        "Review and manage pending campaigns in the Local Hunt admin dashboard. Approve or reject submissions to ensure quality and compliance.",
};

const ReviewCampaignPage = async () => {

    const data = await getCampaigns()

    const listCampaign = data?.items

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
                    <DataTable data={listCampaign} columns={columnsPendingCampaign}/>
                </CardContent>
            </Card>
        </div>
    )
}

export default ReviewCampaignPage