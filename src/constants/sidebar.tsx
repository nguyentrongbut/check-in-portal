import {Calendar, Gift, Home, Shield, Users, Wallet} from "lucide-react";
import {TNavSideBar} from "@/types/layout";

export const allocatorNavItems: TNavSideBar[] = [
    {href: "/dashboard", label: "Dashboard", icon: Home},
    {href: "/campaign", label: "Campaign", icon: Calendar},
    {href: "/voucher", label: "Voucher", icon: Gift},
    {href: "/wallet", label: "Wallet / Point Balance", icon: Wallet},
]

export const adminNavItems: TNavSideBar[] = [
    {href: "/admin/dashboard", label: "Dashboard", icon: Home},
    {href: "/admin/campaign", label: "Review Campaign", icon: Calendar},
    {href: "/admin/fraud", label: "Fraud Detection", icon: Shield},
    {href: "/admin/user", label: "User Management", icon: Users},
]