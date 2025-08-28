import {getCampaign} from "@/lib/actions/campaign";
import {Params} from "@/types/common";
import {TCampaign} from "@/types/data";
import {Button} from "@/components/ui/button";
import {ArrowLeft, Edit, QrCode} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import Link from "next/link";
import {getBadgeStatusVariant} from "@/utils/getBadgeVariant";
import ListCardOverview from "@/components/pages/campaign/detail/list.card.overview";
import CampaignInformation from "@/components/pages/campaign/detail/campaign.information";
import PerformanceSummary from "@/components/pages/campaign/detail/performance.summary";
import TableCheckIns from "@/components/pages/campaign/detail/table.check.ins";
import {Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import Image from "next/image";
import QRCodePrint from "@/components/pages/campaign/detail/qr.code.print";
import LocationPickerWrapper from "@/components/pages/campaign/create/location-picker.wrapper";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {generateQRCodeBase64} from "@/utils/generateQRCodeBase64";
import {QRCodeDialog} from "@/components/common/qr.dialog";

export async function generateMetadata({params}: { params: Params }) {
    const {id} = await params
    const campaign: TCampaign = await getCampaign(id)

    return{
        title: `${campaign?.name} - Local Hunt`,
        description: "View campaign details, performance summary, location, and check-in history in Local Hunt.",
    }
}

const DetailPage = async ({params}: { params: Params }) => {
    const {id} = await params
    const campaign: TCampaign = await getCampaign(id)

    const { name, startDate, endDate, location, wifi, status } = campaign

    const qrData = {
        id,
        name,
        startDate,
        endDate,
        location,
        wifi,
        status
    }

    const qrUrl = await generateQRCodeBase64(qrData);

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
                        <h2 className="text-3xl font-bold">{campaign?.name}</h2>
                        <p className="text-gray-600">{campaign?.description}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Badge variant={getBadgeStatusVariant(campaign?.status.toLowerCase())}>{campaign?.status.toLowerCase()}</Badge>
                    <QRCodeDialog qrUrl={qrUrl} campaignName={campaign?.name} />

                    {['pending', 'rejected'].includes(campaign?.status.toLowerCase()) && (
                        <Link href={`/campaign/edit/${id}`}>
                            <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                            </Button>
                        </Link>
                    )}

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

            {/* Location */}
            <Card>
                <CardHeader>
                    <CardTitle>Location</CardTitle>
                    <CardDescription>Location of the campaign</CardDescription>
                </CardHeader>
                <CardContent>
                    <LocationPickerWrapper
                        view
                        value={campaign?.location} />
                </CardContent>
            </Card>
        </div>
    )
}

export default DetailPage;