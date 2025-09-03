import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";

const SkeletonListDashboardKpiCard = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {Array.from({length: 4}).map((_, idx) => (
                <Card className="gap-4" key={idx}>
                    <CardHeader className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium">
                            <Skeleton className="h-4 w-24"/>
                        </CardTitle>
                        <Skeleton className="h-4 w-4 rounded-full"/>
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-6 w-20 mb-2"/>
                        <Skeleton className="h-3 w-28"/>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default SkeletonListDashboardKpiCard;