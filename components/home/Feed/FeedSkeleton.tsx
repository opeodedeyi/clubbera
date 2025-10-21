import PostCardSkeleton from '@/components/post/PostCard/PostCardSkeleton';
import styles from './Feed.module.css';

export default function FeedSkeleton() {
    return (
        <div className={styles.feed}>
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
        </div>
    );
}
