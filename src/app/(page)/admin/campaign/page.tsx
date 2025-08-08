import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {getPendingCampaigns} from "@/lib/actions/campaign";
import {DataTable} from "@/components/common/data.table";
import {columnsPendingCampaign} from "@/components/pages/admin/campaign/columns.pending.campaign";

const ReviewCampaignPage = async () => {

    const listPendingCampaigns = await getPendingCampaigns()

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Campaign Approval</h1>
                    <p className="text-gray-600">Review and approve merchant campaigns</p>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                        <div className="size-3 bg-yellow-500 rounded-full"></div>
                        <span>Pending: {listPendingCampaigns?.length}</span>
                    </div>
                </div>
            </div>

            {/* Table */}
            <Card>
                <CardHeader>
                    <div className='flex justify-between items-center'>
                        <div>
                            <CardTitle>Pending Campaigns</CardTitle>
                            <CardDescription>Review campaign details and approve or reject submissions</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <DataTable data={listPendingCampaigns} columns={columnsPendingCampaign}/>
                </CardContent>
            </Card>
        </div>
    )
}

export default ReviewCampaignPage