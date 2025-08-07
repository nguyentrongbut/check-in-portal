'use client'

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {DataTable} from "@/components/common/data.table";
import {columnsUser} from "@/components/pages/admin/user/columns.user";
import {useEffect, useState} from "react";
import {TStatusUser, TUser} from "@/types/data";
import {Search} from "lucide-react";
import {Input} from "@/components/ui/input";

const TableUser = ({listUser}: { listUser: TUser[] }) => {

    const [users, setUsers] = useState<TUser[]>(listUser);
    const [roleFilter, setRoleFilter] = useState<string>("all");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        setUsers(listUser);
    }, [listUser]);

    const handleStatusChange = (userId: number, newStatus: TStatusUser) => {
        setUsers(prev =>
            prev.map(user =>
                user.id === userId ? {...user, status: newStatus} : user
            )
        );
    };

    const filteredUsers = users.filter((user) => {
        const roleMatches = roleFilter === "all" || user.role === roleFilter;
        const statusMatches = statusFilter === "all" || user.status === statusFilter;
        const searchMatches =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());

        return roleMatches && statusMatches && searchMatches;
    });

    return (
        <>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400"/>
                    <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Select onValueChange={(value) => setRoleFilter(value)} defaultValue="all">
                    <SelectTrigger className="w-full sm:w-[150px]">
                        <SelectValue placeholder="Filter by role"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Role</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="merchant">Merchant</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                </Select>
                <Select onValueChange={(value) => setStatusFilter(value)} defaultValue='all'>
                    <SelectTrigger className="w-full sm:w-[150px]">
                        <SelectValue placeholder="Filter by status"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <DataTable data={filteredUsers} columns={columnsUser(handleStatusChange)}/>
        </>
    )
}

export default TableUser