import {Metadata} from "next";

export const dynamic = 'force-dynamic';

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

import TableUser from "@/components/pages/admin/user/table.user";
import {getUsers} from "@/lib/actions/user";
import {SearchParamsProps} from "@/app/(page)/wallet/page";
import {getPaginatedResult} from "@/utils/pagination";
import { TUser} from "@/types/data";

export const metadata: Metadata = {
    title: "User Management - Local Hunt Admin",
    description:
        "Manage all Local Hunt users: view, create, update, and control merchant and customer accounts in the admin dashboard.",
};

export interface SearchParamsUserProps extends SearchParamsProps {
    searchParams: Promise<{
        page?: string;
        size?: string;
        keyword?: string;
        role?: string;
        status?: string;
    }>;
}


const UserManagement = async ({searchParams}: SearchParamsUserProps) => {

    const data = await getPaginatedResult<TUser, { keyword?: string; role?: string; status?: string }>(
        searchParams,
        async (page, size, extra) => {
            return getUsers(page, size, extra);
        }
    );

    return (
        <div className="space-y-6">
            {/* Table */}
            <Card>
                <CardHeader>
                    <div className='flex justify-between items-center'>
                        <div>
                            <CardTitle>All Users</CardTitle>
                            <CardDescription>View and manage user accounts and merchant profiles</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <TableUser data={data}/>
                </CardContent>
            </Card>
        </div>
    )
}

export default UserManagement