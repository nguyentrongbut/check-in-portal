import {
    BarChart3,
    Gem,
    Gift, Instagram, Linkedin,
    MapPin,
    MapPinCheck,
    Megaphone,
    Radar,
    ShieldCheck,
    TicketPercent, Twitter,
    Wallet
} from "lucide-react";
import {TContentLink, TContentSection} from "@/types/component";

export const aboutItems: TContentSection[] = [
    {
        icon: MapPin,
        title: "Location Marketing",
        desc: "Boost your brand with precise location-based marketing campaigns that attract real, verified customers.",
    },
    {
        icon: Gift,
        title: "Check-in Rewards",
        desc: "Reward users instantly for visiting your locations with vouchers, discounts, and exclusive offers.",
    },
    {
        icon: ShieldCheck,
        title: "Fraud Prevention",
        desc: "Ensure campaign integrity with advanced location verification and anti-fraud technology.",
    },
    {
        icon: BarChart3,
        title: "Measurable Results",
        desc: "Track and analyze campaign performance with transparent, real-time reporting tools.",
    },
];

export const howItWorksItems: TContentSection[] = [
    {
        icon: Megaphone,
        title: "Launch Business Campaigns",
        desc: "For merchants, create and manage location-based campaigns, set rewards, and track performance in real time through our dashboard.",
    },
    {
        icon: Wallet,
        title: "Sign Up & Wallet Creation",
        desc: "Create a free account to instantly receive your Points wallet. This will store all your earned rewards and vouchers in one place.",
    },
    {
        icon: MapPinCheck,
        title: "Location Check-In",
        desc: "Visit partner venues and check in using our GPS & Wi-Fi verification system to ensure authenticity and earn Points instantly.",
    },
    {
        icon: Gift,
        title: "Redeem Rewards",
        desc: "Use your Points to claim digital vouchers, discounts, and exclusive offers directly in the app with just a few taps.",
    },
]

export const ourServicesItems: TContentSection[] = [
    {
        icon: Gem ,
        title: "Branding & Identity",
        desc: "Build a strong brand identity through unique check-in campaigns, visual design, and memorable customer experiences that foster lasting connections."
    },
    {
        icon: Radar  ,
        title: "Digital Marketing",
        desc: "Leverage location-based marketing to bring customers directly to your venue, boost brand awareness, and encourage repeat visits."
    },
    {
        icon: TicketPercent ,
        title: "Creative Content & Voucher Production",
        desc: "Design and deliver engaging voucher campaigns from discounts and special offers to exclusive gifts to maximize check-in participation and customer loyalty."
    }
]

export const whyChooseItems = [
    {
        title: 'Data-Driven Campaign Management',
        desc: 'Leverage real-time data and location analytics to track customer engagement, optimize campaign performance, and maximize ROI.'
    },
    {
        title: 'Cost-Effective & Scalable Solutions',
        desc: 'Run impactful campaigns without overspending. Our flexible plans grow with your business needs, ensuring maximum value for every budget.'
    },
    {
        title: 'Transparent & Ethical Operations',
        desc: 'We prioritize authentic engagement with verified check-ins, ensuring campaigns maintain credibility and deliver genuine customer interactions.'
    },
]

export const joinAgencyItems: TContentLink[] = [
    {
        icon: Twitter,
        href: 'https://x.com/',
        title: 'Follow Us On Twitter',
        desc: '@checkInPortal'
    },
    {
        icon: Linkedin,
        href: 'https://www.linkedin.com/',
        title: 'Join Us On Linked In',
        desc: 'user.checkInPortal'
    },
    {
        icon: Instagram,
        href: 'https://www.instagram.com/',
        title: 'Follow On Instagram',
        desc: '@checkInPortal_insta'
    },
]