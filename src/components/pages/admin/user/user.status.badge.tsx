'use client'

import {TStatusUser} from "@/types/data";
import {useState} from "react";
import {Badge} from "@/components/ui/badge";
import {getBadgeUserStatusVariant} from "@/utils/getBadgeVariant";
import {updateStatus} from "@/lib/actions/auth";
import toast from "react-hot-toast";

const UserStatusBadge = ({userId, status, onStatusChange}
                         : {userId: number, status: TStatusUser , onStatusChange: (userId: number, newStatus: TStatusUser) => void}) => {
    const [loading, setLoading] = useState(false);

    const toggleStatus = async () => {
        const newStatus: TStatusUser = status === "active" ? "inactive" : "active";
        setLoading(true);

        try {
            const res = await updateStatus(userId, newStatus);
            if (res === 200) {
                onStatusChange(userId, newStatus);
                toast.success('Updated user status successfully');
            }
        } catch (error) {
            console.error("Toggle status error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Badge
            onClick={toggleStatus}
            className={`cursor-pointer ${loading ? 'opacity-50 pointer-events-none' : ''}`}
            variant={getBadgeUserStatusVariant(status)}
        >
            {status}
        </Badge>
    );
};

export default UserStatusBadge;
