import { cn } from "@/lib/utils";
import React from "react";

const Container = ({
                       children,
                       className,
                   }: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={cn(
                "w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8",
                className
            )}
        >
            {children}
        </div>
    );
};

export default Container;
