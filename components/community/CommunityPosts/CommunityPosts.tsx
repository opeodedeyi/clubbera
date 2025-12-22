'use client';

import { useState, useEffect } from 'react';
import PostCard from '@/components/post/PostCard/PostCard';
import NoPost from '@/components/ui/NoPost/NoPost';
import CommunityPostsSkeleton from './CommunityPostsSkeleton';
import { CommunityData } from '@/lib/api/communities';
import { postsApi } from '@/lib/api/posts';
import type { Post } from '@/lib/types/posts';
import styles from './CommunityPosts.module.css';

interface CommunityPostsProps {
    community: CommunityData;
    className?: string;
}

export default function CommunityPosts({ community, className }: CommunityPostsProps) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch posts for this specific community
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setIsLoading(true);
                const response = await postsApi.getCommunityPosts(community.id, { limit: 20, offset: 0 });

                // Sort by created_at date (newest first)
                const sortedPosts = response.data.sort((a, b) =>
                    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                );

                setPosts(sortedPosts);
            } catch (error) {
                console.error('Failed to fetch community posts:', error);
                setPosts([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, [community.id]);

    if (isLoading) {
        return <CommunityPostsSkeleton />;
    }

    if (posts.length === 0) {
        return (
            <div className={`${styles.communityPosts} ${className || ''}`}>
                <div className={styles.communityNoPosts}>
                    <NoPost text="Opps, this community has no posts" />
                </div>
            </div>
        );
    }

    return (
        <div className={`${styles.communityPosts} ${className || ''}`}>
            {posts.map(post => (
                <PostCard key={post.id} post={post} variant="community" />
            ))}
        </div>
    );
}
