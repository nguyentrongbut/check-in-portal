import { ArrowUpRight, LucideIcon } from "lucide-react";
import Link from "next/link";

interface AgencyItemProps {
    icon: LucideIcon;
    title: string;
    desc: string;
    href: string;
}

const AgencyItem = ({ icon: Icon, title, desc, href }: AgencyItemProps) => {
    return (
        <div className="flex mt-5 gap-6 md:gap-4 items-end group">
            <div
                className="
                    size-20 rounded-full flex items-center justify-center bg-primary -translate-y-5
                    group-hover:bg-[#1b1b1b]
                    transition-all duration-300 ease-in-out
                "
            >
                <Icon className="size-8 transition-transform duration-300 ease-in-out" />
            </div>
            <div>
                <h3 className="text-[22px] font-medium">{title}</h3>
                <p>{desc}</p>
            </div>
            <Link
                href={href}
                className="
                    size-9 rounded-full border border-white flex items-center justify-center
                    group-hover:rotate-45 group-hover:border-primary
                    transition-all duration-300 ease-in-out
                "
            >
                <ArrowUpRight className="transition-transform duration-300 ease-in-out" />
            </Link>
        </div>
    );
};

export default AgencyItem;
