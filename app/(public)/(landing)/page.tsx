import Billboard from "@/components/landing/Billboard/Billboard";
import SocialWorld from "@/components/landing/SocialWorld/SocialWorld";
import HeroSection from "@/components/landing/HeroSection/HeroSection";
import TopCategories from "@/components/landing/TopCategories/TopCategories";
import UpcomingEvents from "@/components/landing/UpcomingEvents/UpcomingEvents";
import CenterContainer from "@/components/layout/CenterContainer/CenterContainer";
import CommunitiesNear from "@/components/landing/CommunitiesNear/CommunitiesNear";


export default function Landing() {
    return (
        <CenterContainer>
            <HeroSection/>
            <CommunitiesNear/>
            <UpcomingEvents/>
            <Billboard
                title="Start a community that brings it all together."
                text="Real people, real connections, real experiences, join a community that brings it all together."
                btnText="Sign up for free"
                direction="right"
                link="/join"
                variant="baloon"/>
            <TopCategories />
            <Billboard
                title="Everything You Need, All in One Place."
                text="Where Communities Come to Life, Clubbera gives every community a real home to connect, grow, and thrive."
                btnText="Sign up for free"
                direction="left"
                link="/join"
                variant="line"/>
            <SocialWorld/> {/* rework on this section */}
        </CenterContainer>
    );
}