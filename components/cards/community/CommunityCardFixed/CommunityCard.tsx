import Link from 'next/link';
import { IMAGES } from '@/lib/images';
import { getS3ImageUrl } from '@/lib/s3Utils';
import Icon from '@/components/ui/Icon/Icon';
import styles from './CommunityCard.module.css';

interface CommunityCardProps {
    url?: string;
    profile?: string;
    cover?: string;
    name: string;
    description: string;
    member: number;
    className?: string;
}

export default function CommunityCard({ url, profile, cover, name, description, member, className }: CommunityCardProps) {
    const cardContent = (
        <div className={styles.card}>
            <div className={styles.cardCover}>
                <img src={getS3ImageUrl(cover) || IMAGES.pages.communities.cover} alt='cover image of community'/>
            </div>
            <div className={styles.cardProfile}>
                <img src={getS3ImageUrl(profile) || IMAGES.pages.communities.placeholder} alt='profile image of community' />
            </div>
            <div className={styles.cardText}>
                <div className={styles.cardTextMain}>
                    <h5 className={styles.cardTextTitle}>{name}</h5>
                    <p className={styles.cardTextDescription}>{description}</p>
                </div>
                <div className={styles.cardTextMember}><Icon name='group' size='sm' color='var(--color-text-light)'/><span>{`${member} Member${member > 1 ? 's' : ''}`}</span></div>
            </div>
            <div className={styles.cardArrow}>
                <Icon name='arrowRight' size='sm' color='var(--color-text-light)'/>
            </div>
        </div>
    );

    if (url) {
        return (
            <Link href={`/community/${url}`} className={`${styles.cardLink} ${className || ''}`}>
                {cardContent}
            </Link>
        );
    }

    return (
        <div className={`${styles.cardLink} ${className || ''}`}>
            {cardContent}
        </div>
    );
} 