import CenterContainer from "@/components/layout/CenterContainer/CenterContainer";
import HeroSection from "@/components/landing/HeroSection/HeroSection";
import Billboard from "@/components/landing/Billboard/Billboard";
import ForWho from "@/components/about/ForWho/ForWho";
import SocialWorld from "@/components/landing/SocialWorld/SocialWorld";

export default function Landing() {
    return (
        <CenterContainer>
            <HeroSection/>
            {/* row of cards of communinities near a location */}
            {/* row of cards of upcoming events */}
            <Billboard
                title="Start a community that brings it all together."
                text="Real people, real connections, real experiences, join a community that brings it all together."
                btnText="Sign up for free"
                direction="right"
                link="/join"
                variant="baloon"/>
            {/* top categories */}
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