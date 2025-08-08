'use client'

import {Ban} from "lucide-react";
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
import FormBanUser from "@/components/pages/admin/fraud/form.ban.user";


const DialogBanUser = ({userId, fraudId}: { userId: number, fraudId: number }) => {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                    <Ban className="h-4 w-4"/>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Block User</DialogTitle>
                    <DialogDescription>
                        This will prevent the user from making future check-ins. Please provide a reason.
                    </DialogDescription>
                </DialogHeader>
                <FormBanUser onClose={() => setOpen(false)} userId={userId} fraudId={fraudId}/>
            </DialogContent>
        </Dialog>
    )
}

export default DialogBanUser