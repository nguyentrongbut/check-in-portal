import {
    BarChart3,
    Gem,
    Gift,
    Instagram,
    Linkedin,
    MapPin,
    MapPinCheck,
    Megaphone,
    Radar,
    ShieldCheck,
    TicketPercent,
    Twitter,
    Wallet
} from "lucide-react";
import {TContentLink, TContentSection} from "@/types/component";

export const aboutItems: TContentSection[] = [
    {
        icon: MapPin,
        title: "Location Marketing",
        desc: "Drive real foot traffic with precise, location-based campaigns that connect nearby customers directly to your business.",
    },
    {
        icon: Gift,
        title: "Check-in Rewards",
        desc: "Incentivize visits by rewarding customers instantly with digital vouchers, discounts, and exclusive perks.",
    },
    {
        icon: ShieldCheck,
        title: "Fraud Protection",
        desc: "Protect your budget with GPS & Wi-Fi verification that prevents fake check-ins and ensures only genuine visits count.",
    },
    {
        icon: BarChart3,
        title: "Measurable Impact",
        desc: "Access transparent, real-time reports to monitor performance, track ROI, and optimize future campaigns.",
    },
];

export const howItWorksItems: TContentSection[] = [
    {
        icon: Megaphone,
        title: "Create Campaigns",
        desc: "Merchants can easily set up campaigns, define rewards, and manage budgets directly from the dashboard.",
    },
    {
        icon: Wallet,
        title: "Merchant Wallet",
        desc: "Deposit Points into your wallet to fund campaigns. Points are securely allocated to reward verified check-ins.",
    },
    {
        icon: MapPinCheck,
        title: "Verified Check-Ins",
        desc: "Customers visit your venue and check in using GPS & Wi-Fi validation, ensuring every rewarded visit is authentic.",
    },
    {
        icon: Gift,
        title: "Reward Customers",
        desc: "Customers redeem their earned Points for vouchers or offers you provide—building loyalty and repeat business.",
    },
]

export const ourServicesItems: TContentSection[] = [
    {
        icon: Gem,
        title: "Brand Visibility",
        desc: "Enhance brand recognition with unique, location-driven campaigns that leave a lasting impression on customers."
    },
    {
        icon: Radar,
        title: "Targeted Marketing",
        desc: "Attract nearby customers with precise location-based promotions, boosting awareness and driving repeat visits."
    },
    {
        icon: TicketPercent,
        title: "Voucher Campaigns",
        desc: "Deliver engaging offers—from discounts to exclusive gifts—designed to maximize participation and loyalty."
    }
]

export const whyChooseItems = [
    {
        title: 'Data-Driven Insights',
        desc: 'Track engagement with real-time analytics to refine strategies, boost performance, and maximize campaign ROI.'
    },
    {
        title: 'Flexible & Scalable',
        desc: 'Start small or scale big—our solutions adapt to your budget and business goals without overspending.'
    },
    {
        title: 'Verified Engagement',
        desc: 'Ensure every result is authentic. With strict check-in validation, you gain trust and credibility with your campaigns.'
    },
]

export const joinAgencyItems: TContentLink[] = [
    {
        icon: Twitter,
        href: 'https://x.com/',
        title: 'Follow Us on X (Twitter)',
        desc: '@CheckInPoint'
    },
    {
        icon: Linkedin,
        href: 'https://www.linkedin.com/',
        title: 'Connect on LinkedIn',
        desc: 'CheckInPoint Business'
    },
    {
        icon: Instagram,
        href: 'https://www.instagram.com/',
        title: 'Discover on Instagram',
        desc: '@checkinpoint_official'
    },
]
