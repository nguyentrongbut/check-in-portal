"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonAreaChartDailyRevenue = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <Skeleton className="h-5 w-72" />
                </CardTitle>
                <CardDescription>
                    <Skeleton className="h-4 w-96" />
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative w-full h-[300px]">
                    {/* Y axis */}
                    <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={i} className="h-4 w-10" />
                        ))}
                    </div>

                    {/* Area skeleton */}
                    <svg className="absolute inset-0 w-full h-full px-12 pb-6">
                        {/* Background area */}
                        <polygon
                            points="0,250 100,200 200,220 300,180 400,210 500,160 600,190 700,140 700,300 0,300"
                            fill="rgb(243, 244, 246)"
                            className="animate-pulse"
                        />
                        {/* Outline line */}
                        <polyline
                            points="0,250 100,200 200,220 300,180 400,210 500,160 600,190 700,140"
                            fill="none"
                            stroke="rgb(229, 231, 235)"
                            strokeWidth="2"
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

export default SkeletonAreaChartDailyRevenue;
