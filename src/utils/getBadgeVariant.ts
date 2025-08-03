import { VariantProps } from "class-variance-authority";
import { badgeVariants } from "@/components/ui/badge";

type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];

const allowedVariants: BadgeVariant[] = ["pending", "approved", "rejected"];

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