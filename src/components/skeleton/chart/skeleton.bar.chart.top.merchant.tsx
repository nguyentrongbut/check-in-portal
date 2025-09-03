import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonBarChartTopMerchant = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <Skeleton className="h-5 w-52" />
                </CardTitle>
                <CardDescription>
                    <Skeleton className="h-4 w-64" />
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative w-full h-[300px] flex flex-col justify-between">
                    <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-muted-foreground">
                        {Array.from({ length: 5 }).map((label, i) => (
                            <Skeleton key={i} className="h-4 w-10 mb-2" />
                        ))}
                    </div>

                    <div className="flex items-end justify-around h-full w-full pl-12 pr-4 gap-4">
                        {Array.from({ length: 5 }).map((_, idx) => (
                            <Skeleton
                                key={idx}
                                className="w-20 rounded"
                                style={{
                                    height: `${40 + idx * 10}%`,
                                }}
                            />
                        ))}
                    </div>

                    <div className="mt-4 flex justify-around pl-12 pr-4">
                        {Array.from({ length: 5 }).map((_, idx) => (
                            <Skeleton key={idx} className="h-4 w-16" />
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default SkeletonBarChartTopMerchant;
