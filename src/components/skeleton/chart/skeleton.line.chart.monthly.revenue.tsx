"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonLineChartMonthlyRevenue = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <Skeleton className="h-5 w-60" />
                </CardTitle>
                <CardDescription>
                    <Skeleton className="h-4 w-72" />
                </CardDescription>
            </CardHeader>
            <CardContent className="-ml-4">
                <div className="relative w-full h-[300px]">
                    {/* Y axis */}
                    <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={i} className="h-4 w-10" />
                        ))}
                    </div>

                    {/* Chart area */}
                    <svg className="absolute inset-0 w-full h-full px-12 pb-6">
                        <polyline
                            points="0,220 80,180 160,210 240,150 320,190 400,120 480,160 560,100 640,140 720,80"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="animate-pulse"
                        />
                    </svg>

                    {/* X axis */}
                    <div className="absolute bottom-0 left-12 right-4 flex justify-between">
                        {Array.from({ length: 6 }).map((_, idx) => (
                            <Skeleton key={idx} className="h-4 w-10" />
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default SkeletonLineChartMonthlyRevenue;
