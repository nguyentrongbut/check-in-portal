'use client'

import Link from "next/link";
import {cn} from "@/lib/utils";
import {adminNavItems, allocatorNavItems} from "@/constants/sidebar";
import {usePathname} from "next/navigation";
import {useUserInfoFromCookie} from "@/hooks/useUserInfoFromCookie";
import UserInfoSidebar from "@/components/layout/sidebar/user.info.sidebar";
import Logo from "@/components/common/logo";
import {useEffect, useState} from "react";
import {TNavSideBar} from "@/types/layout";
import {useSidebarContext} from "@/context/sidebar.context";

const SidebarComponent = () => {
    const userInfo = useUserInfoFromCookie();

    const { refreshKey } = useSidebarContext();

    const role = userInfo?.role
    const userRole = role;

    const [navItems, setNavItems] = useState<TNavSideBar[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (userRole === "ROLE_ADMIN") {
                const items = await adminNavItems();
                setNavItems(items);
            } else {
                setNavItems(allocatorNavItems);
            }
        }
        fetchData();
    }, [userRole, refreshKey]);

    const pathname = usePathname()

    return (
        <aside className='fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200'>
            <div className='flex flex-col h-full'>
                {/* Logo */}
                <Logo href={userRole === 'ROLE_ADMIN' ? "/admin/dashboard" : "/dashboard"}/>

                {/* Navigation */}
                <nav className="flex-1 px-4 pb-6 space-y-2">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
                        {userRole === "ROLE_ADMIN" ? "Admin Panel" : "Merchant"}
                    </div>
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname.startsWith(item.href)

                        return (
                            <div key={item.href} className='relative'>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                        isActive ? "bg-primary/10 text-primary" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                                    )}
                                >
                                    <Icon className="mr-3 size-5"/>
                                    {item.label}
                                </Link>
                                {
                                    (item?.badge ?? 0) > 0 && (
                                        <Link href={item.href} className="absolute -right-1.5 -top-2">
                                          <span
                                              className="relative flex h-[18px] min-w-[18px] items-center justify-center
                                                       rounded-full bg-primary px-1 text-[10px] font-semibold text-white shadow-md"
                                          >
                                            {item?.badge}
                                            <span
                                                className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/30 opacity-75"></span>
                                          </span>
                                        </Link>
                                    )
                                }
                            </div>
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