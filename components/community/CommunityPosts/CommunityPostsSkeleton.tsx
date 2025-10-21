import PostCardSkeleton from '@/components/post/PostCard/PostCardSkeleton';
import styles from './CommunityPosts.module.css';

export default function CommunityPostsSkeleton() {
    return (
        <div className={styles.communityPosts}>
            {/* PostInput Skeleton */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-4)',
                padding: 'var(--spacing-6)',
                borderRadius: 'var(--radius-card)',
                backgroundColor: 'var(--color-background-light)'
            }}>
                <div style={{ display: 'flex', gap: 'var(--spacing-2)', alignItems: 'center' }}>
                    <div className="skeleton" style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-full)' }}></div>
                    <div className="skeleton" style={{ flex: 1, height: '40px', borderRadius: 'var(--radius-xl)' }}></div>
                </div>
            </div>

            {/* Post Cards Skeletons */}
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
        </div>
    );
}
