import Link from 'next/link'
import { IMAGES } from '@/lib/images';
import { getS3ImageUrl } from '@/lib/s3Utils';
import { CommunityData } from '@/lib/api/communities';
import styles from './CommunityHero.module.css';

interface ManageCommunityProps {
    community?: CommunityData;
}

export default function CommunityHero({ community }: ManageCommunityProps) {
    return (
        <Link className={styles.link} href={`/community/${community.uniqueUrl}`}>
            <div className={styles.container}>
                <div className={styles.imageContainer}>
                    <img
                        src={community?.profileImage?.provider === 'aws-s3' ? 
                            getS3ImageUrl(community.profileImage.key) : 
                            IMAGES.pages.communities.placeholder

                    } alt={community.name} className={styles.image} />
                </div>

                <h2>{community.name}</h2>
            </div>
        </Link>
    );
}