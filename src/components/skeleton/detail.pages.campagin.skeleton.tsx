import {Skeleton} from "@/components/ui/skeleton";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import SkeletonTableManagement from "@/components/skeleton/skeleton.table.management";
import {Separator} from "@/components/ui/separator";

export const DetailPageCampaignSkeleton = ({admin = false}: { admin?: boolean }) => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Skeleton className="h-10 w-10 rounded-lg bg-gray-200"/>
                    <div>
                        <Skeleton className="h-6 w-40 mb-2 bg-gray-200"/>
                        <Skeleton className="h-4 w-60 bg-gray-200"/>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Skeleton className="h-5 w-16 rounded-md bg-gray-200"/>
                    <Skeleton className="h-9 w-24 rounded-md bg-gray-200"/>
                    {admin && (
                        <>
                            <Skeleton className="h-9 w-16 rounded-md bg-gray-200"/>
                            <Skeleton className="h-9 w-24 rounded-md bg-gray-200"/>
                        </>
                    )}
                </div>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({length: 4}).map((_, i) => (
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Campaign Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <Skeleton className="h-6 w-40"/>
                            <div className='grid grid-cols-2 gap-4 mt-6'>
                                <div className='space-y-1'>
                                    <Skeleton className="h-6 w-20"/>
                                    <Skeleton className="h-6 w-40"/>
                                </div>
                                <div className='space-y-1'>
                                    <Skeleton className="h-6 w-20"/>
                                    <Skeleton className="h-5 w-16 rounded-md"/>
                                </div>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <Separator className='mx-6'/>
                    <CardContent className="space-y-3">
                        {Array.from({length: 5}).map((_, i) => (
                            <div key={i} className="flex items-center space-x-3">
                                <Skeleton className="h-4 w-4 rounded-full"/>
                                <Skeleton className="h-4 w-32"/>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Performance Summary */}
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <Skeleton className="h-6 w-48"/>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-32"/>
                            <Skeleton className="h-3 w-full rounded-full"/>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Skeleton className="h-20 w-full rounded-lg"/>
                            <Skeleton className="h-20 w-full rounded-lg"/>
                        </div>
                        <Skeleton className="h-4 w-48"/>
                        <Skeleton className="h-4 w-40"/>
                    </CardContent>
                </Card>
            </div>

            {/* Location */}
            <Card>
                <CardHeader>
                    <CardTitle>
                        <Skeleton className="h-6 w-32"/>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-[300px] w-full rounded-md"/>
                </CardContent>
            </Card>

            {/* Table Check Ins */}
            <SkeletonTableManagement desc/>
        </div>
    );
};
