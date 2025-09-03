"use client"

import { Skeleton } from "@/components/ui/skeleton"

const CardVoucherSkeleton = () => {
    return (
        <div className="relative overflow-hidden border-0 shadow-sm h-full flex flex-col justify-between rounded-xl bg-white">
            {/* Image Section */}
            <div className="relative aspect-video overflow-hidden">
                <Skeleton className="w-full h-full" />
                <div className="absolute top-3 left-3">
                    <Skeleton className="h-6 w-20 rounded-md" />
                </div>
                <div className="absolute top-3 right-3">
                    <Skeleton className="h-6 w-6 rounded-full" />
                </div>
            </div>

            {/* Header */}
            <div className="p-4 space-y-2">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-full" />
            </div>

            {/* Content */}
            <div className="px-4 pb-4 space-y-4">
                {/* Point */}
                <div className="flex justify-between items-center">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20 rounded-md" />
                </div>

                {/* Min Order */}
                <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-16" />
                </div>

                {/* Availability */}
                <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-2 flex-1 rounded-full" />
                </div>

                {/* Expiry */}
                <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-28" />
                </div>
            </div>
        </div>
    )
}

export const ListVoucherSkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
                <CardVoucherSkeleton key={i} />
            ))}
        </div>
    )
}
