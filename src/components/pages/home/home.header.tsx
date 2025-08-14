import {Button} from "@/components/ui/button";
import {BarChart3} from "lucide-react";
import Container from "@/components/common/container";
import Link from "next/link";

const HomeHeader = () => {
    return (
        <header className='absolute w-full border-b border-[#ffffff1a]'>
            <Container className='h-[105px] flex items-center justify-between'>

                {/* Logo*/}
                <div className="flex items-center space-x-2">
                    <BarChart3 className="size-12 text-primary"/>
                    <span className="text-2xl font-bold">Check-in Portal</span>
                </div>

                {/* group btn action */}
                <div className='flex items-center gap-4 h-[45px]'>
                    <Link href='/login' className='h-full'>
                        <Button className='rounded-full h-full px-8'>Login</Button>
                    </Link>
                    <Link href='/register' className='h-full'>
                        <Button
                            className='relative flex items-center justify-center
                                rounded-full px-8
                                bg-[#3A3A3A] text-white font-semibold
                                hover:bg-[#2a2a2a] transition-colors
                                shadow-lg cursor-pointer h-full'>
                            Register
                        </Button>
                    </Link>
                </div>
            </Container>
        </header>
    )
}

export default HomeHeader;