import Link from 'next/link';
import Icon from '@/components/ui/Icon/Icon';
import { getS3ImageUrl } from '@/lib/s3Utils';
import { IMAGES } from '@/lib/images';
import { formatSmartDate } from '@/lib/utils/dateFormatter';
import styles from './PostCard.module.css';

interface User {
    full_name: string;
    unique_url: string;
    profile_image?: {
        key: string;
    };
}

interface PostCardHeaderProps {
    user: User;
    createdAt: string;
    communityName: string;
    communityUrl: string;
    variant?: 'default' | 'event' | 'community';
}

export default function PostCardHeader({
    user,
    createdAt,
    communityName,
    communityUrl,
    variant = 'default'
}: PostCardHeaderProps) {
    return (
        <div className={styles.header}>
            <div className={styles.userInfo}>
                <div className={styles.userImage}>
                    <img
                        src={getS3ImageUrl(user.profile_image?.key) || IMAGES.placeholders.avatar}
                        alt='profile image' />
                </div>

                <div className={styles.userDetails}>
                    <Link href={`/profile/${user.unique_url}`} className={styles.userName}>
                        {user.full_name}
                    </Link>
                    <p className={styles.postDate}>
                        {formatSmartDate(createdAt)}
                    </p>
                </div>
            </div>

            <div className={styles.communityInfo}>
                <Icon
                    name="globe"
                    size='sm'
                    color={`var(--color-${variant})`}
                />
                <Link href={`/community/${communityUrl}`} className={styles.communityName}>
                    {communityName}
                </Link>
            </div>
        </div>
    );
}
