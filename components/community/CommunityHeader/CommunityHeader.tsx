'use client';

import { useState } from 'react';
import { IMAGES } from '@/lib/images';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/Icon/Icon';
import { getS3ImageUrl } from '@/lib/s3Utils';
import Button from '@/components/ui/Button/Button';
import ShareModal from '@/components/ui/ShareModal/ShareModal';
import { formatDate } from '@/lib/utils/dateFormatter';
import { CommunityData, communityApi } from '@/lib/api/communities';
import CommunityDropdown from '@/components/community/CommunityDropdown/CommunityDropdown';
import styles from './CommunityHeader.module.css';

interface CommunityProfileProps {
    community: CommunityData;
}

export default function CommunityHeader({ community }: CommunityProfileProps) {
    const router = useRouter();
    const [isJoining, setIsJoining] = useState(false);
    const [requestSent, setRequestSent] = useState(community.user?.joinRequestStatus=='pending' || false);
    const [error, setError] = useState<string | null>(null);
    const [showShareModal, setShowShareModal] = useState(false);

    const isLoggedIn = community.user !== null;
    const isMember = community.user?.isMember || false;
    const isAdmin = community.user?.isAdmin || false;
    const isPrivate = community.isPrivate;

    const handleJoinAction = async () => {
        if (!isLoggedIn) {
            router.push('/login');
            return;
        }

        if (isMember) return;

        setIsJoining(true);
        setError(null);

        try {
            const requestData = isPrivate ? { 
                message: `I would like to join ${community.name}`
            } : undefined;

            const response = await communityApi.joinCommunity(community.id, requestData);

            if (response.status === 'success') {
                if (isPrivate) {
                    setRequestSent(true);
                } else {
                    router.refresh();
                }
            }
        } catch (error) {
            setError(error);
        } finally {
            setIsJoining(false);
        }
    };

    const getButtonText = () => {
        if (isJoining) return 'Please wait...';
        if (requestSent) return 'Request Sent';
        if (!isLoggedIn) return 'Join Community';
        if (isPrivate) return 'Request to Join';
        return 'Join Community';
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.profilePictures}>
                    <div className={styles.profileCover}>
                        <img src={getS3ImageUrl(community.coverImage?.key) || IMAGES.pages.communities.cover} alt='cover image for community'/>
                    </div>
                    <div className={styles.profileImage}>
                        <img src={getS3ImageUrl(community.profileImage?.key) || IMAGES.pages.communities.placeholder} alt='profile image for community'/>
                    </div>
                </div>

                <div className={styles.profileAction}>
                    <span className={`${styles.profileTitle} font-boris`}>{community.name} <span className={styles.profileTag}>{community.isPrivate ? "Private" : "Public"}</span></span>

                    {!isMember ? (
                        <div className={styles.profileButtons}>
                            <Button
                                variant='community'
                                onClick={handleJoinAction}
                                disabled={isJoining || requestSent}>
                                    {getButtonText()}
                            </Button>

                            <Button variant='plain' onClick={() => setShowShareModal(true)}>Share link</Button>
                        </div>
                    ) :
                        <div className={`${styles.profileButtons} desktop-only-flex`}>
                            <Button variant='community'>Create Post</Button>
                            {
                                isAdmin ? (
                                    <Button as='link' href={`/community/${community.id}/manage`} variant='plain'>Manage Community</Button>
                                ) : (
                                    <Button variant='plain' onClick={() => setShowShareModal(true)}>Share link</Button>
                                )
                            }
                            
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
                    }
                </div>

                {!isMember && (
                    <div className={`${styles.profileText}`}>
                        <div className={styles.profileTextItem}><Icon name="locationMark" color='var(--color-community)'/> <span>{community.location.name}</span></div>
                        <div className={styles.profileTextItem}><Icon name="group" color='var(--color-community)'/> <span>{community.memberCount}</span></div>
                        <div className={styles.profileTextItem}><Icon name="globe" color='var(--color-community)'/> <span>Created {formatDate(community.createdAt, 'medium')}</span></div>
                        {error && <p>{error}</p>}
                    </div>
                )}
            </div>

            <ShareModal 
                type="community"
                url={typeof window !== 'undefined' ? window.location.href : ''}
                isOpen={showShareModal}
                onClose={() => setShowShareModal(false)} />
        </>
    );
}