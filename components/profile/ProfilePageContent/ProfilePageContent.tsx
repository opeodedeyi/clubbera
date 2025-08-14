'use client';

import { IMAGES } from '@/lib/images';
import { getS3ImageUrl } from '@/lib/s3Utils';
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
    console.log(uniqueUrl);

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

                    {/* communitities he has joined */}
                    <div className={styles.otherContainer}>
                        <h2>Communities</h2>

                        <div className={styles.cardList}>
                            {/* replace with call to API to get community list */}
                            {/* {initialProfile.interests.length > 0 &&  */}
                                {/* (
                                <div className={styles.interestsList}>
                                {initialProfile.interests.map((interest, index) => ( */}
                                        {/* <span key={index} className={styles.interestItem}>
                                            {interest}
                                        </span>
                                    ))}
                                </div> ) : */}
                                <div className={styles.noContent}>
                                    <div className={styles.noContentIcon}>
                                        <Icon name="group" size='xxl' color='var(--color-text-muted)'/>
                                    </div>
                                    <p className={styles.miniDetailsPlace}>No Communities Joined Yet</p>
                                </div>
                            {/* } */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}