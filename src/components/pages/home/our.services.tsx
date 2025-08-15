import HomeTitle from "@/components/pages/home/home.title";
import HomeDesc from "@/components/pages/home/home.desc";
import {ourServicesItems} from "@/constants/home";
import HomeCard from "@/components/pages/home/home.card";
import Link from "next/link";
import FadeContent from "@/components/animations/fade.content";

const OurServices = () => {
    return (
        <section className='py-20 '>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-20 lg:gap-40 items-center justify-between'>
                <div>
                    <HomeTitle
                        title="Our Services"
                    />
                    <HomeDesc
                        beforeHighlight="Our"
                        highlight="location-based services"
                        afterHighlight="to grow your brand"
                    />
                </div>
                <FadeContent>
                    We provide innovative, location-driven solutions to help your business attract real customers,
                    increase visits, and strengthen brand engagement.
                </FadeContent>
            </div>
            <FadeContent>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-25'>
                    {
                        ourServicesItems.map((service, index) => (
                            <HomeCard
                                key={index}
                                icon={service.icon}
                                title={service.title}
                                desc={service.desc}
                                className='gap-20'
                            />
                        ))
                    }
                </div>
                <p className='text-center mt-15 text-lg'>
                    Launch your own location-based campaigns and grow your customer base.
                    <Link href='/register' className='text-primary font-medium hover:text-white'>
                        <span> Register now</span>
                    </Link>
                </p>
            </FadeContent>
        </section>
    )
}

export default OurServices