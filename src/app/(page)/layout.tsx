import React from "react";
import Sidebar from "@/components/layout/sidebar/sidebar";

const LayoutPage = ({children}: { children: React.ReactNode }) => {
    return (
        <div className='p-4 md:p-8 md:ml-64'>
            <Sidebar/>
            {children}
        </div>
    );
}

export default LayoutPage;