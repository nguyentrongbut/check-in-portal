import { VariantProps } from "class-variance-authority";
import { badgeVariants } from "@/components/ui/badge";

type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];

const allowedVariants: BadgeVariant[] = ["pending", "approved", "rejected"];

export function getBadgeVariant(status: string): BadgeVariant {
    return allowedVariants.includes(status as BadgeVariant)
        ? (status as BadgeVariant)
        : "default";
}
