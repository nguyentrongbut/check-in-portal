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
import {useEffect, useState} from "react";
import {getSuspiciousCheckin} from "@/lib/actions/fraud.detection";
import {TSuspiciousCheckins} from "@/types/data";
import {Badge} from "@/components/ui/badge";
import {getBadgeVelocityVariant} from "@/utils/getBadgeVariant";

const DialogViewFraud = ({fraudId}: { fraudId: number }) => {

    const [open, setOpen] = useState(false);
    const [fraud, setFraud] = useState<TSuspiciousCheckins | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open) {
            setLoading(true);
            try {
                const fetchFraud = async () => {
                    const result = await getSuspiciousCheckin(fraudId);
                    if (result) {
                        setFraud(result);
                    } else {
                        console.error('Fraud not found');
                    }
                }
                fetchFraud();
            } catch (error) {
                console.error('Error when fetch campaign:', error);
            } finally {
                setLoading(false);
            }
        }
    }, [open, fraudId]);

    if (loading) return 'Loading...';

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
                    <Eye className="size-4"/>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Check-in Details</DialogTitle>
                    <DialogDescription>
                        Detailed information about this suspicious check-in
                    </DialogDescription>
                </DialogHeader>
                {fraud && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-medium">User Information</h4>
                                <p className="text-sm text-gray-600">{fraud?.userName}</p>
                            </div>
                            <div>
                                <h4 className="font-medium">Risk Assessment</h4>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm">Score: {fraud?.riskScore}</span>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-medium">Campaign</h4>
                                <p className="text-sm text-gray-600">{fraud?.campaignName}</p>
                                <p className="text-sm text-gray-500">{fraud?.merchantName}</p>
                            </div>
                            <div>
                                <h4 className="font-medium">Check-in Time</h4>
                                <p className="text-sm text-gray-600">{fraud?.checkInTime}</p>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-medium">Location Analysis</h4>
                            <div className="mt-2 grid-cols-2 grid gap-2">
                                <div className='space-y-2'>
                                    <div className="flex items-center space-x-2">
                                        <MapPin className="h-4 w-4 text-gray-400"/>
                                        <span className="text-sm">Business: {fraud?.location}</span>
                                    </div>
                                    <div className="flex space-x-2">
                                        <MapPin className="h-4 w-4 text-gray-400"/>
                                        <span className="text-sm">User: {fraud?.userLocation}</span>
                                    </div>
                                </div>
                                <div className='space-y-2'>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm">GPS Match: </span>
                                        <span
                                            className={`text-sm font-medium ${fraud?.gpsMatch ? "text-green-600" : "text-red-600"}`}
                                        >
                                        {fraud?.gpsMatch ? "✓ Verified" : "✗ Failed"}
                                      </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm">Wi-Fi Match: </span>
                                        <span
                                            className={`text-sm font-medium ${fraud?.wifiMatch ? "text-green-600" : "text-red-600"}`}
                                        >
                                        {fraud?.wifiMatch ? "✓ Connected" : "✗ Not Connected"}
                                      </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-medium">Velocity Analysis</h4>
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                      <span className="text-sm">
                                        Previous Check-in: {fraud?.previousCheckIn}
                                      </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm">Velocity Level: </span>
                                    <Badge variant={getBadgeVelocityVariant(fraud?.velocity)}>
                                        {fraud?.velocity}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default DialogViewFraud