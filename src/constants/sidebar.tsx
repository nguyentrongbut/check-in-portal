import {Calendar, Gift, Home, Shield, Users, Wallet} from "lucide-react";
import {TNavSideBar} from "@/types/layout";

export const allocatorNavItems: TNavSideBar[] = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/campaigns", label: "Campaigns", icon: Calendar },
    { href: "/vouchers", label: "Vouchers", icon: Gift },
    { href: "/wallet", label: "Wallet / Point Balance", icon: Wallet },
]

export const adminNavItems: TNavSideBar[] = [
    { href: "/admin/dashboard", label: "Dashboard", icon: Home },
    { href: "/admin/campaigns", label: "Review Campaigns", icon: Calendar },
    { href: "/admin/fraud", label: "Fraud Detection", icon: Shield },
    { href: "/admin/users", label: "User Management", icon: Users },
]