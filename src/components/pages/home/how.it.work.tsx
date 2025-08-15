import HomeTitle from "@/components/pages/home/home.title";
import HomeDesc from "@/components/pages/home/home.desc";
import HomeCard from "@/components/pages/home/home.card";
import {howItWorksItems} from "@/constants/home";
import FadeContent from "@/components/animations/fade.content";

const HowItWork = () => {
    return (
        <section className='py-20'>
            <div className='flex flex-col gap-4 md:flex-row justify-between items-center'>
                <div className='md:w-[45%]'>
                    <HomeTitle
                        title="How it works"
                    />
                    <HomeDesc
                        beforeHighlight="Our proven"
                        highlight="process"
                        afterHighlight="for achieving success"
                    />
                </div>
                <FadeContent className='md:w-[45%]'>
                    Our streamlined process ensures both users and businesses get maximum value through a seamless,
                    secure, and rewarding experience.
                </FadeContent>
            </div>
            <FadeContent className='grid grid-cols-1 md:grid-cols-4 gap-8 mt-25'>
                {howItWorksItems.map((item, index) => (
                    <HomeCard
                        key={index}
                        number={index + 1}
                        icon={item.icon}
                        title={item.title}
                        desc={item.desc}
                    />
                ))}
            </FadeContent>
        </section>
    )
}

export default HowItWork