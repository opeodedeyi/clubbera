import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { postsApi } from '@/lib/api/posts';
import type { Post } from '@/lib/types/posts';
import PostCardHeader from './PostCardHeader';
import PostCardContent from './PostCardContent';
import PostCardFooter from './PostCardFooter';
import PostCardComments from './PostCardComments';
import styles from './PostCard.module.css';

interface coverImage {
    id: number;
    alt_text: string | null;
    key: string;
    provider: string;
}

interface EventData {
    id?: number;
    title?: string;
    start_time?: string;
    location?: string;
    unique_url: string;
    cover_image?: coverImage;
    current_attendees?: number;
}

interface PostCardProps {
    post: Post & { event_data?: EventData };
    variant?: 'default' | 'event' | 'community';
}

export default function PostCard({ post: initialPost, variant = 'default' }: PostCardProps) {
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [post, setPost] = useState(initialPost);
    const [selectedPollOptions, setSelectedPollOptions] = useState<number[]>([]);
    const queryClient = useQueryClient();

    // Fetch user's reaction status
    const { data: userReaction } = useQuery({
        queryKey: ['user-reaction', post.id],
        queryFn: async () => {
            const response = await postsApi.getUserReaction(post.id);
            return response.data;
        }
    });

    // Fetch replies when comments section is opened
    const { data: repliesData, refetch: refetchReplies } = useQuery({
        queryKey: ['replies', post.id],
        queryFn: async () => {
            const response = await postsApi.getReplies(post.id, { limit: 20, offset: 0 });
            return response.data;
        },
        enabled: showComments
    });

    // Like/Unlike mutation
    const toggleLikeMutation = useMutation({
        mutationFn: async () => {
            if (userReaction?.hasReacted) {
                return postsApi.removeReaction(post.id, { reactionType: 'like' });
            } else {
                return postsApi.addReaction(post.id, { reactionType: 'like' });
            }
        },
        onSuccess: () => {
            // Update local like count
            setPost(prev => ({
                ...prev,
                likes_count: userReaction?.hasReacted
                    ? prev.likes_count - 1
                    : prev.likes_count + 1,
                user_has_liked: !userReaction?.hasReacted
            }));
            queryClient.invalidateQueries({ queryKey: ['user-reaction', post.id] });
        },
        onError: (error) => {
            console.error('Failed to toggle like:', error);
        }
    });

    // Create reply mutation
    const createReplyMutation = useMutation({
        mutationFn: async (content: string) => {
            return postsApi.createReply(post.id, { content });
        },
        onSuccess: () => {
            setNewComment('');
            setPost(prev => ({
                ...prev,
                replies_count: prev.replies_count + 1
            }));
            refetchReplies();
        },
        onError: (error) => {
            console.error('Failed to create reply:', error);
        }
    });

    // Vote on poll mutation
    const votePollMutation = useMutation({
        mutationFn: async (optionIndices: number[]) => {
            return postsApi.votePoll(post.id, { optionIndices });
        },
        onSuccess: (response) => {
            setPost(response.data);
            setSelectedPollOptions([]);
        },
        onError: (error) => {
            console.error('Failed to vote on poll:', error);
        }
    });

    const handleLikeClick = () => {
        toggleLikeMutation.mutate();
    };

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        createReplyMutation.mutate(newComment);
    };

    const handlePollOptionClick = (index: number) => {
        if (post.userHasVoted) return;

        if (post.poll_data?.settings.allowMultipleVotes) {
            setSelectedPollOptions(prev =>
                prev.includes(index)
                    ? prev.filter(i => i !== index)
                    : [...prev, index]
            );
        } else {
            setSelectedPollOptions([index]);
        }
    };

    const handlePollSubmit = () => {
        if (selectedPollOptions.length === 0) return;
        votePollMutation.mutate(selectedPollOptions);
    };

    return (
        <div className={styles.postCard}>
            <PostCardHeader
                user={post.user}
                createdAt={post.created_at}
                communityName={post.community_name}
                communityUrl={post.community_url}
                variant={variant} />

            <PostCardContent
                content={post.content}
                contentType={post.content_type}
                images={post.images}
                eventData={post.event_data}
                pollData={post.poll_data}
                userHasVoted={post.userHasVoted}
                userVote={post.userVote}
                selectedPollOptions={selectedPollOptions}
                onPollOptionClick={handlePollOptionClick}
                onPollSubmit={handlePollSubmit}
                isPollSubmitting={votePollMutation.isPending} />

            <PostCardFooter
                likesCount={post.likes_count}
                repliesCount={post.replies_count}
                userHasReacted={userReaction?.hasReacted || false}
                onLikeClick={handleLikeClick}
                onCommentClick={() => setShowComments(!showComments)} />

            {showComments && (
                <PostCardComments
                    replies={repliesData || []}
                    newComment={newComment}
                    onCommentChange={setNewComment}
                    onCommentSubmit={handleCommentSubmit}
                    isSubmitting={createReplyMutation.isPending}
                />
            )}
        </div>
    );
}
