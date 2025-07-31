"use client";

import {Trash2, Edit, Eye, MoreHorizontal} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import DialogDelete from "@/components/common/dialog.delete";
import Link from "next/link";
import {useState} from "react";

interface EntityActionsProps {
    id: number;
    viewUrl?: string;
    editUrl: string;
    entityName: string;
    onDelete: () => Promise<boolean>;
    edit?: boolean
}

const EntityActions = ({
                           viewUrl,
                           editUrl,
                           entityName,
                           onDelete,
                           edit = true
                       }: EntityActionsProps) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex items-center justify-center mr-4">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="size-8 p-0">
                        <span className="sr-only">Dropdown Actions</span>
                        <MoreHorizontal className="size-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {viewUrl && (
                        <DropdownMenuItem asChild>
                            <Link href={viewUrl} className="flex items-center gap-2 cursor-pointer">
                                <Eye className="size-4"/>
                                <span>View Details</span>
                            </Link>
                        </DropdownMenuItem>
                    )}

                    {edit && (
                        <DropdownMenuItem asChild>
                            <Link href={editUrl} className="flex items-center gap-2 cursor-pointer">
                                <Edit className="size-4"/>
                                <span>Edit</span>
                            </Link>
                        </DropdownMenuItem>
                    )}

                    <DropdownMenuSeparator/>

                    <DropdownMenuItem
                        className="text-red-600 cursor-pointer"
                        onSelect={() => setOpen(true)}
                    >
                        <Trash2 className="size-4"/>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DialogDelete
                open={open}
                onOpenChange={setOpen}
                name={entityName}
                onConfirm={onDelete}
                successMessage={`Successfully deleted ${entityName}`}
                errorMessage={`Failed to delete ${entityName}, please try again`}
            />
        </div>
    );
};

export default EntityActions;
