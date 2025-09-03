import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const ProfilePageSkeleton = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <Skeleton className="h-8 w-48 mb-2 bg-gray-200" /> {/* Title */}
                    <Skeleton className="h-4 w-64 bg-gray-200" /> {/* Description */}
                </div>
                <Skeleton className="h-5 w-28 rounded-full bg-gray-200" /> {/* Badge */}
            </div>

            {/* Personal Information Card */}
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-40 mb-2" /> {/* CardTitle */}
                    <Skeleton className="h-4 w-60" /> {/* CardDescription */}
                </CardHeader>
                <CardContent className="space-y-6 mt-2">
                    {/* Avatar */}
                    <div className="flex items-center gap-4">
                        <Skeleton className="size-24 rounded-full" /> {/* Avatar */}
                        <div>
                            <Skeleton className="h-5 w-32 mb-2" /> {/* Title */}
                            <Skeleton className="h-4 w-40" /> {/* Desc */}
                        </div>
                    </div>

                    {/* Full Name */}
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20" /> {/* Label */}
                        <Skeleton className="h-10 w-full" /> {/* Input */}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-16" /> {/* Label */}
                        <Skeleton className="h-10 w-full" /> {/* Input */}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-16" /> {/* Label */}
                        <Skeleton className="h-10 w-full" /> {/* Input */}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-4 pt-4">
                        <Skeleton className="h-9 w-20 rounded-md" /> {/* Cancel */}
                        <Skeleton className="h-9 w-32 rounded-md" /> {/* Update Profile */}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProfilePageSkeleton;
