'use client';

import { useState } from 'react';
import Icon from '@/components/ui/Icon/Icon';
import { CommunityData } from '@/lib/api/communities';
import ShareModal from '@/components/ui/ShareModal/ShareModal';
import BackButtonMobile from '@/components/ui/BackButton/BackButtonMobile';
import CommunityDropdown from '@/components/community/CommunityDropdown/CommunityDropdown';
import styles from './MemberHeader.module.css';

interface CommunityMemberViewProps {
    community: CommunityData;
}

export default function MemberHeader({ community }: CommunityMemberViewProps) {
    const [showShareModal, setShowShareModal] = useState(false);
    
    return (
        <>
            <div className={styles.container}>
                <BackButtonMobile/>

                <div className={styles.containerButtons}>
                    <button
                        className={styles.buttons}
                        onClick={() => setShowShareModal(true)}
                        aria-label="share community">
                        <Icon name='share' color='var(--color-text-light)' size='sm' />
                    </button>

                    <CommunityDropdown
                        community={community}
                        trigger={
                            <button
                                className={styles.buttons}
                                aria-label="community options">
                                <Icon name='verticalEllipsis' color='var(--color-text-light)' size='sm' />
                            </button>
                        } />
                </div>
            </div>

            <ShareModal 
                type="community"
                url={typeof window !== 'undefined' ? window.location.href : ''}
                isOpen={showShareModal}
                onClose={() => setShowShareModal(false)} />
        </>
    )
}