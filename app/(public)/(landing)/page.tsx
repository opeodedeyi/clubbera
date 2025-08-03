import CenterContainer from "@/components/layout/CenterContainer/CenterContainer";
import HeroSection from "@/components/landing/HeroSection/HeroSection";
import MoreHero from "@/components/landing/MoreHero/MoreHero";
import ForWho from "@/components/landing/ForWho/ForWho";
import ExtraFeatures from "@/components/landing/ExtraFeatures/ExtraFeatures";
import SocialWorld from "@/components/landing/SocialWorld/SocialWorld";
import FreeCommunity from "@/components/landing/FreeCommunity/FreeCommunity";
import JoinNow from "@/components/landing/JoinNow/JoinNow";

export default function Landing() {
    return (
        <CenterContainer>
            <HeroSection/>
            <MoreHero/>
            <ForWho/>
            <ExtraFeatures/>
            <FreeCommunity/>
            {/* add stuffs here */}
            <SocialWorld/>
            <JoinNow/>
        </CenterContainer>
    );
}