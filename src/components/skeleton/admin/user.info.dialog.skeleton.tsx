import {Skeleton} from "@/components/ui/skeleton";

const UserInfoDialogSkeleton = () => {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Skeleton className="h-5 w-32 mb-2" />
                    <div className="space-y-2 text-sm">
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-4 w-56" />
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-6 w-24" />
                    </div>
                </div>
                <div>
                    <Skeleton className="h-5 w-24 mb-2" />
                    <div className="space-y-2 text-sm">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-4 w-36" />
                        <Skeleton className="h-4 w-36" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInfoDialogSkeleton