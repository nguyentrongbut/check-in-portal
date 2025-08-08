'use client'

import {XCircle} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {useState} from "react";
import FormReject from "@/components/pages/admin/campaign/form.reject";

const DialogReject = ({campaignId}: { campaignId: number }) => {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                    <XCircle className="h-4 w-4"/>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Reject Campaign</DialogTitle>
                    <DialogDescription>
                        Please provide a reason for rejecting
                    </DialogDescription>
                </DialogHeader>
                <FormReject onClose={() => setOpen(false)} campaignId={campaignId}/>
            </DialogContent>
        </Dialog>
    )
}

export default DialogReject