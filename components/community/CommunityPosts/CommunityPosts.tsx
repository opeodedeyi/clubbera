'use client';

import { useState, useEffect } from 'react';
import NoPost from '@/components/ui/NoPost/NoPost';
import { CommunityData } from '@/lib/api/communities';
import styles from './CommunityPosts.module.css';

// will edit later
interface Post {
    id: string;
    title: string;
    content: string;
    author: {
        id: string;
        name: string;
        avatar?: string;
    };
    createdAt: string;
    likesCount: number;
    commentsCount: number;
    isLiked: boolean;
}

interface CommunityPostsProps {
    community: CommunityData;
    className?: string;
}

export default function CommunityPosts({ community, className }: CommunityPostsProps) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Simulate API call
        const fetchPosts = async () => {
            try {
                setIsLoading(true);
                setError(null);
                
                // TODO: Replace with actual API call
                // const response = await fetch(`/api/communities/${community.id}/posts`);
                // const data = await response.json();
                // setPosts(data.posts);
                
                // Simulate loading delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // For now, set empty posts array
                setPosts([]);
                
            } catch (err) {
                setError('Failed to load posts');
                console.error('Error fetching posts:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, [community.id]);

    const handleRefresh = () => {
        // TODO: Implement refresh functionality
        console.log('Refreshing posts...');
    };

    if (isLoading) {
        return (
            <div className={`${styles.communityPosts} ${className || ''}`}>
                <div className={styles.header}>
                    <h3 className={styles.title}>Community Posts</h3>
                </div>
                <div className={styles.loadingContainer}>
                    <p className={styles.loadingText}>Loading posts...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`${styles.communityPosts} ${className || ''}`}>
                <div className={styles.header}>
                    <h3 className={styles.title}>Community Posts</h3>
                </div>
                <div className={styles.errorContainer}>
                    <p className={styles.errorText}>{error}</p>
                    <button 
                        className={styles.retryButton}
                        onClick={handleRefresh}>
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className={`${styles.communityNoPosts} ${className || ''}`}>
                <NoPost
                    text="Opps, this community has no posts"/>
            </div>
        );
    }

    // This will be used when we have actual posts
    return (
        <div className={`${styles.communityPosts} ${className || ''}`}>
            <div className={styles.postsContainer}>
                {posts.map(post => (
                    <div key={post.id} className={styles.postCard}>
                        {/* Post content will go here */}
                    </div>
                ))}
            </div>
        </div>
    );
}