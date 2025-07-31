import CenterContainer from "@/components/layout/CenterContainer/CenterContainer";
import HeroSection from "@/components/landing/HeroSection/HeroSection";
import MoreHero from "@/components/landing/MoreHero/MoreHero";
import ForWho from "@/components/landing/ForWho/ForWho";

export default function Landing() {
    return (
        <CenterContainer>
            <HeroSection/>
            <MoreHero/>
            <ForWho/>
            
        </CenterContainer>
    );
}