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

                <div className="relative p-20 grid grid-cols-2 gap-20">
                    <div>
                        <FadeText className='text-[50px] mb-[60px]'>Expertise that drives real world <span
                            className='text-primary font-medium'>engagement</span></FadeText>
                        <div className='grid grid-cols-2'>
                            <div>
                                <span className='text-primary font-medium text-[50px]'>+
                                    <CountUp
                                        from={0}
                                        to={60}
                                        separator=","
                                        direction="up"
                                        duration={1}
                                        className="count-up-text"
                                    />
                                    %</span>
                                <FadeContent className='mt-3'>
                                    Increase in verified customer visits through location-based
                                    check-ins.
                                </FadeContent>
                            </div>
                            <div>
                                <span className='text-primary font-medium text-[50px]'>+
                                     <CountUp
                                         from={0}
                                         to={30}
                                         separator=","
                                         direction="up"
                                         duration={1}
                                         className="count-up-text"
                                     />
                                    %</span>
                                <FadeContent className='mt-3'>
                                    Rise in campaign ROI as more visitors redeem rewards.
                                </FadeContent>
                            </div>
                        </div>
                    </div>
                    <FadeContent>
                        <div className='flex flex-col justify-center gap-30'>
                            <div className='flex items-start gap-2'>
                                <Asterisk className='size-8 text-primary shrink-0'/>
                                <div>
                                    <strong className='font-medium text-[22px]'>Location-based Marketing:</strong>
                                    <span className='ml-2'>Empower your brand with measurable, in-person engagement. Drive traffic to your venues, verify visits via GPS & Wi-Fi, and reward customers instantly.</span>
                                </div>
                            </div>
                            <div className='flex items-start gap-2'>
                                <Asterisk className='size-8 text-primary shrink-0'/>
                                <div>
                                    <strong className='font-medium text-[22px]'>Reward & Voucher Solutions:</strong>
                                    <span className='ml-2'>Offer digital vouchers, discounts, and exclusive perks redeemable directly in the app enhancing customer loyalty and repeat visits.</span>
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