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
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                                <QrCode className="h-4 w-4 mr-1"/>
                                QR Code
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle>
                                <div className='flex gap-2 items-center text-sm'>
                                    <QrCode className="size-4 text-primary"/>
                                    <span> QR Code</span>
                                </div>
                            </DialogTitle>
                            <div className='size-[300px] mx-auto'>
                                <Image src={qrUrl} alt='QR Code Local Hunt' width={300} height={300} className='size-full object-contain'/>
                            </div>
                            <div className='flex justify-center gap-2'>
                                <DialogClose asChild>
                                    <Button variant='outline'>Close</Button>
                                </DialogClose>
                                <Link href={qrUrl} download={`qr-code-${campaign?.name}`}>
                                    <Button className='bg-black hover:bg-black/80'>Download QR Code</Button>
                                </Link>
                                <QRCodePrint qrCodeUrl={qrUrl} title={campaign?.name}/>
                            </div>
                        </DialogContent>
                    </Dialog>

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