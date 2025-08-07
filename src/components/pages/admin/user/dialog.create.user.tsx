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
import {useState} from "react";
import FormCreateUser from "@/components/pages/admin/user/form.create.user";

const DialogCreateUser = () => {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className='cursor-pointer'>Add User</Button>
            </DialogTrigger>
            <DialogContent className='h-[80vh] px-0'>
                <div className='overflow-y-auto custom-scroll px-6 space-y-6'>
                    <DialogHeader>
                        <DialogTitle>Add User</DialogTitle>
                        <DialogDescription>
                            Create a new user account by filling out the form below.
                        </DialogDescription>
                    </DialogHeader>
                    <FormCreateUser onClose={() => setOpen(false)}/>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default DialogCreateUser;