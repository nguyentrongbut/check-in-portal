import {Calendar, CirclePoundSterling, Gift, Home, Shield, Users, Wallet} from "lucide-react";
import {TNavSideBar} from "@/types/layout";

export const allocatorNavItems: TNavSideBar[] = [
    {href: "/dashboard", label: "Dashboard", icon: Home},
    {href: "/campaign", label: "Campaign", icon: Calendar},
    {href: "/wallet", label: "Wallet / Point Balance", icon: Wallet},
]

export const adminNavItems: TNavSideBar[] = [
    {href: "/admin/dashboard", label: "Dashboard", icon: Home},
    {href: "/admin/transaction", label: "Transaction Management", icon: CirclePoundSterling},
    {href: "/admin/campaign", label: "Campaign Management", icon: Calendar},
    {href: "/admin/voucher", label: "Voucher Management", icon: Gift},
    {href: "/admin/fraud", label: "Fraud Detection", icon: Shield},
    {href: "/admin/user", label: "User Management", icon: Users},
]