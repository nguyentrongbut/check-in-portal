'use client'

import useTailwindBreakpoints from "@/hooks/useTailwindBreakpoints";
import SidebarComponent from "@/components/layout/sidebar/sidebar.component";
import {useEffect, useState} from "react";
import SidebarSkeleton from "@/components/skeleton/sidebar.skeleton";

const Sidebar = () => {

    const [mounted, setMounted] = useState(false);
    const {isMd} = useTailwindBreakpoints()

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <SidebarSkeleton />;
    }


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