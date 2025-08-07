"use client"

import {ColumnDef} from "@tanstack/react-table"
import {TRole, TStatusUser, TUser} from "@/types/data";
import {ArrowUpDown, Edit, UserX} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {formatDate} from "@/utils/formatHelpers";
import {Button} from "@/components/ui/button";
import {getBadgeRoleVariant} from "@/utils/getBadgeVariant";
import UserStatusBadge from "@/components/pages/admin/user/user.status.badge";
import Image from "next/image";
import DialogViewUser from "@/components/pages/admin/user/dialog.view.user";
import DialogDeleteAdmin from "@/components/common/dialog.delete.admin";
import {deleteUser} from "@/lib/actions/auth";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import FormUpdateUser from "@/components/pages/admin/user/form.update.user";
import DialogEditUser from "@/components/pages/admin/user/dialog.edit.user";

export const columnsUser = (
    onStatusChange: (userId: number, newStatus: TStatusUser) => void
): ColumnDef<TUser>[] => [
    {
        accessorKey: "name",
        header: ({column}) => {
            return (
                <div
                    className="flex gap-2 items-center cursor-pointer ml-4"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    User
                    <ArrowUpDown className="ml-2 size-4"/>
                </div>
            )
        },
        cell: ({row}) => {
            const user: TUser = row.original;
            const email: string = user?.email;
            const avatar: string = user?.avatar;
            const userName: string = row.getValue("name");

            return (
                <div className='ml-4 flex gap-2 items-center'>
                    <Image
                        className='size-10 object-cover rounded-full'
                        width={40}
                        height={40}
                        src={avatar || '/default-avatar.png'}
                        alt={userName}/>
                    <div>
                        <p className='font-medium'>
                            {userName}
                        </p>
                        <p className='text-sm opacity-60'>{email}</p>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "role",
        header: ({column}) => {
            return (
                <div
                    className="flex gap-2 items-center cursor-pointer"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Role
                    <ArrowUpDown className="ml-2 size-4"/>
                </div>
            )
        },
        cell: ({row}) => {
            const role: TRole = row.getValue("role");

            return (
                <Badge variant={getBadgeRoleVariant(role)}>
                    {role}
                </Badge>
            );
        },
    },
    {
        accessorKey: "status",
        header:
            ({column}) => {
                return (
                    <div
                        className="flex gap-2 items-center cursor-pointer"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Status
                        <ArrowUpDown className="ml-2 size-4"/>
                    </div>
                )
            },
        cell: ({row}) => {
            const user: TUser = row.original;
            const userId: number = user.id;
            const status: TStatusUser = row.getValue("status");

            return (
                <UserStatusBadge
                    userId={userId}
                    status={status}
                    onStatusChange={onStatusChange}
                />
            );
        },
    },
    {
        accessorKey: "createdAt",
        header:
            ({column}) => {
                return (
                    <div
                        className="flex gap-2 items-center cursor-pointer"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Created At
                        <ArrowUpDown className="ml-2 size-4"/>
                    </div>
                )
            },
        cell: ({row}) => {
            const createdAt: string = row.getValue("createdAt");

            return (
                <div>
                    {formatDate(createdAt)}
                </div>
            );
        },
    },
    {
        accessorKey: "updatedAt",
        header:
            ({column}) => {
                return (
                    <div
                        className="flex gap-2 items-center cursor-pointer"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Updated At
                        <ArrowUpDown className="ml-2 size-4"/>
                    </div>
                )
            },
        cell: ({row}) => {
            const updatedAt: string = row.getValue("updatedAt");

            return (
                <div>
                    {formatDate(updatedAt)}
                </div>
            );
        },
    },
    {
        id: "actions",
        header: () => {
            return (
                <div
                    className="mr-4 flex items-center justify-center"
                >
                    Actions
                </div>
            )
        },
        cell:
            ({row}) => {
                const user: TUser = row.original;
                const userId: number = user.id;
                const userName: string = row.getValue("name");

                return (
                    <div className="flex justify-center space-x-2">
                        <DialogViewUser userId={userId}/>

                        <DialogEditUser
                            infoUser={user}
                        />

                        <DialogDeleteAdmin
                            onDelete={() => deleteUser(userId)}
                            Icon={UserX}
                            entityName={`${userName} user`}
                        />
                    </div>
                )
            },
    }
    ,
]