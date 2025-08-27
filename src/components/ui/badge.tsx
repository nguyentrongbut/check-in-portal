import * as React from "react"
import {Slot} from "@radix-ui/react-slot"
import {cva, type VariantProps} from "class-variance-authority"

import {cn} from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
                secondary:
                    "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
                destructive:
                    "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
                outline:
                    "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",

                // status

                pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
                approved: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
                rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
                active: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
                expired: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
                cancelled: "bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-300",

                // transaction
                spent:
                    "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
                topup:
                    "bg-primary/20 text-primary/80 dark:bg-primary/90 dark:text-primary/30",

                // voucher
                paused: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",

                // role
                admin: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
                merchant: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
                user: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300",

                // status
                inactive: "bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-300",
                banned: "bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-300",

                // velocity
                medium: "bg-yellow-500 text-white dark:bg-yellow-900 dark:text-yellow-300",
                high: "bg-orange-500 text-white dark:bg-orange-900 dark:text-orange-300",
                extreme: "bg-red-500 text-white dark:bg-red-900 dark:text-red-300",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

function Badge({
                   className,
                   variant,
                   asChild = false,
                   ...props
               }: React.ComponentProps<"span"> &
    VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
    const Comp = asChild ? Slot : "span"

    return (
        <Comp
            data-slot="badge"
            className={cn(badgeVariants({variant}), className)}
            {...props}
        />
    )
}

export {Badge, badgeVariants}
