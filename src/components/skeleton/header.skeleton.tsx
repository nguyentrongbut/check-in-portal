import {Skeleton} from "@/components/ui/skeleton";

const HeaderSkeleton = () => (
    <header className="sticky top-0 h-[100px] flex items-center gap-4 bg-[#f9f7f7] px-5 md:px-9 md:ml-64 z-10">
        {/* fake sidebar button */}
        <Skeleton className="w-9 h-9 rounded-md bg-gray-200 block md:hidden" />
        {/* fake title */}
        <Skeleton className="h-8 w-42 bg-gray-200" />
        {/* fake balance */}
        <div className="ml-auto flex items-center gap-2">
            <Skeleton className="w-11 h-6" />
            <Skeleton className="size-4 rounded-full" />
        </div>
    </header>
)

export default HeaderSkeleton