'use client';

import { CommunityData, communityApi } from '@/lib/api/communities';
import { IMAGES } from '@/lib/images';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button/Button';
import { getS3ImageUrl } from '@/lib/s3Utils';
import styles from './CommunityHeader.module.css';

interface CommunityProfileProps {
    community: CommunityData;
}

export default function CommunityHeader({ community }: CommunityProfileProps) {
    const router = useRouter();
    const [isJoining, setIsJoining] = useState(false);
    const [requestSent, setRequestSent] = useState(false);

    // Determine user status
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

        try {
            const requestData = isPrivate ? { 
                message: "I would like to join this community" 
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
            console.error('Error joining community:', error);
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

    // const getButtonVariant = () => {
    //     if (requestSent) return 'secondary';
    //     return 'primary';
    // };

    return (
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

                <div className={styles.profileButtons}>
                    {!isMember ? (
                        <Button
                            variant='community'
                            onClick={handleJoinAction}
                            disabled={isJoining || requestSent}>
                                {getButtonText()}
                        </Button>
                    ) : 
                        // might add check to see if thay are not banned
                        <Button variant='community'>Create Post</Button>
                    }
                    {isAdmin ? (
                        <Button variant='plain'>Manage Community</Button>
                    ):
                        <Button variant='plain'>Share link</Button>
                    }
                </div>
            </div>
        </div>
    );
}