'use client'

import {useState} from "react";
import DialogDelete from "@/components/common/dialog.delete";
import {Button} from "@/components/ui/button";
import {LucideIcon} from "lucide-react";

interface DialogDeleteAdminProps {
    Icon: LucideIcon
    entityName: string;
    onDelete: () => Promise<boolean>
}

const DialogDeleteAdmin = ({
                               Icon,
                               entityName,
                               onDelete,
                           }: DialogDeleteAdminProps) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => {
                    setOpen(true)
                }}>
                    <Icon className='size-4'/>
            </Button>
            <DialogDelete
                open={open}
                onOpenChange={setOpen}
                name={entityName}
                onConfirm={onDelete}
                successMessage={`Successfully deleted ${entityName}`}
                errorMessage={`Failed to delete ${entityName}, please try again`}
            />
        </>
    )
}

export default DialogDeleteAdmin;