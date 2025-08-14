import {Asterisk} from "lucide-react";
import {cn} from "@/lib/utils";

interface HomeTitleProps {
    title: string;
    className?: string;
}

const HomeTitle = ({ title, className }: HomeTitleProps) => {
    return (
        <h2 className={cn("flex items-center gap-1", className)}>
            <Asterisk className="text-primary" />
            <span className="uppercase font-medium text-white">{title}</span>
        </h2>
    );
};

export default HomeTitle;
