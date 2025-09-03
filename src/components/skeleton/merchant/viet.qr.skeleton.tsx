import {DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Skeleton} from "@/components/ui/skeleton";

const VietQRSkeleton = () => {
    return (
        <div className="overflow-y-auto custom-scroll px-6 space-y-6">
            <DialogHeader className="text-center">
                <DialogTitle>
                    <Skeleton className="h-6 w-56 mx-auto" />
                </DialogTitle>
                <DialogDescription>
                    <Skeleton className="h-4 w-72 mx-auto mt-2" />
                </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
                {/* QR Section */}
                <div className="flex flex-col items-center space-y-4">
                    <Skeleton className="h-64 w-64 rounded-lg border-2 border-dashed" />

                    {/* Instructions */}
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 w-full space-y-2">
                        <Skeleton className="h-4 w-44" />
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                    </div>
                </div>

                {/* Status Steps */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-5/6" />
                    <Skeleton className="h-3 w-3/4" />
                </div>
            </div>

            <DialogFooter>
                <Skeleton className="h-10 w-24" />
            </DialogFooter>
        </div>
    );
};

export default VietQRSkeleton