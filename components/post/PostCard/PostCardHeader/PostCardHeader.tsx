import Link from 'next/link';
import Icon from '@/components/ui/Icon/Icon';
import { getS3ImageUrl } from '@/lib/s3Utils';
import { IMAGES } from '@/lib/images';
import { formatSmartDate } from '@/lib/utils/dateFormatter';
import styles from './PostCardHeader.module.css';

interface User {
    full_name: string;
    unique_url: string;
    profile_image?: {
        key: string;
    };
}

interface PostCardHeaderProps {
    user?: User;
    createdAt: string;
    communityName?: string;
    communityUrl?: string;
    variant?: 'default' | 'event' | 'community';
    showCommunity?: boolean;
}

export default function PostCardHeader({
    user,
    createdAt,
    communityName,
    communityUrl,
    showCommunity = true
}: PostCardHeaderProps) {
    // Handle case where user data might not be available
    const userImageSrc = user?.profile_image?.key
        ? getS3ImageUrl(user.profile_image.key)
        : IMAGES.placeholders.avatar;

    const userName = user?.full_name || 'Unknown User';
    const userUrl = user?.unique_url;

    return (
        <div className={styles.header}>
            <div className={styles.userInfo}>
                <div className={styles.userImage}>
                    <img
                        src={userImageSrc}
                        alt='profile image' />
                </div>

                <div className={styles.userDetails}>
                    {userUrl ? (
                        <Link href={`/profile/${userUrl}`} className={styles.userName}>
                            {userName}
                        </Link>
                    ) : (
                        <span className={styles.userName}>{userName}</span>
                    )}
                    <p className={styles.postDate}>
                        {formatSmartDate(createdAt)}
                    </p>
                </div>
            </div>

            {showCommunity && communityName && communityUrl && (
                <div className={styles.communityInfo}>
                    <Icon
                        name="globe"
                        size='sm'
                        color="var(--color-text-muted)" />
                    <Link href={`/community/${communityUrl}`} className={styles.communityName}>
                        {communityName}
                    </Link>
                </div>
            )}
        </div>
    );
}
