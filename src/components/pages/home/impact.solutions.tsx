import {Asterisk} from "lucide-react";
import FadeText from "@/components/animations/fade.text";
import CountUp from "@/components/animations/count.up";
import FadeContent from "@/components/animations/fade.content";

const ImpactSolutions = () => {
    return (
        <section className='py-20'>
            <div
                className="
                bg-transparent [background-image:linear-gradient(180deg,#ff6c2f_0%,#00000000_90.04%)]
                rounded-2xl
                relative before:content-[''] before:absolute before:left-[20px] before:top-[20px]
            before:rounded-[16px] before:[background:linear-gradient(180deg,#000000_75%,rgba(0,0,0,0)_99.04%)]
            before:w-[calc(100%-40px)] before:h-[calc(100%-20px)]
                ">

                <div className="relative p-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
                    <div>
                        <FadeText className='text-[30px] md:text-[45px] lg:text-[50px] mb-8 lg:mb-[60px]'>Expertise that drives real world <span
                            className='text-primary font-medium'>engagement</span></FadeText>
                    </div>
                    <FadeContent>
                        <div className='flex flex-col justify-center gap-10 lg:gap-30'>
                            <div className='flex items-start gap-2'>
                                <Asterisk className='size-8 text-primary shrink-0'/>
                                <div>
                                    <strong className='font-medium text-[22px]'>Location-based Marketing:</strong>
                                    <span className='ml-2'>Easily launch measurable campaigns that drive real in-store visits.</span>
                                </div>
                            </div>
                            <div className='flex items-start gap-2'>
                                <Asterisk className='size-8 text-primary shrink-0'/>
                                <div>
                                    <strong className='font-medium text-[22px]'>Reward & Voucher Solutions:</strong>
                                    <span className='ml-2'>Offer digital vouchers, discounts, and exclusive perks to increase loyalty.</span>
                                </div>
                            </div>
                        </div>
                    </FadeContent>
                </div>
            </div>
        </section>
    )
}

export default ImpactSolutions