import {ArrowUpRight} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import FadeContent from "@/components/animations/fade.content";

const CallToActionSection = () => {
    return (
        <FadeContent>
            <section className='flex justify-center flex-col items-center pt-10 pb-30'>
                <h3 className='uppercase text-[22px] font-medium'>LET&apos;S WORK TOGETHER</h3>
                <div className='relative'>
                    <h2 className='text-[180px] font-bold text-center uppercase leading-[200px]'>Let&apos;s your
                        Campaign</h2>
                    <Link href='/login' className='size-[150px] group bg-primary
                  absolute left-1/2 top-1/2 -translate-1/2 z-10
                hover:bg-[#1b1b1b]
                  transition-all duration-300 ease-in-out
                  rounded-full
                  flex flex-col justify-center items-center'>
                        <ArrowUpRight className="transition-transform duration-300 ease-in-out group-hover:rotate-45"/>
                        <span>Get In Touch</span>
                    </Link>
                    <Image
                        className='absolute left-1/2 top-1/2 -translate-1/2 size-full -z-10'
                        src='/work-together-bg-gradient.png'
                        alt='bg gradient'
                        loading="lazy"
                        width={300} height={300}/>
                </div>
            </section>
        </FadeContent>
    )
}

export default CallToActionSection;