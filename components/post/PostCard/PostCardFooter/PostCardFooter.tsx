import Icon from '@/components/ui/Icon/Icon';
import styles from './PostCardFooter.module.css';

interface PostCardFooterProps {
    likesCount: number;
    repliesCount?: number;
    userHasReacted: boolean;
    onLikeClick: () => void;
    onCommentClick?: () => void;
    showShare?: boolean;
    canreply?: boolean;
}

export default function PostCardFooter({
    likesCount,
    repliesCount,
    userHasReacted,
    onLikeClick,
    onCommentClick,
    showShare = true,
    canreply = true
}: PostCardFooterProps) {
    return (
        <div className={styles.footer}>
            {showShare && (
                <div
                    className={styles.stat}
                    // onClick={onLikeClick}
                    style={{ cursor: 'pointer' }}>
                    <Icon
                        size='md'
                        name="share"
                        color='var(--color-text-muted)'/>
                    <span className={styles.shareText}>Share</span>
                </div>
            )}

            <div className={styles.footerRight}>
                <div
                    className={`${styles.stat} ${userHasReacted ? styles.liked : ''}`}
                    onClick={onLikeClick}
                    style={{ cursor: 'pointer' }}>
                    <Icon
                        size='md'
                        name="like"
                        fillColor={`${userHasReacted ? 'var(--color-danger)' : 'transparent'}`}
                        strokeColor={`${userHasReacted ? 'var(--color-danger)' : 'var(--color-text-muted)'}`} />
                    <span className={styles.statCount}>{likesCount}</span>
                </div>
                {canreply && (
                    <div
                        className={styles.stat}
                        onClick={onCommentClick}
                        style={{ cursor: 'pointer' }}>
                        <Icon name="comment" size='md' color='var(--color-text-muted)' />
                        <span className={styles.statCount}>{repliesCount}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
