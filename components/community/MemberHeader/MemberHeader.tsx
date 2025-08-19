'use client';

import { CommunityData } from '@/lib/api/communities';
import Icon from '@/components/ui/Icon/Icon';
import BackButtonMobile from '@/components/ui/BackButton/BackButtonMobile';
import styles from './MemberHeader.module.css';

interface CommunityMemberViewProps {
    community: CommunityData;
}

export default function MemberHeader({ community }: CommunityMemberViewProps) {
    console.log('MemberHeader', community);
    
    return (
        <div className={styles.container}>
            <BackButtonMobile/>

            <div className={styles.containerButtons}>
                <button
                    className={styles.buttons}
                    // onClick={handleBack}
                    aria-label="open more options">
                    <Icon name='like' size='sm' />
                </button>

                <button
                    className={styles.buttons}
                    // onClick={handleBack}
                    aria-label="open more options">
                    <Icon name='verticalEllipsis' size='sm' />
                </button>
            </div>
        </div>
    )
}