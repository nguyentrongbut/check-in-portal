import {Skeleton} from "@/components/ui/skeleton";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

export const DetailPageVoucherSkeleton = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    {/* back button */}
                    <Skeleton className="h-10 w-10 rounded-md bg-gray-200"/>

                    {/* title + description */}
                    <div>
                        <Skeleton className="h-8 w-48 mb-2 bg-gray-200"/> {/* Title */}
                        <Skeleton className="h-4 w-64 bg-gray-200"/> {/* Description */}
                    </div>
                </div>

                {/* edit button */}
                <Skeleton className="h-9 w-18 rounded-md bg-gray-200"/>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({length: 3}).map((_, i) => (
                    <Card className="gap-4" key={i}>
                        <CardHeader className="flex items-center justify-between">
                            <Skeleton className="h-4 w-20"/> {/* title */}
                            <Skeleton className="size-6 rounded-full"/> {/* icon */}
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-8 w-24"/> {/* titleContent */}
                            <Skeleton className="h-3 w-32 mt-2"/> {/* desc */}
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Voucher Information */}
            <Card>
                <CardHeader>
                    <CardTitle>
                        <Skeleton className="h-6 w-48"/> {/* Title */}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 flex flex-col justify-end">
                    <div className="grid grid-cols-1 lg:grid-cols-3 place-items-center gap-4 lg:gap-8">
                        {/* Image */}
                        <Skeleton className="w-full h-60 rounded-md col-span-2"/>

                        {/* Created */}
                        <div className="flex flex-row lg:flex-col justify-between lg:justify-center lg:gap-4 size-full">
                            <div className="flex gap-2 justify-center items-center lg:block">
                                <Skeleton className="h-4 w-20 mb-2"/> {/* label */}
                                <Skeleton className="h-4 w-28"/> {/* value */}
                            </div>
                        </div>
                    </div>

                    {/* Info list */}
                    <div className="space-y-3 pt-4 border-t">
                        <div className="flex items-center space-x-3">
                            <Skeleton className="h-4 w-4 rounded-full"/>
                            <Skeleton className="h-4 w-32"/>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Skeleton className="h-4 w-4 rounded-full"/>
                            <Skeleton className="h-4 w-40"/>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Skeleton className="h-4 w-4 rounded-full"/>
                            <Skeleton className="h-4 w-36"/>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
