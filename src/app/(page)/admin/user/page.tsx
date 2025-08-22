import {Metadata} from "next";

export const dynamic = 'force-dynamic';

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {getUsers} from "@/lib/actions/auth";
import TableUser from "@/components/pages/admin/user/table.user";
import DialogCreateUser from "@/components/pages/admin/user/dialog.create.user";

export const metadata: Metadata = {
    title: "User Management - Local Hunt Admin",
    description:
        "Manage all Local Hunt users: view, create, update, and control merchant and customer accounts in the admin dashboard.",
};


const UserManagement = async () => {

    const listUser = await getUsers()

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