'use client';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import CenterContainer from "@/components/layout/CenterContainer/CenterContainer";
import Feed from '@/components/home/Feed/Feed';
import DiscoverCommunities from '@/components/home/DiscoverCommunities/DiscoverCommunities';
// import CommunitiesDiscover from '@/components/pages/home/CommunitiesDiscover/CommunitiesDiscover';
// import UserCommunities from '@/components/pages/home/UserCommunities/UserCommunities';
// import CommunitiesDiscoverSkeleton from '@/components/pages/home/CommunitiesDiscover/CommunitiesDiscoverSkeleton';
// import UserCommunitiesSkeleton from '@/components/pages/home/UserCommunities/UserCommunitiesSkeleton';
import styles from "@/styles/pages/home.module.css";


export default function HomePage() {
    const isDesktop = useMediaQuery('(min-width: 1280px)')

    return (
        <CenterContainer>
            <div className={styles.container}>
                <div className={styles.mainContainer}>
                    {/* community buttons goes here, and 
                    (will have different communities, and 
                    the current community you are viewing) */}

                    <Feed/>
                </div>

                {isDesktop && (
                    <DiscoverCommunities/>
                )}
            </div>
        </CenterContainer>
    );
}