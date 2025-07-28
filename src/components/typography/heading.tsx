import React, {JSX} from "react";
import { cn } from "@/lib/utils";

type HeadingProps = {
    as?: keyof JSX.IntrinsicElements;
    children: React.ReactNode;
    className?: string;
};

const Heading = ({ as: Tag = "h1", children, className }: HeadingProps) => {
    return (
        <Tag className={cn("text-2xl font-medium", className)}>
            {children}
        </Tag>
    );
};

export default Heading;