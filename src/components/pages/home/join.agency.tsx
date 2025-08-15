import HomeTitle from "@/components/pages/home/home.title";
import HomeDesc from "@/components/pages/home/home.desc";
import {joinAgencyItems} from "@/constants/home";
import AgencyItem from "@/components/pages/home/agency.item";
import FadeContent from "@/components/animations/fade.content";

const JoinAgency = () => {
    return (
        <section className='py-20'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-20 lg:gap-40 items-center justify-between'>
                <div>
                    <HomeTitle
                        title="Join agency"
                    />
                    <HomeDesc
                        beforeHighlight="Join our"
                        highlight="agency"
                        afterHighlight="of creative innovators"
                    />
                </div>
                <FadeContent>
                    Join our creative community to collaborate, innovate, and thrive together We welcome passionate
                    individuals eager to make.
                </FadeContent>
            </div>
            <FadeContent className='grid grid-cols-1 md:grid-cols-3 mt-20'>
                {joinAgencyItems.map((item, index) => (
                    <AgencyItem
                        key={index}
                        icon={item.icon}
                        title={item.title}
                        desc={item.desc}
                        href={item.href}
                    />
                ))}
            </FadeContent>
        </section>
    )
}

export default JoinAgency