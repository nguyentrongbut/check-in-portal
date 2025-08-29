'use client'

import {AlertTriangle, XCircle} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {deleteCampaign} from "@/lib/actions/campaign";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";

const CancelCampaign = ({campaignId}: { campaignId: number }) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleCancel = async () => {
        setLoading(true);
        try {
            const result = await deleteCampaign(campaignId);
            if (result) {
                toast.success("Campaign cancelled successfully.");
                router.refresh();
                return;
            }

            toast.error("Failed to cancel campaign!");
        } catch (error) {
            console.error('Error cancelling campaign:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    disabled={loading}
                >
                    <XCircle className="size-4"/>
                    <span>Cancel</span>
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-4 text-red-600">
                        <AlertTriangle className="size-5" />
                        Confirm Cancel
                    </DialogTitle>
                </DialogHeader>

                <div className="text-sm text-muted-foreground px-1 py-2">
                    Are you sure you want to cancel this campaign?
                </div>

                <DialogFooter className="flex justify-end gap-2">
                    <DialogClose asChild>
                        <Button variant="outline" disabled={loading}>
                            Close
                        </Button>
                    </DialogClose>
                    <Button
                        variant="destructive"
                        className="text-white"
                        disabled={loading}
                        isLoading={loading}
                        onClick={handleCancel}
                    >
                        Cancel Campaign
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CancelCampaign
