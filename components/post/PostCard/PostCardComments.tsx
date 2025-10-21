import Link from 'next/link';
import { getS3ImageUrl } from '@/lib/s3Utils';
import { IMAGES } from '@/lib/images';
import { formatSmartDate } from '@/lib/utils/dateFormatter';
import styles from './PostCard.module.css';

interface Reply {
    id: number;
    content: string;
    created_at: string;
    user: {
        full_name: string;
        unique_url: string;
        profile_image?: {
            key: string;
        };
    };
}

interface PostCardCommentsProps {
    replies: Reply[];
    newComment: string;
    onCommentChange: (value: string) => void;
    onCommentSubmit: (e: React.FormEvent) => void;
    isSubmitting: boolean;
}

export default function PostCardComments({
    replies,
    newComment,
    onCommentChange,
    onCommentSubmit,
    isSubmitting
}: PostCardCommentsProps) {
    return (
        <div className={styles.commentsSection}>
            <div className={styles.commentsList}>
                {replies && replies.length > 0 ? (
                    replies.map(reply => (
                        <div key={reply.id} className={styles.comment}>
                            <div className={styles.commentHeader}>
                                <img
                                    src={getS3ImageUrl(reply.user.profile_image?.key) || IMAGES.placeholders.avatar}
                                    alt={reply.user.full_name}
                                    className={styles.commentAvatar}
                                />
                                <div className={styles.commentInfo}>
                                    <Link href={`/profile/${reply.user.unique_url}`} className={styles.commentAuthor}>
                                        {reply.user.full_name}
                                    </Link>
                                    <span className={styles.commentDate}>
                                        {formatSmartDate(reply.created_at)}
                                    </span>
                                </div>
                            </div>
                            <p className={styles.commentContent}>{reply.content}</p>
                        </div>
                    ))
                ) : (
                    <p className={styles.noComments}>No comments yet. Be the first to comment!</p>
                )}
            </div>

            <form onSubmit={onCommentSubmit} className={styles.commentForm}>
                <textarea
                    value={newComment}
                    onChange={(e) => onCommentChange(e.target.value)}
                    placeholder="Write a comment..."
                    className={styles.commentInput}
                    rows={3}
                />
                <button
                    type="submit"
                    className={styles.commentSubmit}
                    disabled={!newComment.trim() || isSubmitting}
                >
                    {isSubmitting ? 'Posting...' : 'Post Comment'}
                </button>
            </form>
        </div>
    );
}
