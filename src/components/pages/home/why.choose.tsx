import HomeTitle from "@/components/pages/home/home.title";
import HomeDesc from "@/components/pages/home/home.desc";
import {whyChooseItems} from "@/constants/home";
import WhyChooseCard from "@/components/pages/home/why.choose.card";
import GlareHover from "@/components/animations/glare.hover";
import Image from "next/image";
import FadeContent from "@/components/animations/fade.content";

const WhyChoose = () => {
    return (
        <section className='py-20'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-20 lg:gap-40 items-center justify-between'>
                <div>
                    <HomeTitle
                        title="Why Choose"
                    />
                    <HomeDesc
                        beforeHighlight="Expertise for"
                        highlight="location-based campaign"
                        afterHighlight="journey"
                    />
                </div>
                <FadeContent>
                    Our dedicated team helps Allocators design and launch impactful campaigns that drive verified
                    customer visits.
                    With precise GPS & Wi-Fi check-ins, real-time tracking, and rewarding systems, we ensure your
                    campaigns deliver measurable results.
                </FadeContent>
            </div>

            <FadeContent className='grid grid-cols-1 md:grid-cols-2 items-center justify-between md:gap-[60px] mt-20'>
                <div className='flex flex-col gap-8'>
                    {whyChooseItems.map((item, index) => {
                        return (
                            <WhyChooseCard
                                key={index}
                                title={item.title}
                                desc={item.desc}
                            />
                        )
                    })}
                </div>

                <div style={{position: 'relative'}} className='px-4 mt-10 md:mt-0'>
                    <GlareHover
                        glareColor="#ffffff"
                        glareOpacity={0.3}
                        glareAngle={-30}
                        glareSize={300}
                        transitionDuration={800}
                        playOnce={false}
                    >
                        <Image src='/why-choose-image.jpg' alt='why choose Local Hunt image' width={640} height={576}
                               className='object-cover size-full'
                               loading='lazy'
                        />
                    </GlareHover>
                </div>
            </FadeContent>
        </section>
    )
}

export default WhyChoose