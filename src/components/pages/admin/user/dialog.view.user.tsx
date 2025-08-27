'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Eye} from "lucide-react";
import {TUser} from "@/types/data";
import {useEffect, useState} from "react";
import {Badge} from "@/components/ui/badge";
import {getBadgeRoleVariant, getBadgeStatusVariant} from "@/utils/getBadgeVariant";
import {formatDate, formatNumber} from "@/utils/formatHelpers";
import {getUser} from "@/lib/actions/user";

const DialogViewUser = ({userId}: {userId: number}) => {

    const [open, setOpen] = useState(false);
    const [user, setUser] = useState<TUser | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open) {
            setLoading(true);
            try {
                const fetchUser = async () => {
                    const result = await getUser(userId);
                    if (result) {
                        setUser(result);
                    } else {
                        console.error('User not found');
                    }
                }
                fetchUser();
            } catch (error) {
                console.error('Error when fetch user:', error);
            } finally {
                setLoading(false);
            }
        }
    }, [open, userId]);

    if (loading) return 'Loading...';

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
                    <Eye className="size-4"/>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>User Profile</DialogTitle>
                    <DialogDescription>
                        Detailed information for <span className='capitalize'>{user?.fullName || user?.email}</span>
                    </DialogDescription>
                </DialogHeader>
                {user && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-medium">Basic Information</h4>
                                <div className="space-y-2 text-sm mt-2">
                                    <p>
                                        <strong>Name:</strong> {user?.fullName}
                                    </p>
                                    <p>
                                        <strong>Email:</strong> {user?.email}
                                    </p>
                                    <div>
                                        <strong>Role: </strong>
                                        <Badge
                                            variant={getBadgeRoleVariant(user?.role?.toLowerCase())}
                                        >
                                            {user?.role?.toLowerCase() === "allocator" ? "merchant" : user?.role?.toLowerCase()}
                                        </Badge>
                                    </div>

                                    <div>
                                        <strong>Status: </strong>
                                        <Badge variant={getBadgeStatusVariant(user?.status?.toLowerCase())}>{user?.status?.toLowerCase()}</Badge>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-medium">Other</h4>
                                <div className="space-y-2 text-sm mt-2">
                                    <div>
                                        <strong>Phone: </strong>
                                        <span>{user?.phone}</span>
                                    </div>
                                    <div>
                                        <strong>Address: </strong>
                                        <span>{user?.address}</span>
                                    </div>
                                    <div>
                                        <strong>Created Date: </strong>
                                        <span>{formatDate(user?.createdAt)}</span>
                                    </div>
                                    <div>
                                        <strong>Updated Date: </strong>
                                        <span>{formatDate(user?.updatedAt)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*<div>*/}
                        {/*    <h4 className="font-medium">Points Summary</h4>*/}
                        {/*    <div className={`grid ${user?.role === "user" ? 'grid-cols-3' : 'grid-cols-2'} gap-4 mt-2`}>*/}
                        {/*        {user?.role === 'user' && (*/}
                        {/*            <div className="text-center p-3 bg-green-50 rounded-lg">*/}
                        {/*                <div className="text-lg font-bold text-green-600">*/}
                        {/*                    {formatNumber(user?.pointsEarned) || 0}*/}
                        {/*                </div>*/}
                        {/*                <div className="text-xs text-green-600">Points Earned</div>*/}
                        {/*            </div>*/}
                        {/*        )}*/}
                        {/*        <div className="text-center p-3 bg-red-50 rounded-lg">*/}
                        {/*            <div className="text-lg font-bold text-red-600">*/}
                        {/*                {formatNumber(user?.pointsSpent) || 0}*/}
                        {/*            </div>*/}
                        {/*            <div className="text-xs text-red-600">Points Spent</div>*/}
                        {/*        </div>*/}
                        {/*        <div className="text-center p-3 bg-blue-50 rounded-lg">*/}
                        {/*            <div className="text-lg font-bold text-blue-600">*/}
                        {/*                {formatNumber(user?.currentBalance) || 0}*/}
                        {/*            </div>*/}
                        {/*            <div className="text-xs text-blue-600">Current Balance</div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default DialogViewUser