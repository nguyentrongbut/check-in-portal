import {Metadata} from "next";

export const dynamic = 'force-dynamic';

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

import TableUser from "@/components/pages/admin/user/table.user";
import DialogCreateUser from "@/components/pages/admin/user/dialog.create.user";
import {getUsers} from "@/lib/actions/user";

export const metadata: Metadata = {
    title: "User Management - Local Hunt Admin",
    description:
        "Manage all Local Hunt users: view, create, update, and control merchant and customer accounts in the admin dashboard.",
};

export interface GetUsersParams {
    keyword?: string;
    role?: string;
    status?: string;
    page?: number;
    size?: number;
}


const UserManagement = async ({searchParams}: { searchParams : Promise<{ [key: string]: string | string[] | undefined }> }) => {

    const params: GetUsersParams = await searchParams;
    const data = await getUsers({
        keyword: params.keyword,
        role: params.role,
        status: params.status,
        page: Number(params.page) || 0,
        size: Number(params.size) || 10,
    });

    const listUser = data?.data?.items || [];

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
                        <DialogCreateUser/>
                    </div>
                </CardHeader>
                <CardContent>
                    <TableUser listUser={listUser}/>
                </CardContent>
            </Card>
        </div>
    )
}

export default UserManagement