'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Eye, MapPin} from "lucide-react";
import {TCampaign} from "@/types/data";
import {useEffect, useState} from "react";
import {getCampaign} from "@/lib/actions/campaign";
import {Label} from "@/components/ui/label";
import LocationPickerWrapper from "@/components/pages/campaign/create/location-picker.wrapper";

const DialogViewCampaign = ({campaignId}: { campaignId: number }) => {

    const [open, setOpen] = useState(false);
    const [campaign, setCampaign] = useState<TCampaign | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open) {
            setLoading(true);
            try {
                const fetchCampaign = async () => {
                    const result = await getCampaign(campaignId);
                    if (result) {
                        setCampaign(result);
                    } else {
                        console.error('Campaign not found');
                    }
                }
                fetchCampaign();
            } catch (error) {
                console.error('Error when fetch campaign:', error);
            } finally {
                setLoading(false);
            }
        }
    }, [open, campaignId]);

    if (loading) return 'Loading...';

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
                    <Eye className="size-4"/>
                </Button>
            </DialogTrigger>
            <DialogContent className='h-[80vh] px-0'>
                <div className='overflow-y-auto custom-scroll px-6 space-y-6'>
                    <DialogHeader>
                        <DialogTitle>{campaign?.name}</DialogTitle>
                        <DialogDescription>
                            Campaign details for {campaign?.merchantName}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        {
                            campaign?.description && (
                                <div>
                                    <Label className="text-sm font-medium">Description</Label>
                                    <p className="text-sm">{campaign.description}</p>
                                </div>
                            )
                        }
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="text-sm font-medium">Budget</Label>
                                <p className="text-sm">{campaign?.pointBudget} points</p>
                            </div>
                            <div>
                                <Label className="text-sm font-medium">Reward per Check-in</Label>
                                <p className="text-sm">{campaign?.rewardPerCheckin} points</p>
                            </div>
                        </div>
                        {campaign?.location && (
                            <div>
                                <Label className="text-sm font-medium">Location</Label>
                                <div className="flex items-center space-x-2">
                                    <LocationPickerWrapper
                                        view
                                        value={campaign?.location}/>
                                </div>
                            </div>
                        )}
                        {campaign?.wifi && (
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-sm font-medium">Wi-Fi Name</Label>
                                    <p className="text-sm">{campaign?.wifi?.ssid}</p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium">Wi-Fi MAC</Label>
                                    <p className="text-sm">{campaign?.wifi?.bssid}</p>
                                </div>
                            </div>
                        )}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="text-sm font-medium">Start Date</Label>
                                <p className="text-sm">{campaign?.startDate}</p>
                            </div>
                            <div>
                                <Label className="text-sm font-medium">End Date</Label>
                                <p className="text-sm">{campaign?.endDate}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default DialogViewCampaign