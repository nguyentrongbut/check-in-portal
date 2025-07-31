import {getCampaign} from "@/lib/actions/campaign";
import {Params} from "@/types/common";
import {TCampaign} from "@/types/data";
import {Button} from "@/components/ui/button";
import {ArrowLeft, Edit, QrCode} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import Link from "next/link";
import {getBadgeVariant} from "@/utils/getBadgeVariant";
import ListCardOverview from "@/components/pages/campaign/detail/list.card.overview";
import CampaignInformation from "@/components/pages/campaign/detail/campaign.information";
import PerformanceSummary from "@/components/pages/campaign/detail/performance.summary";
import TableCheckIns from "@/components/pages/campaign/detail/table.check.ins";

const DetailPage = async ({params}: { params: Params }) => {
    const {id} = await params
    const campaign: TCampaign = await getCampaign(id)

    return (
        <div className='space-y-6'>
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link href='/campaign'>
                        <Button variant="ghost" className="p-2">
                            <ArrowLeft className="h-4 w-4"/>
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">{campaign?.name}</h1>
                        <p className="text-gray-600">{campaign?.description}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Badge variant={getBadgeVariant(campaign?.status)}>{campaign?.status}</Badge>
                    <Button variant="outline" size="sm">
                        <QrCode className="h-4 w-4 mr-1"/>
                        QR Code
                    </Button>
                    <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1"/>
                        Edit
                    </Button>
                </div>
            </div>

            {/* Overview Cards */}
            <ListCardOverview campaign={campaign}/>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Campaign Information */}
                <CampaignInformation campaign={campaign}/>

                {/* Performance Summary */}
                <PerformanceSummary campaign={campaign}/>
            </div>

            {/* Table List Check In*/}
            <TableCheckIns campaignId={id}/>
        </div>
    )
}

export default DetailPage;