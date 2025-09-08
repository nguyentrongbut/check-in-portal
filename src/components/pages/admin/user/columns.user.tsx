"use client"

import {ColumnDef} from "@tanstack/react-table"
import {TRole, TStatusUser, TUser} from "@/types/data";
import {ArrowUpDown, UserX} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {formatDate} from "@/utils/formatHelpers";
import {getBadgeRoleVariant, getBadgeUserStatusVariant} from "@/utils/getBadgeVariant";
import Image from "next/image";
import DialogViewUser from "@/components/pages/admin/user/dialog.view.user";
import DialogDeleteAdmin from "@/components/common/dialog.delete.admin";
import DialogEditUser from "@/components/pages/admin/user/dialog.edit.user";
import {blockUser} from "@/lib/actions/user";
import ApprovedUser from "@/components/pages/admin/user/approved.user";

export const columnsUser: ColumnDef<TUser>[] = [
    {
        accessorKey: "fullName",
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
            const avatar: string = user?.avatarUrl;
            const userName: string = row.getValue("fullName");

            return (
                <div className='ml-4 flex gap-2 items-center'>
                    <Image
                        className='size-10 object-cover rounded-full'
                        width={40}
                        height={40}
                        src={avatar || '/default-avatar.png'}
                        alt={userName || 'name account local hunt'}/>
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
            const typeRole: TRole = row.getValue("role");
            const role = typeRole.toLowerCase();

            return (
                <Badge variant={getBadgeRoleVariant(role)}>
                    {role === 'allocator' ? 'merchant' : role}
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
            const status: TStatusUser = row.getValue("status");

            return (
                <Badge variant={getBadgeUserStatusVariant(status?.toLowerCase())}>
                    {status?.toLowerCase()}
                </Badge>
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
                const userName: string = row.getValue("fullName") || user?.email;

                return (
                    <div className="flex justify-center space-x-2">
                        <DialogViewUser userId={userId}/>

                        <DialogEditUser
                            infoUser={user}
                        />

                        {
                            user?.status.toLowerCase() === 'active' && (
                                <DialogDeleteAdmin
                                    onDelete={() => blockUser(userId)}
                                    Icon={UserX}
                                    entityName={`${userName}`}
                                />
                            )
                        }

                        {
                            user?.status.toLowerCase() === 'banned' && (
                               <ApprovedUser userId={userId}/>
                            )
                        }
                    </div>
                )
            },
    }
]