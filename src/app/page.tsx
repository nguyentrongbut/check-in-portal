import CurvedLoop from "@/components/animations/curved.loop";
import HeroContent from "@/components/pages/home/hero.content";
import AboutUs from "@/components/pages/home/about.us";
import HowItWork from "@/components/pages/home/how.it.work";
import Container from "@/components/common/container";
import OurServices from "@/components/pages/home/our.services";
import ImpactSolutions from "@/components/pages/home/impact.solutions";
import WhyChoose from "@/components/pages/home/why.choose";
import JoinAgency from "@/components/pages/home/join.agency";
import CallToActionSection from "@/components/pages/home/call.to.action.section";
import HomeFooter from "@/components/pages/home/home.footer";
import {Metadata} from "next";

export const metadata: Metadata = {
    metadataBase: new URL('https://localhunt.io.vn'),
    title: 'Local Hunt - Location-based Check-in Marketing Platform for Merchants',
    description:
        'Local Hunt is a location-based marketing platform that helps merchants attract customers through check-in tasks, reward points, and digital vouchers.',
    keywords: [
        'Local Hunt',
        'check-in marketing',
        'location-based marketing',
        'local advertising',
        'reward points',
        'voucher platform',
        'merchant marketing',
    ],
    alternates: {
        canonical: `/`,
        languages: {
            en: '/en',
            vi: '/vi',
        },
    },
    openGraph: {
        title: 'Local Hunt - Location-based Check-in Marketing Platform',
        description:
            'Discover Local Hunt, a location marketing ecosystem that allows businesses to create check-in campaigns while users earn points and redeem vouchers.',
        url: 'https://localhunt.io.vn',
        siteName: 'Local Hunt',
        images: [
            {
                url: '/icon/localhunt-icon.png',
                width: 1200,
                height: 630,
                alt: 'Local Hunt logo',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Local Hunt - Check-in Marketing Platform',
        description:
            'Local Hunt helps merchants engage customers through check-in campaigns, points, and digital rewards.',
        images: ['/icon/localhunt-icon.png'],
    },
};


export default function Home() {
    return (
        <div className='bg-black min-h-screen text-white'>
            <HeroContent/>
            <CurvedLoop
                marqueeText="✦
                            Check-in to earn rewards
                            ✦
                            Redeem points for vouchers
                            ✦
                            Promote your location
                            ✦
                            Campaign performance reports
                            ✦
                            Fraud prevention system"
                curveAmount={10}
            />
            <div
                style={{
                    transform: 'scaleX(-1)',
                    backgroundImage: 'url(/section-bg-shape.png)',
                    backgroundPosition: '100% 700px',
                    backgroundRepeat: 'repeat-y',
                    backgroundSize: '100% auto',
                }}
            >
                <div style={{transform: 'scaleX(-1)'}}>
                    <Container>
                        <AboutUs/>
                        <OurServices/>
                        <ImpactSolutions/>
                        <WhyChoose/>
                        <JoinAgency/>
                        <HowItWork/>
                        <CallToActionSection/>
                        <HomeFooter/>
                    </Container>
                </div>
            </div>
        </div>
    )
}
