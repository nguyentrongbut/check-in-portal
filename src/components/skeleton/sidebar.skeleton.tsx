import {Skeleton} from "@/components/ui/skeleton";

const SidebarSkeleton = () => {
    return (
        <aside className="fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200">
            <div className="flex flex-col h-full p-4">
                <div className='flex items-center space-x-4 '>
                    {/* Logo */}
                    <Skeleton className="h-20 w-16 mb-6" />

                    <Skeleton className="h-8 w-30 mb-6" />
                </div>
                {/* Section title */}
                <Skeleton className="h-4 w-24 mb-4" />

                {/* Menu items */}
                <div className="space-y-3">
                    <Skeleton className="h-9 w-full rounded-md" />
                    <Skeleton className="h-9 w-full rounded-md" />
                    <Skeleton className="h-9 w-full rounded-md" />
                </div>

                {/* Push user info to bottom */}
                <div className="mt-auto space-y-2">
                    <Skeleton className="h-10 w-full rounded-md" />
                </div>
            </div>
        </aside>
    );
};

export default SidebarSkeleton