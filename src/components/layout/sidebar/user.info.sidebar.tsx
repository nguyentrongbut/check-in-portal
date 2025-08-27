'use client'

import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {LogOut, User} from "lucide-react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {logout} from "@/lib/actions/auth";
import toast from "react-hot-toast";

const UserInfoSidebar = ({userRole}: { userRole: string | undefined }) => {

    const router = useRouter()
    const handleLogout = async () => {
        const result = await logout()
        if (!result.success) return toast.error("User logged out fail!")
        toast.success("User logged out successfully!")
        router.push('/')
    }
    return (
        <div className="p-4 border-t border-gray-200">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div
                        className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                    <span
                                        className="text-white text-sm font-medium">{userRole === "ROLE_ADMIN" ? "A" : "U"}</span>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                                {userRole === "ROLE_ADMIN" ? "Admin User" : "Business User"}
                            </p>
                            <p className="text-xs text-gray-500 capitalize">{userRole === "ROLE_ADMIN" ? "Admin" : "Merchant"}</p>
                        </div>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <Link href='/profile'>
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4"/>
                            <span>Profile</span>
                        </DropdownMenuItem>
                    </Link>

                    <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4"/>
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default UserInfoSidebar