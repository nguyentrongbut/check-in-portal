'use client'

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {columnsUser} from "@/components/pages/admin/user/columns.user";
import {useState} from "react";
import {Search} from "lucide-react";
import {Input} from "@/components/ui/input";
import {useRouter, useSearchParams} from "next/navigation";
import {DataTableServer} from "@/components/common/data.table.server";
import {TUser} from "@/types/data";

interface TableUserProps {
    currentPage: number;
    pageSize: number;
    items: TUser[];
    total: number;
    totalPages: number;
}

const TableUser = ({data}: { data: TableUserProps }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [roleFilter, setRoleFilter] = useState<string>(searchParams.get("role") || "all");
    const [statusFilter, setStatusFilter] = useState<string>(searchParams.get("status") || "all");
    const [searchTerm, setSearchTerm] = useState<string>(searchParams.get("keyword") || "");

    const updateQueryParam = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value === "all" || value === "") {
            params.delete(key);
        } else {
            params.set(key, value);
        }
        router.push(`?${params.toString()}`, {scroll: false});
    };

    return (
        <>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400"/>
                    <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            updateQueryParam("keyword", e.target.value);
                        }}
                        className="pl-10"
                    />
                </div>
                <Select
                    onValueChange={(value) => {
                        setRoleFilter(value);
                        updateQueryParam("role", value);
                    }}
                    value={roleFilter}
                >
                    <SelectTrigger className="w-full sm:w-[150px]">
                        <SelectValue placeholder="Filter by role"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Role</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="allocator">Merchant</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                </Select>
                <Select
                    onValueChange={(value) => {
                        setStatusFilter(value);
                        updateQueryParam("status", value);
                    }}
                    value={statusFilter}
                >
                    <SelectTrigger className="w-full sm:w-[150px]">
                        <SelectValue placeholder="Filter by status"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="banned">Banned</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <DataTableServer
                data={data.items}
                columns={columnsUser}
                total={data.total}
                currentPage={data.currentPage}
                pageSize={data.pageSize}
                totalPages={data.totalPages}
            />
        </>
    )
}

export default TableUser