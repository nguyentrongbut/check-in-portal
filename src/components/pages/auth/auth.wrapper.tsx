import React from "react";
import {cn} from "@/lib/utils";

const AuthWrapper = ({children, className}: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={cn("h-screen p-5 grid md:grid-cols-2 grid-cols-1 overflow-hidden bg-white", className)}>
            {children}
        </div>
    )
}

export default AuthWrapper