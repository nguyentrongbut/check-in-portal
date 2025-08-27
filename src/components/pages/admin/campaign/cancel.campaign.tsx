'use client'

import { XCircle} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {deleteCampaign} from "@/lib/actions/campaign";

const CancelCampaign = ({campaignId}: { campaignId: number }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleApprove = async () => {
        setLoading(true);
        try {
            const result = await deleteCampaign(campaignId);
            if (result) {
                toast.success("Campaign cancel successfully.");
                router.refresh();
                return
            }

            toast.error("Change status campaign fail!");
        } catch (error) {
            console.error('Error cancel campaign:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Button
            onClick={handleApprove}
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
            disabled={loading}
            isLoading={loading}
            loadingColor='border-red-600'
        >
            <XCircle className="size-4"/>
            Cancel
        </Button>
    )
}

export default CancelCampaign