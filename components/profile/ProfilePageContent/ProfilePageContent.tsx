'use client';

import { IMAGES } from '@/lib/images';
import Button from '@/components/ui/Button/Button';
import Icon from '@/components/ui/Icon/Icon';
import BackButton from "@/components/ui/BackButton/BackButton";
import { UserProfileByUrlResponse } from '@/lib/api/users';
import styles from './ProfilePageContent.module.css';


interface ProfilePageClientProps {
    initialProfile: UserProfileByUrlResponse['data']
    uniqueUrl: string
}

export default function ProfilePageContent({ initialProfile, uniqueUrl }: ProfilePageClientProps) {
    return (
        <div className={styles.container}>
            <BackButton className='self-start'/>

            <div className={styles.containerMain}>
                <div className={styles.detailsContainer}>
                    <div className={styles.profileDetails}>
                        <div className={styles.avatarContainer}>
                            <img
                                src={
                                    initialProfile.profileImage?.url ||
                                    IMAGES.placeholders.avatar
                                }
                                alt="User Avatar"
                                className={styles.avatar} />
                        </div>

                        <h2>{initialProfile.fullName}</h2>

                        <div className={styles.profileDetailsText}>
                            { initialProfile.gender && (
                                <div className={styles.profileDetailsTextItem}>
                                    <Icon name='profile' size='sm' color='var(--color-default)' />
                                    <span className={styles.profileDetailsTextItemValue}>{initialProfile.gender}</span>
                                </div>
                            )}

                            { initialProfile.location && (
                                <div className={styles.profileDetailsTextItem}>
                                    <Icon name='locationMark' size='sm' color='var(--color-default)' />
                                    <span className={styles.profileDetailsTextItemValue}>{initialProfile.location.city}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {initialProfile.bio && (
                        <div className={styles.TextDetails}>
                            <p className={styles.miniTitle}>Bio</p>
                            <p className={styles.miniDetails}>{initialProfile.bio}</p>
                        </div>
                    )}

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
                    {initialProfile.interests.length > 0 && (
                        <div className={styles.otherContainer}>
                            <h2>My Interests</h2>

                            <div className={styles.interestsList}>
                                {initialProfile.interests.map((interest, index) => (
                                    <span key={index} className={styles.interestItem}>
                                        {interest}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* communitities he has joined */}
                    <div className={styles.otherContainer}>
                        <h2>Communities</h2>

                        <div className={styles.cardList}>
                            {/* {initialProfile.interests.map((interest, index) => (
                                <span key={index} className={styles.interestItem}>
                                    {interest}
                                </span>
                            ))} */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}