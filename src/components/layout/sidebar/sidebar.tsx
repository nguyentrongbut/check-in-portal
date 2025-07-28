'use client'

import {Menu} from "lucide-react";
import useTailwindBreakpoints from "@/hooks/useTailwindBreakpoints";
import {Sheet, SheetContent, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import SidebarComponent from "@/components/layout/sidebar/sidebar.component";

const Sidebar = () => {

    const {isMd} = useTailwindBreakpoints()

    return (
        <>
            {/* Sidebar mobile, tablet */}
            {!isMd && (
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="fixed top-4 left-4 z-50"
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

            {/* Sidebar desktop */}
            {isMd && (
                <SidebarComponent/>
            )}
        </>
    )
}

export default Sidebar;