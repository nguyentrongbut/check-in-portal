import {BarChart3, Mail, Phone} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import FadeContent from "@/components/animations/fade.content";
import Link from "next/link";

const HomeFooter = () => {
    return (
       <FadeContent>
           <footer className='border-t border-[#ffffff1a]'>
               <div className='py-[60px] grid grid-cols-3 gap-10 items-start'>
                   {/* Logo*/}
                   <div className="flex items-center space-x-2">
                       <BarChart3 className="size-12 text-primary"/>
                       <span className="text-2xl font-bold">Check-in Portal</span>
                   </div>
                   <div className='flex flex-col gap-8'>
                       <h2 className='text-[22px] font-medium'>Contact Us</h2>
                       <ul className='flex flex-col gap-6'>
                           <li>
                               <Link href='tel:0326654301' className='flex gap-4 items-center'>
                                   <div className='size-10 rounded-full border border-primary flex items-center justify-center'>
                                       <Phone className='text-primary size-5'/>
                                   </div>
                                   <span className='font-medium'>0326654301</span>
                               </Link>
                           </li>
                           <li>
                               <Link href='mailto:checkInPortal@gmail.com' className='flex gap-4 items-center'>
                                   <div className='size-10 rounded-full border border-primary flex items-center justify-center'>
                                       <Mail className='text-primary size-5'/>
                                   </div>
                                   <span className='font-medium'>checkInPortal@gmail.com</span>
                               </Link>
                           </li>
                       </ul>
                   </div>
                   <div className='flex flex-col gap-8'>
                       <h2 className='text-[22px] font-medium'>Subscribe Our Newsletter</h2>
                       <div className='flex gap-4 h-10'>
                           <Input className='border-[#ffffff1a] h-full'/>
                           <Button className='h-full'>Subscribe</Button>
                       </div>
                   </div>
                   <div></div>
               </div>
               <div className='text-center py-[60px] border-t border-inherit'>
                   Copyright © {new Date().getFullYear()} All Rights Reserved.
               </div>
           </footer>
       </FadeContent>
    )
}

export default HomeFooter;