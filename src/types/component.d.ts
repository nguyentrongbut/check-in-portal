import {LucideIcon} from "lucide-react";

export type TCardOverview = {
    title: string;
    Icon: LucideIcon;
    titleContent: string;
    desc: string;
    color?: string;
}

export type TContentSection = {
    title: string;
    desc: string;
    icon: LucideIcon;
}

export type TContentLink = TContentSection & {
    href: string;
}