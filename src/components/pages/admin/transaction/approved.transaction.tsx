'use client'

import {AlertTriangle, CheckCircle} from "lucide-react";
import {useState} from "react";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {approveTransaction} from "@/lib/actions/transaction";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {useSidebarContext} from "@/context/sidebar.context";

const ApprovedTransaction = ({transactionId}: { transactionId: number }) => {
    const [loading, setLoading] = useState(false);
    const { refreshSidebar } = useSidebarContext();
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleApprove = async () => {
        setLoading(true);
        try {
            const result = await approveTransaction(transactionId);
            if (result) {
                setOpen(false);
                toast.success("Transaction approved successfully.");
                router.refresh();
                refreshSidebar()
                return
            }

            toast.error("approve status campaign fail!");
        } catch (error) {
            console.error('Error approving campaign:', error);
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
                    className="text-green-600 hover:text-green-700 hover:bg-green-50"
                    disabled={loading}
                >
                    <CheckCircle className="size-4 cursor-pointer "/>
                    <span>Approve</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-4 text-red-600">
                        <AlertTriangle className="size-5" />
                        Confirm
                    </DialogTitle>
                </DialogHeader>

                <div className="text-sm text-muted-foreground px-1 py-2">
                    Please verify the $10 transaction with transfer code LH1234?
                </div>

                <DialogFooter className="flex justify-end gap-2">
                    <DialogClose asChild>
                        <Button variant="outline" disabled={loading}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        variant="default"
                        className="text-white"
                        disabled={loading}
                        isLoading={loading}
                        onClick={handleApprove}
                    >
                        Approve
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ApprovedTransaction