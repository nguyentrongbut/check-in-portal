'use client'

import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {LogOut, Settings, User} from "lucide-react";
import {deleteCookie} from "@/utils/logoutClient";
import {useRouter} from "next/navigation";

const UserInfoSidebar = ({userRole} : {userRole: string | undefined}) => {

    const router = useRouter()
    const handleLogout = () => {
        deleteCookie('CIPUserInfo')
        router.refresh()
    }
    return (
        <div className="p-4 border-t border-gray-200">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div
                        className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                    <span
                                        className="text-white text-sm font-medium">{userRole === "admin" ? "A" : "U"}</span>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                                {userRole === "admin" ? "Admin User" : "Business User"}
                            </p>
                            <p className="text-xs text-gray-500 capitalize">{userRole}</p>
                        </div>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4"/>
                        <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4"/>
                        <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
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