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
            <HeroSection
                headline="Start a community that thrives"
                subHeadline="Right now, book clubs are meeting, runners are training together, and board gamers are arguing about rules. Thousands of communities thriving, every single day. Find yours—it&apos;s free"
                ctaBtnText="Start for Free"/>
            <CommunitiesNear/>
            <UpcomingEvents/>
            <Billboard
                title="Your community deserves a real home"
                text="Not a Facebook group that nobody sees. Not a WhatsApp chat that gets buried. A proper platform, free forever!"
                btnText="Create Your Community"
                direction="right"
                link="/join"
                variant="baloon"/>
            <TopCategories />
            <Billboard
                title="Everything you need. Nothing you don&apos;t"
                text="One platform for events, updates, photos, and staying connected - without the chaos"
                btnText="Sign up for free"
                direction="left"
                link="/join"
                variant="line"/>
            <SocialWorld/> {/* rework on this section */}
        </CenterContainer>
    );
}