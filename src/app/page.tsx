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

export default function Home() {
    return (
           <div className='bg-black min-h-screen text-white'>
              <HeroContent/>
               <CurvedLoop
                   marqueeText="Website Design
                        ✦
                        Digital Marketing
                        ✦
                        Strategy Consulting
                        ✦
                        Analytics & Reporting
                        ✦
                        Custom Branding"
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
                   <div style={{ transform: 'scaleX(-1)' }}>
                       <Container>
                           <AboutUs />
                           <OurServices/>
                           <ImpactSolutions/>
                           <WhyChoose/>
                           <JoinAgency/>
                           <HowItWork />
                           <CallToActionSection/>
                           <HomeFooter/>
                       </Container>
                   </div>
               </div>
           </div>
    )
}
