import { TNavSideBar } from "@/types/layout";
import {adminNavItems, allocatorNavItems} from "@/constants/sidebar";

export const getPageTitleFromNavItems = (
    pathname: string,
    role: string
): string => {
    const navItems: TNavSideBar[] =
        role === "admin" ? adminNavItems : allocatorNavItems;

    const exactMatch = navItems.find(item => item.href === pathname);
    if (exactMatch) return exactMatch.label;

    const basePath = pathname.split("/").slice(0, 3).join("/");
    const partialMatch = navItems.find(item => pathname.startsWith(item.href));
    if (partialMatch) {
        if (pathname.includes("create")) return `Create ${partialMatch.label}`;
        if (pathname.includes("edit")) return `Edit ${partialMatch.label}`;
        if (pathname.match(/\/\d+$/)) return `${partialMatch.label} Detail`;
        return partialMatch.label;
    }

    // Fallback
    return "Dashboard";
};
