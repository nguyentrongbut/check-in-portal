'use client'

import {Sheet, SheetContent, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import { CirclePoundSterling, Menu } from "lucide-react";
import SidebarComponent from "@/components/layout/sidebar/sidebar.component";
import useTailwindBreakpoints from "@/hooks/useTailwindBreakpoints";
import {usePathname} from "next/navigation";
import {useUserInfoFromCookie} from "@/hooks/useUserInfoFromCookie";
import {getPageTitleFromNavItems} from "@/utils/getPageTitle";
import {formatNumber} from "@/utils/formatHelpers";
import Link from "next/link";
import useWalletBalance from "@/hooks/useWalletBalance";

const Header = () => {
    const userInfo = useUserInfoFromCookie()

    const name = userInfo?.name
    const role = userInfo?.role === 'ROLE_ADMIN' ? "admin" : 'merchant'
    const { isMd } = useTailwindBreakpoints()

    const pathname = usePathname()

    const { balance, loading } = useWalletBalance();

    return (
        <header className='sticky top-0 h-[100px] flex items-center gap-4 bg-[#f9f7f7] px-5 md:px-9 md:ml-64 z-10'>
            {/* Sidebar mobile, tablet */}
            {!isMd && (
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                        >
                            <Menu className="size-6"/>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side='left' className='w-[255px]'>
                        <SheetTitle></SheetTitle>
                        <SidebarComponent/>
                    </SheetContent>
                </Sheet>
            )}
            <h3 className='uppercase font-medium text-lg opacity-60'>
                {(
                    (role !== "admin" && pathname === "/dashboard") ||
                    (role === "admin" && pathname === "/admin/dashboard")
                )
                    ? `Welcome ${name || (role === "admin" ? "Admin" : "Merchant")} !`
                    : getPageTitleFromNavItems(pathname, role)}
            </h3>
            {!pathname.startsWith('/admin') && (
                <Link href='/wallet' className='text-primary ml-auto flex items-center justify-center gap-1.5'>
                    <p className='font-bold'>
                        {loading ? "..." : balance !== null ? formatNumber(balance) : "0"}
                    </p>
                    <CirclePoundSterling className='size-4'/>
                </Link>
            )}
        </header>
    )
}

export default Header;