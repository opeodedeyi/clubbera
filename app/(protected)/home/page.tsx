'use client';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import CenterContainer from "@/components/layout/CenterContainer/CenterContainer";
import Feed from '@/components/home/Feed/Feed';
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
                    {/* community buttons (will have different communities, and the current community you are viewing) */}

                    <div className={styles.mainContainerCards}>
                        {/* create post cards */}

                        <Feed/>
                    </div>
                </div>

                {isDesktop && (
                    <div className={styles.altContainer}>
                        <h2>Discover Communities</h2>

                        <div className={styles.altContainer}></div>

                    </div>
                )}
            </div>
        </CenterContainer>
    );
}