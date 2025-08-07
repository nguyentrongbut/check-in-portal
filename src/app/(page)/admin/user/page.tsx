export const dynamic = 'force-dynamic';

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {getUsers} from "@/lib/actions/auth";
import TableUser from "@/components/pages/admin/user/table.user";
import DialogCreateUser from "@/components/pages/admin/user/dialog.create.user";

const UserManagement = async () => {

    const listUser = await getUsers()

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">User Management</h1>
                    <p className="text-gray-600">Manage users and merchants in the system</p>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                        <div className="size-3 bg-blue-500 rounded-full"></div>
                        <span>Users: 1</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="size-3 bg-green-500 rounded-full"></div>
                        <span>Merchants: 1</span>
                    </div>
                </div>
            </div>

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