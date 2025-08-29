import { TNavSideBar } from "@/types/layout";
import { adminNavItemsArray, allocatorNavItems } from "@/constants/sidebar";

function normalizePath(path: string) {
    return path.replace(/\/$/, ""); // bỏ dấu / cuối
}

export const getPageTitleFromNavItems = (
    pathname: string,
    role: string
): string => {
    const navItems: TNavSideBar[] =
        role === "admin" ? adminNavItemsArray : allocatorNavItems;

    const normalizedPath = normalizePath(pathname);

    // 1. Exact match
    const exactMatch = navItems.find(
        (item) => normalizePath(item.href) === normalizedPath
    );
    if (exactMatch) return exactMatch.label;

    // 2. Partial match -> ưu tiên đường dẫn dài nhất
    const partialMatch = navItems
        .filter((item) => normalizedPath.startsWith(normalizePath(item.href)))
        .sort((a, b) => b.href.length - a.href.length)[0];

    if (partialMatch) {
        if (normalizedPath.includes("create")) return `Create ${partialMatch.label}`;
        if (normalizedPath.includes("edit")) return `Edit ${partialMatch.label}`;
        if (normalizedPath.match(/\/\d+$/)) return `${partialMatch.label} Detail`;
        return partialMatch.label;
    }

    if (normalizedPath === "/profile") return "Profile";

    // fallback
    return "Dashboard";
};
