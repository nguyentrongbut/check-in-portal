import React from "react";
import Sidebar from "@/components/layout/sidebar/sidebar";
import Header from "@/components/layout/header/header";
import {SidebarProvider} from "@/context/sidebar.context";

const LayoutPage = ({children}: { children: React.ReactNode }) => {
    return (
        <>
            <Header/>
            <SidebarProvider>
                <div className='px-4 md:px-8 md:ml-64'>
                    <Sidebar/>
                    {children}
                </div>
            </SidebarProvider>
        </>
    );
}

export default LayoutPage;