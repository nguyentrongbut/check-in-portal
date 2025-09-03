import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Separator} from "@/components/ui/separator"
import {Skeleton} from "@/components/ui/skeleton"

const SkeletonTableManagement = ({desc = false, separator = false, filter = false, action = false}: {
    desc?: boolean,
    separator?: boolean,
    filter?: boolean,
    action?: boolean,
}) => {
    return (
        <Card>
            <CardHeader className="flex justify-between items-center">
                <CardTitle>
                    <Skeleton className="h-5 w-40"/>
                    {desc && <Skeleton className='w-70 h-3 mt-1'/>}
                </CardTitle>
                {action && (
                    <Skeleton className="h-10 w-32 rounded-md" />
                )}
            </CardHeader>
            {separator && <Separator/>}
            <CardContent>
                {filter && (
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        {/* Search skeleton */}
                        <div className="flex-1">
                            <Skeleton className="h-10 w-full rounded-md"/>
                        </div>

                        {/* Role select skeleton */}
                        <Skeleton className="h-10 w-full sm:w-[150px] rounded-md"/>

                        {/* Status select skeleton */}
                        <Skeleton className="h-10 w-full sm:w-[150px] rounded-md"/>
                    </div>
                )}
                <div className="rounded-md border">
                    {/* Table header */}
                    <div className="grid grid-cols-7 gap-4 px-4 py-3 border-b">
                        {Array.from({length: 7}).map((_, i) => (
                            <Skeleton key={i} className="h-4 w-20"/>
                        ))}
                    </div>

                    {/* Table rows */}
                    {Array.from({length: 5}).map((_, rowIndex) => (
                        <div
                            key={rowIndex}
                            className="grid grid-cols-7 gap-4 px-4 py-3 border-b last:border-0"
                        >
                            {Array.from({length: 7}).map((_, colIndex) => (
                                <Skeleton key={colIndex} className="h-4 w-20"/>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Pagination skeleton */}
                <div className="flex items-center justify-between px-2 py-4">
                    <Skeleton className="h-4 w-48"/>
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-8 w-16 rounded"/>
                        <Skeleton className="h-8 w-16 rounded"/>
                        <Skeleton className="h-8 w-20 rounded"/>
                        <Skeleton className="h-8 w-20 rounded"/>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default SkeletonTableManagement
