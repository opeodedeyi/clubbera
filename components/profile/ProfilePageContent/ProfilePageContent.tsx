'use client';

import { useState, useEffect } from 'react';
import { IMAGES } from '@/lib/images';
import { getS3ImageUrl } from '@/lib/s3Utils';
import Button from '@/components/ui/Button/Button';
import Icon from '@/components/ui/Icon/Icon';
import BackButton from "@/components/ui/BackButton/BackButton";
import CommunityCardLong from '@/components/cards/community/CommunityCardLong/CommunityCardLong';
import { UserProfileByUrlResponse } from '@/lib/api/users';
import { communityApi, type CommunitySearchResult } from '@/lib/api/communities';
import styles from './ProfilePageContent.module.css';


interface ProfilePageClientProps {
    initialProfile: UserProfileByUrlResponse['data']
    uniqueUrl: string
}

export default function ProfilePageContent({ initialProfile, uniqueUrl }: ProfilePageClientProps) {
    const [communities, setCommunities] = useState<CommunitySearchResult[]>([]);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);

    useEffect(() => {
        loadUserCommunities();
    }, [initialProfile.id]);

    const loadUserCommunities = async (offset = 0, append = false) => {
        if (offset === 0) setLoading(true);
        else setLoadingMore(true);

        try {
            console.log('Loading user communities for ID:', initialProfile.id);
            console.log('Request params:', { uniqueIdentifier: initialProfile.id.toString(), limit: 10, offset });
            
            const response = await communityApi.getUserCommunities(
                initialProfile.id.toString(),
                10, // Load 10 communities at a time
                offset
            );
            
            console.log('Response received:', response);
            console.log('Communities data:', response.data);
            console.log('Pagination info:', response.pagination);
            
            if (append) {
                setCommunities(prev => [...prev, ...response.data]);
            } else {
                setCommunities(response.data);
            }
            
            setHasMore(response.pagination.hasMore);
        } catch (error) {
            console.error('Failed to load user communities:', error);
            console.error('Error details:', error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    const handleSeeMore = () => {
        loadUserCommunities(communities.length, true);
    };

    return (
        <div className={styles.container}>
            <BackButton className='self-start'/>

            <div className={styles.containerMain}>
                <div className={styles.detailsContainer}>
                    <div className={styles.profileDetails}>
                        <div className={styles.avatarContainer}>
                            <img
                                src={
                                    initialProfile.profileImage?.provider == "aws-s3" ?
                                    getS3ImageUrl(initialProfile.profileImage?.key) :
                                    initialProfile.profileImage?.key || 
                                    IMAGES.placeholders.avatar
                                }
                                alt="User Avatar"
                                className={styles.avatar} />
                        </div>

                        <h2>{initialProfile.fullName}</h2>

                        <div className={styles.profileDetailsText}>
                            <div className={styles.profileDetailsTextItem}>
                                <Icon name='profile' size='sm' color='var(--color-default)' />
                                <span className={styles.profileDetailsTextItemValue}>{initialProfile.gender || 'prefer not to say'}</span>
                            </div>

                            <div className={styles.profileDetailsTextItem}>
                                <Icon name='locationMark' size='sm' color='var(--color-default)' />
                                <span className={styles.profileDetailsTextItemValue}>{initialProfile.location?.city || 'Clubbera HQ'}</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.TextDetails}>
                        <p className={styles.miniTitle}>Bio</p>
                        {initialProfile.bio ?
                            <p className={styles.miniDetails}>{initialProfile.bio}</p> :
                            <p className={styles.miniDetailsPlace}>No Bio Set</p>
                        }
                    </div>

                    {initialProfile.isOwner && (
                        <div className={styles.actionButtons}>
                            <Button
                                as='link'
                                href='/manage/account'
                                variant='plain'
                                className={styles.editButton} >
                                Manage Account
                            </Button>
                        </div>
                    )}
                </div>

                <div className={styles.contentDetails}>
                    
                    <div className={styles.otherContainer}>
                        <h2>My Interests</h2>

                        {initialProfile.interests.length > 0 ? (
                            <div className={styles.interestsList}>
                                {initialProfile.interests.map((interest, index) => (
                                    <span key={index} className={styles.interestItem}>
                                        {interest}
                                    </span>
                                ))}
                            </div> ) :
                            <div className={styles.noContent}>
                                <div className={styles.noContentIcon}>
                                    <Icon name="caution" size='xxl' color='var(--color-text-muted)'/>
                                </div>
                                <p className={styles.miniDetailsPlace}>No Interests Set</p>
                            </div>
                        }
                    </div>

                    <div className={styles.otherContainer}>
                        <h2>Communities</h2>
                        <div className={styles.cardList}>
                            {loading ? (
                                <div className={styles.noContent}>
                                    <p className={styles.miniDetailsPlace}>Loading communities...</p>
                                </div>
                            ) : communities.length > 0 ? (
                                <>
                                    <div className={styles.communityList}>
                                        {communities.map((community) => (
                                            <CommunityCardLong
                                                key={community.id}
                                                url={community.uniqueUrl}
                                                name={community.name}
                                                member={community.memberCount}
                                                profile={community.profileImage?.key}
                                                cover={community.coverImage?.key} />
                                        ))}
                                    </div>
                                    {hasMore && (
                                        <div className={styles.seeMoreContainer}>
                                            <Button
                                                variant="default"
                                                onClick={handleSeeMore}
                                                disabled={loadingMore}>
                                                {loadingMore ? 'Loading...' : 'See More'}
                                            </Button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className={styles.noContent}>
                                    <div className={styles.noContentIcon}>
                                        <Icon name="group" size='xxl' color='var(--color-text-muted)'/>
                                    </div>
                                    <p className={styles.miniDetailsPlace}>No Communities Joined Yet</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}