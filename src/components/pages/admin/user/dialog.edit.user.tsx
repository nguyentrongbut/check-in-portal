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
import {Edit} from "lucide-react";
import FormUpdateUser from "@/components/pages/admin/user/form.update.user";
import {TUser} from "@/types/data";
import {useState} from "react";

const DialogEditUser = ({infoUser}: { infoUser: TUser }) => {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                    <Edit className="size-4"/>
                </Button>
            </DialogTrigger>
            <DialogContent className='h-[80vh] px-0'>
                <div className='overflow-y-auto custom-scroll px-6 space-y-6'>
                    <DialogHeader>
                        <DialogTitle>Update User</DialogTitle>
                        <DialogDescription>
                            Update information for <span className='capitalize'>{infoUser?.fullName}</span>
                        </DialogDescription>
                    </DialogHeader>
                    <FormUpdateUser infoUser={infoUser} onClose={() => setOpen(false)}/>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default DialogEditUser;