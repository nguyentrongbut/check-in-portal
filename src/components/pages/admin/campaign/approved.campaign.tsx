'use client'

import {CheckCircle, LoaderCircle} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import toast from "react-hot-toast";
import {approveCampaign} from "@/lib/actions/campaign";
import {useRouter} from "next/navigation";

const ApprovedCampaign = ({campaignId}: {campaignId: number}) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleApprove = async () => {
        setLoading(true);
        try {
            const result = await approveCampaign(campaignId);
            if (result === 200) {
                toast.success("Campaign approved successfully.");
                router.refresh();
                return
            }

            toast.error("Change status campaign fail!");
        } catch (error) {
            console.error('Error approving campaign:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Button
            onClick={handleApprove}
            variant="ghost"
            size="sm"
            className="text-green-600 hover:text-green-700 hover:bg-green-50"
            disabled={loading}
        >
            {loading ? (
                <LoaderCircle className="size-4 animate-spin" />
            ) : (
                <CheckCircle className="size-4" />
            )}
        </Button>
    )
}

export default ApprovedCampaign