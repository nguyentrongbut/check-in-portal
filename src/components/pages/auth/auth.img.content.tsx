'use client'

import Image from "next/image";
import useTailwindBreakpoints from "@/hooks/useTailwindBreakpoints";

const AuthImgContent = ({ title }: { title: string }) => {
    const { isXl, isMd } = useTailwindBreakpoints();

    if (!isMd) return null;

    return (
        <div className="bg-primary rounded-2xl relative h-full">
            <h2 className='w-[50%] text-white font-medium text-[40px] absolute top-1/2 left-1/2 -translate-1/2 xl:-translate-0 xl:top-[120px] xl:left-[60px]'>
                Very good works are waiting for you {title} Now
            </h2>
            {isXl && (
                <div className='absolute bottom-0 -right-20 w-full h-[78%]'>
                    <Image
                        className='object-contain size-full'
                        src='/auth-woman.png'
                        alt='woman'
                        width={619}
                        height={615}
                    />
                </div>
            )}
        </div>
    );
};

export default AuthImgContent;
