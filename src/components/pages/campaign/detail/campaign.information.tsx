import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Calendar, CalendarX, HouseWifi, MapPin, Target, Wifi} from "lucide-react";
import {TCampaign} from "@/types/data";
import {formatDate, formatNumber} from "@/utils/formatHelpers";
import {Badge} from "@/components/ui/badge";
import {getBadgeStatusVariant} from "@/utils/getBadgeVariant";

const CampaignInformation = ({campaign}: {campaign : TCampaign}) => {
    return (
    <Card>
        <CardHeader>
            <CardTitle>Campaign Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h4 className="font-medium text-sm text-gray-500">Created</h4>
                    <p className="font-medium">{formatDate(campaign?.createdAt)}</p>
                </div>
                <div>
                    <h4 className="font-medium text-sm text-gray-500 mb-1">Status</h4>
                    <Badge variant={getBadgeStatusVariant(campaign?.status)}>{campaign?.status}</Badge>
                </div>
            </div>

            <div className="space-y-3 pt-4 border-t">
                {campaign.wifi && (
                    <>
                        <div className="flex items-center space-x-3">
                            <Wifi className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">{campaign?.wifi?.ssid}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <HouseWifi className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">{campaign?.wifi?.bssid}</span>
                        </div>
                    </>
                )}
                <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      {formatDate(campaign?.startDate)} <span className='opacity-60'>{campaign?.startTime}</span>
                    </span>
                </div>
                <div className="flex items-center space-x-3">
                    <CalendarX className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-red-600">
                      {formatDate(campaign?.endDate)} <span className='opacity-60'>{campaign?.endTime}</span>
                    </span>
                </div>
                <div className="flex items-center space-x-3">
                    <Target className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Budget: <span className='text-yellow-600'>{formatNumber(campaign?.pointBudget)} points</span></span>
                </div>
            </div>
        </CardContent>
    </Card>
    )
}

export default CampaignInformation