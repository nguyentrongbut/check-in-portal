'use client'

import {Sheet, SheetContent, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {Menu} from "lucide-react";
import SidebarComponent from "@/components/layout/sidebar/sidebar.component";
import useTailwindBreakpoints from "@/hooks/useTailwindBreakpoints";
import {usePathname} from "next/navigation";
import {useUserInfoFromCookie} from "@/hooks/useUserInfoFromCookie";
import {getPageTitleFromNavItems} from "@/utils/getPageTitle";

const Header = () => {
    const userInfo = useUserInfoFromCookie()

    const name = userInfo?.name
    const role = userInfo?.role || ''
    const { isMd } = useTailwindBreakpoints()

    const pathname = usePathname()

    console.log(pathname)

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
                {pathname === "/dashboard"
                    ? `Welcome ${name}!`
                    : getPageTitleFromNavItems(pathname, role)}
            </h3>
        </header>
    )
}

export default Header;