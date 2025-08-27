'use client'

import {CheckCircle, Loader} from "lucide-react";
import {useState} from "react";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {approveTransaction} from "@/lib/actions/transaction";

const ApprovedTransaction = ({transactionId}: { transactionId: number }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleApprove = async () => {
        setLoading(true);
        try {
            const result = await approveTransaction(transactionId);
            if (result) {
                toast.success("Transaction approved successfully.");
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
            variant="ghost"
            size="sm"
            className="text-green-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleApprove}
            disabled={loading}
        >
            {
                loading ? <Loader className='size-4 text-primary'/> :
                    <CheckCircle className="size-4 cursor-pointer "/>
            }
        </Button>
    )
}

export default ApprovedTransaction