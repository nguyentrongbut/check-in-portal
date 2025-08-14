import { LucideIcon } from "lucide-react";
import {cn} from "@/lib/utils";

interface HomeCardProps {
    number?: number;
    icon: LucideIcon;
    title: string;
    desc: string;
    className?:string;
}

const HomeCard = ({ number, icon: Icon, title, desc, className }: HomeCardProps) => {
    return (
        <div className={cn("py-[30px] px-[25px] border border-white/15 rounded-[30px] text-white flex flex-col gap-8 bg-[#0d0d0c]/60", className)}>
            <div className="flex flex-col gap-8">
                {number && (
                    <div className="text-[22px] font-bold">0{number}</div>
                )}
                <Icon className="text-primary size-[60px]" strokeWidth={0.75} />
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="text-[22px] font-bold">{title}</h3>
                <p>{desc}</p>
            </div>
        </div>
    );
};

export default HomeCard;
