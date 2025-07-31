import CenterContainer from "@/components/layout/CenterContainer/CenterContainer";
import HeroSection from "@/components/landing/HeroSection/HeroSection";
import MoreHero from "@/components/landing/MoreHero/MoreHero";
import ForWho from "@/components/landing/ForWho/ForWho";
import ExtraFeatures from "@/components/landing/ExtraFeatures/ExtraFeatures";

export default function Landing() {
    return (
        <CenterContainer>
            <HeroSection/>
            <MoreHero/>
            <ForWho/>
            <ExtraFeatures/>
        </CenterContainer>
    );
}