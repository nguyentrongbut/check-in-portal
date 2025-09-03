import {aboutItems} from "@/constants/home";
import AboutItem from "@/components/pages/home/about.item";
import HomeTitle from "@/components/pages/home/home.title";
import HomeDesc from "@/components/pages/home/home.desc";
// import {Button} from "@/components/ui/button";
import FadeContent from "@/components/animations/fade.content";


const AboutUs = () => {
    return (
        <div className='flex flex-col gap-10 md:flex-row justify-between pt-40 pb-20 '>
            <div className='md:w-[45%]'>
                <HomeTitle title="About Local Hunt"/>
                <HomeDesc
                    beforeHighlight="Crafting"
                    highlight="location-based rewards"
                    afterHighlight="experiences that drive real customer visits"
                />
                {/*<FadeContent>*/}
                {/*    <Button*/}
                {/*        className="*/}
                {/*    mt-10*/}
                {/*    relative flex items-center justify-center*/}
                {/*    rounded-full h-[50px] px-6*/}
                {/*    bg-[#3A3A3A] text-white font-semibold*/}
                {/*    hover:bg-[#2a2a2a] transition-colors*/}
                {/*    shadow-lg cursor-pointer"*/}
                {/*    >*/}
                {/*        Contact Us*/}
                {/*    </Button>*/}
                {/*</FadeContent>*/}
            </div>

            <FadeContent className='md:w-[45.3%] flex flex-col gap-10'>
                {
                    aboutItems.map((item, index) => (
                        <AboutItem
                            key={index}
                            icon={item.icon}
                            title={item.title}
                            desc={item.desc}
                        />
                    ))
                }
            </FadeContent>
        </div>
    )
}

export default AboutUs