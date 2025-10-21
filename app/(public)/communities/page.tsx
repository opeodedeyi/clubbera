import { Suspense } from 'react';
import CommunitiesContent from '@/components/communities/CommunitiesContent/CommunitiesContent';
import DiscoverCommunitiesSkeleton from '@/components/community/DiscoverCommunities/DiscoverCommunitiesSkeleton';
import PageWrapper from '@/components/ui/PageWrapper/PageWrapper';
import styles from '@/components/communities/CommunitiesContent/CommunitiesContent.module.css';

export default function Communities() {
    return (
        <Suspense fallback={<CommunitiesLoading />}>
            <CommunitiesContent />
        </Suspense>
    )
}

function CommunitiesLoading() {
    return (
        <PageWrapper showParticles={true} particleCount={6} particlesHeight={300}>
            <div className={styles.container}>
                {/* Toggle Button Group Skeleton */}
                <div className="skeleton" style={{ width: '200px', height: '44px', borderRadius: 'var(--radius-xl)' }}></div>
            </div>

            <main className={styles.contentContainer}>
                <DiscoverCommunitiesSkeleton />
            </main>
        </PageWrapper>
    )
}