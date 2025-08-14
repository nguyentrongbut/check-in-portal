import { LucideIcon } from "lucide-react";

interface AboutItemProps {
    icon: LucideIcon;
    title: string;
    desc: string;
}

const AboutItem = ({ icon: Icon, title, desc }: AboutItemProps) => {
    return (
        <div className="flex flex-col gap-3">
            <Icon className="size-12 text-primary" strokeWidth={1}/>
            <h3 className="font-medium text-[22px]">{title}</h3>
            <p>{desc}</p>
        </div>
    );
};

export default AboutItem;
