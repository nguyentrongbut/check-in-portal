import {Calendar, CirclePoundSterling, Gift, Home, Shield, Users, Wallet} from "lucide-react";
import {TNavSideBar} from "@/types/layout";
import {getTransactions} from "@/lib/actions/transaction";
import {getCampaigns} from "@/lib/actions/campaign";

export const adminNavItems = async () => {
    const dataTransactions = await getTransactions();
    const dataCampaign = await getCampaigns()

    const pendingTransactions =
        dataTransactions?.items.filter(
            (t: { status: string }) => t.status === "PENDING"
        ).length ?? 0;

    const pendingCampaigns = dataCampaign?.items.filter(
        (c: { status: string }) => c.status === "PENDING"
    ).length ?? 0;

    return [
        {href: "/admin/dashboard", label: "Dashboard", icon: Home},
        {href: "/admin/transaction", label: "Transaction Management", icon: CirclePoundSterling, badge: pendingTransactions || 0},
        {href: "/admin/campaign", label: "Campaign Management", icon: Calendar, badge: pendingCampaigns || 0},
        {href: "/admin/voucher", label: "Voucher Management", icon: Gift},
        {href: "/admin/user", label: "User Management", icon: Users},
    ]
}

export const allocatorNavItems: TNavSideBar[] = [
    {href: "/dashboard", label: "Dashboard", icon: Home},
    {href: "/campaign", label: "Campaign", icon: Calendar},
    {href: "/wallet", label: "Wallet / Point Balance", icon: Wallet},
]

export const adminNavItemsArray : TNavSideBar[] =  [
        {href: "/admin/dashboard", label: "Dashboard", icon: Home},
        {href: "/admin/transaction", label: "Transaction Management", icon: CirclePoundSterling},
        {href: "/admin/campaign", label: "Campaign Management", icon: Calendar},
        {href: "/admin/voucher", label: "Voucher Management", icon: Gift},
        {href: "/admin/fraud", label: "Fraud Detection", icon: Shield},
        {href: "/admin/user", label: "User Management", icon: Users},
    ]

