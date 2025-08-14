import LightRays from "@/components/animations/light.rays";
import HomeHeader from "@/components/pages/home/home.header";
import Container from "@/components/common/container";
import TextType from "@/components/animations/text.type";
import CircularText from "@/components/animations/circular.text";
import {Play} from "lucide-react";

const HeroContent = () => {
    return (
        <div className='w-full h-screen relative text-white'>
            <HomeHeader/>
            <LightRays
                raysOrigin="top-center"
                raysColor="#00ffff"
                raysSpeed={1.5}
                lightSpread={0.8}
                rayLength={1.2}
                followMouse={true}
                mouseInfluence={0.1}
                noiseAmount={0.1}
                distortion={0.05}
                className="custom-rays"
            />
           <Container>
               <div className='absolute top-1/2 -translate-y-1/2 z-10 mt-10'>
                   <h1 className='text-[120px]'>
                       <span className='font-light block -mb-10'>Innovative solutions for</span>
                       <TextType
                           className='font-bold'
                           text={[
                               "Location Marketing",
                               "Customer Rewards",
                               "Verified Check-ins",
                               "Business Growth"
                           ]}
                           typingSpeed={75}
                           pauseDuration={1500}
                           textColors={["#ff6c2f"]}
                           showCursor={false}
                       />
                   </h1>
                  <Container>
                      <div className='ml-[150px] flex justify-between items-center mt-10'>
                          <div className='flex items-center'>
                              <div className='flex justify-center items-center rounded-full bg-primary size-[100px]'>
                                <Play className='size-8 text-black'/>
                              </div>
                              <div className='-ml-6'>
                                  <CircularText
                                      text="LEARN MORE * LEARN MORE * LEARN MORE * "
                                      onHover="speedUp"
                                      spinDuration={20}
                                  />
                              </div>
                          </div>
                          <div className='w-[60%]'>
                              <p>
                                  At Check-in Point, we combine GPS, Wi-Fi, and a Check-in-to-Reward model to deliver seamless reward experiences for users while enabling businesses to attract verified in-store visits that can be measured and optimized.
                              </p>
                          </div>
                      </div>
                  </Container>
               </div>
           </Container>
        </div>
    )
}

export default HeroContent