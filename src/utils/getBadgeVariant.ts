import { VariantProps } from "class-variance-authority";
import { badgeVariants } from "@/components/ui/badge";

type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];

const allowedVariants: BadgeVariant[] = ["pending", "approved", "rejected" , 'cancelled', 'active', 'expired'];

export function getBadgeStatusVariant(status: string): BadgeVariant {
    return allowedVariants.includes(status as BadgeVariant)
        ? (status as BadgeVariant)
        : "default";
}


const transactionVariants: BadgeVariant[] = ["spent", "topup"];

export function getBadgeWalletVariant(type: string): BadgeVariant {
    return transactionVariants.includes(type as BadgeVariant)
        ? (type as BadgeVariant)
        : "default";
}

const voucherVariants: BadgeVariant[] = ["active", "expired", "paused"];

export function getBadgeVoucherVariant(status: string): BadgeVariant {
    return voucherVariants.includes(status as BadgeVariant)
        ? (status as BadgeVariant)
        : "default";
}

const roleVariants: BadgeVariant[] = ["admin", "user", "merchant"];

export function getBadgeRoleVariant(status: string): BadgeVariant {
    return roleVariants.includes(status as BadgeVariant)
        ? (status as BadgeVariant)
        : "default";
}

const userStatusVariants: BadgeVariant[] = ["active", "inactive", "banned"];

export function getBadgeUserStatusVariant(status: string): BadgeVariant {
    return userStatusVariants.includes(status as BadgeVariant)
        ? (status as BadgeVariant)
        : "default";
}

const velocityVariants: BadgeVariant[] = ["medium", "high", "extreme"];

export function getBadgeVelocityVariant(status: string): BadgeVariant {
    return velocityVariants.includes(status as BadgeVariant)
        ? (status as BadgeVariant)
        : "default";
}