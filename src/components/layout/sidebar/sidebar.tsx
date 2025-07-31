'use client'

import useTailwindBreakpoints from "@/hooks/useTailwindBreakpoints";
import SidebarComponent from "@/components/layout/sidebar/sidebar.component";

const Sidebar = () => {

    const {isMd} = useTailwindBreakpoints()

    return (
        <>
            {/* Sidebar desktop */}
            {isMd && (
                <SidebarComponent/>
            )}
        </>
    )
}

export default Sidebar;