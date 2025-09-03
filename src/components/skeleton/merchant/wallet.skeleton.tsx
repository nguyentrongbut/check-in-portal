import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";
import SkeletonTableManagement from "@/components/skeleton/skeleton.table.management";

const WalletSkeleton = () => {
    return (
        <div className='space-y-6'>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                    <Card key={i} className="gap-4">
                        <CardHeader className="flex items-center justify-between">
                            <Skeleton className="h-4 w-24" /> {/* Title */}
                            <Skeleton className="h-6 w-6 rounded-full" /> {/* Icon */}
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-7 w-28 mb-2" /> {/* TitleContent */}
                            <Skeleton className="h-4 w-40" /> {/* Desc */}
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <Skeleton className="h-6 w-52" /> {/* Exchange Rate Information title */}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left column */}
                        <div className="space-y-3">
                            {Array.from({ length: 2 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="flex justify-between items-center p-3 rounded-lg bg-gray-100"
                                >
                                    <Skeleton className="h-4 w-28" /> {/* Label */}
                                    <Skeleton className="h-4 w-32" /> {/* Value */}
                                </div>
                            ))}
                        </div>

                        {/* Right column */}
                        <div className="space-y-3">
                            {Array.from({ length: 2 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="flex justify-between items-center p-3 rounded-lg bg-gray-100"
                                >
                                    <Skeleton className="h-4 w-32" /> {/* Label */}
                                    <Skeleton className="h-4 w-40" /> {/* Value */}
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
            <SkeletonTableManagement desc action/>
        </div>
    )
}

export default WalletSkeleton