'use client'

import {BarChart3} from "lucide-react";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {adminNavItems, allocatorNavItems} from "@/constants/sidebar";
import {usePathname} from "next/navigation";
import {useUserInfoFromCookie} from "@/hooks/useUserInfoFromCookie";
import UserInfoSidebar from "@/components/layout/sidebar/user.info.sidebar";

const SidebarComponent = () => {
    const userInfo = useUserInfoFromCookie();

    const role = userInfo?.role
    const userRole = role;
    const navItems = userRole === "admin" ? adminNavItems : allocatorNavItems

    const pathname = usePathname()

    return (
        <aside className='fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200'>
            <div className='flex flex-col h-full'>
                {/* Logo */}
                <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                        <BarChart3 className="size-8 text-primary"/>
                        <span className="text-xl font-bold text-gray-900">Check-in Portal</span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-2">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
                        {userRole === "admin" ? "Admin Panel" : "Merchant"}
                    </div>
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname.startsWith(item.href)

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                    isActive ? "bg-primary/10 text-primary" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                                )}
                            >
                                <Icon className="mr-3 size-5"/>
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>

                {/* User info */}
                <UserInfoSidebar userRole={userRole}/>
            </div>
        </aside>
    )
}

export default SidebarComponent;