import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { postsApi } from '@/lib/api/posts';
import PostCardHeader from '../PostCardHeader/PostCardHeader';
import Button from '@/components/ui/Button/Button';
import PostCardFooter from '../PostCardFooter/PostCardFooter';
import styles from './PostCardComments.module.css';

interface Reply {
    id: number;
    content: string;
    created_at: string;
    likes_count: number;
    user_has_liked?: boolean;
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

function ReplyItem({ reply }: { reply: Reply }) {
    const [localReply, setLocalReply] = useState(reply);
    const queryClient = useQueryClient();

    // Fetch user's reaction status for this reply
    const { data: userReaction } = useQuery({
        queryKey: ['reply-reaction', reply.id],
        queryFn: async () => {
            const response = await postsApi.getUserReaction(reply.id);
            return response.data;
        }
    });

    // Toggle like mutation for reply
    const toggleLikeMutation = useMutation({
        mutationFn: async () => {
            if (userReaction?.hasReacted) {
                return postsApi.removeReaction(reply.id, { reactionType: 'like' });
            } else {
                return postsApi.addReaction(reply.id, { reactionType: 'like' });
            }
        },
        onSuccess: () => {
            setLocalReply(prev => ({
                ...prev,
                likes_count: userReaction?.hasReacted
                    ? Number(prev.likes_count) - 1
                    : Number(prev.likes_count) + 1,
                user_has_liked: !userReaction?.hasReacted
            }));
            queryClient.invalidateQueries({ queryKey: ['reply-reaction', reply.id] });
        },
        onError: (error) => {
            console.error('Failed to toggle reply like:', error);
        }
    });

    const handleLikeClick = () => {
        toggleLikeMutation.mutate();
    };

    return (
        <div className={styles.comment}>
            <PostCardHeader
                user={localReply.user}
                createdAt={localReply.created_at}
                showCommunity={false} />
            <p className={styles.commentContent}>{localReply.content}</p>
            <PostCardFooter
                likesCount={localReply.likes_count}
                userHasReacted={userReaction?.hasReacted || false}
                onLikeClick={handleLikeClick}
                canreply={false}
                showShare={false} />
        </div>
    );
}

export default function PostCardComments({
    replies,
    newComment,
    onCommentChange,
    onCommentSubmit,
    isSubmitting
}: PostCardCommentsProps) {

    console.log('Rendering PostCardComments with replies:', replies);
    return (
        <div className={styles.commentsSection}>
            <form onSubmit={onCommentSubmit} className={styles.commentForm}>
                <textarea
                    value={newComment}
                    onChange={(e) => onCommentChange(e.target.value)}
                    placeholder="Post a reply..."
                    className={styles.commentInput}
                    rows={1} />
                <Button
                    type="submit"
                    variant="gray"
                    className='self-end'
                    disabled={!newComment.trim() || isSubmitting}>
                    {isSubmitting ? 'Replying...' : 'Reply'}
                </Button>
            </form>

            <div className={styles.commentsList}>
                {replies && replies.length > 0 && (
                    replies.map(reply => (
                        <ReplyItem key={reply.id} reply={reply} />
                    ))
                )}
            </div>
        </div>
    );
}
