'use client';

import CenterContainer from "@/components/layout/CenterContainer/CenterContainer";
import Feed from '@/components/home/Feed/Feed';
import DiscoverCommunities from '@/components/home/DiscoverCommunities/DiscoverCommunities';
import styles from "@/styles/pages/home.module.css";


export default function HomePage() {
    return (
        <CenterContainer>
            <div className={styles.container}>
                <div className={styles.mainContainer}>
                    {/* community buttons goes here, and 
                    (will have different communities, and 
                    the current community you are viewing) */}

                    <Feed/>
                </div>

                <DiscoverCommunities/>
            </div>
        </CenterContainer>
    );
}