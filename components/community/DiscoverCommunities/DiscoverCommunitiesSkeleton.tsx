import CommunityCardSkeleton from '@/components/cards/community/CommunityCard/CommunityCardSkeleton';
import styles from './DiscoverCommunities.module.css';

export default function DiscoverCommunitiesSkeleton() {
    return (
        <div className={styles.container}>
            <div className={styles.containerTop}>
                {/* Title Skeleton */}
                <div className="skeleton" style={{ width: '350px', height: '48px', maxWidth: '90%' }}></div>

                {/* Search Bar Skeleton */}
                <div className={styles.search}>
                    <div className="skeleton" style={{ width: '100%', height: '56px', borderRadius: 'var(--radius-xl)' }}></div>
                </div>
            </div>

            <div className={styles.resultsContainer}>
                <div className={styles.grid}>
                    <CommunityCardSkeleton />
                    <CommunityCardSkeleton />
                    <CommunityCardSkeleton />
                    <CommunityCardSkeleton />
                    <CommunityCardSkeleton />
                    <CommunityCardSkeleton />
                </div>
            </div>
        </div>
    );
}
