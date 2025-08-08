'use client'

import {CheckCircle, LoaderCircle} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {deleteSuspiciousCheckin} from "@/lib/actions/fraud.detection";

const ApprovedFraud = ({fraudId}: {fraudId: number}) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleApprove = async () => {
        setLoading(true);
        try {
            const result = await deleteSuspiciousCheckin(fraudId);
            if (result) {
                toast.success("Fraud check passed successfully.");
                router.refresh();
                return
            }

            toast.error("Fraud check fail!");
        } catch (error) {
            console.error('Error Fraud check:', error);
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

export default ApprovedFraud