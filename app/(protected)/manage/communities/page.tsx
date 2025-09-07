'use client';

import { useState, useEffect } from 'react';
import ManageAccount from '@/components/layout/ManageAccount/ManageAccount';
import CommunityCardLong from '@/components/cards/community/CommunityCardLong/CommunityCardLong';
import { communityApi } from '@/lib/api/communities';
import type { CommunitySearchResult } from '@/lib/api/communities';
import styles from "@/styles/pages/manageCommunities.module.css";

export default function ManageCommunities() {
    const [communities, setCommunities] = useState<CommunitySearchResult[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const ITEMS_PER_PAGE = 10;

    const fetchCommunities = async (page: number) => {
        try {
            setLoading(true);
            setError(null);
            const offset = page * ITEMS_PER_PAGE;
            console.log('Fetching communities with params:', { limit: ITEMS_PER_PAGE, offset, page });
            const response = await communityApi.getMyCommunities(ITEMS_PER_PAGE, offset);
            console.log('API Response:', response);
            setCommunities(response.data);
            setHasMore(response.pagination.hasMore);
        } catch (err) {
            console.error('Error fetching communities:', err);
            console.error('Error details:', {
                message: err instanceof Error ? err.message : 'Unknown error',
                stack: err instanceof Error ? err.stack : undefined,
                status: (err as any)?.status,
                statusText: (err as any)?.statusText,
                response: (err as any)?.response
            });
            setError(`Failed to load communities: ${err instanceof Error ? err.message : 'Unknown error'}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCommunities(currentPage);
    }, [currentPage]);

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (hasMore) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <ManageAccount>
            <div className={styles.contentOrder}>
                <div className={styles.contentText}>
                    <p>Make your community safer</p>
                    <h2>Communities</h2>
                </div>

                <div className={styles.scrollContainer}>
                    {loading ? (
                        <p>Loading communities...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : communities.length === 0 ? (
                        <p>No communities found.</p>
                    ) : (
                        <>
                            {communities.map((community) => (
                                <CommunityCardLong
                                    key={community.id}
                                    url={community.uniqueUrl}
                                    name={community.name}
                                    member={community.memberCount}
                                    profile={community.profileImage?.key}
                                    cover={community.coverImage?.key}
                                />
                            ))}
                            
                            <div className={styles.paginationControls}>
                                <button 
                                    onClick={handlePreviousPage}
                                    disabled={currentPage === 0}
                                    className={styles.paginationButton}
                                >
                                    Previous
                                </button>
                                <button 
                                    onClick={handleNextPage}
                                    disabled={!hasMore}
                                    className={styles.paginationButton}
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </ManageAccount>
    );
}