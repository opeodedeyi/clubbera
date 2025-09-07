'use client';

import { useState, useEffect } from 'react';
import SearchBar from '@/components/ui/SearchBar/SearchBar';
import CommunityCard from '@/components/cards/community/CommunityCard/CommunityCard';
import { useDiscoverCommunities } from '@/hooks/useDiscoverCommunities';
import styles from './DiscoverCommunities.module.css';

export default function DiscoverCommunities() {
    const [searchQuery, setSearchQuery] = useState('');
    const {
        communities,
        loading,
        error,
        hasSearched,
        searchCommunities,
        initializeFromUrl
    } = useDiscoverCommunities();

    useEffect(() => {
        const initialQuery = initializeFromUrl();
        setSearchQuery(initialQuery);
    }, []);

    const handleSearchSubmit = (query: string) => {
        searchCommunities(query);
    };

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
    };

    return (
        <div className={styles.container}>
            <div className={styles.containerTop}>
                <h1 className={styles.containerTitle}>Discover Communities <br /> around you</h1>

                <div className={styles.search}>
                    <SearchBar
                        size="large"
                        placeholder="Search for Community"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onSubmit={handleSearchSubmit}/>
                </div>
            </div>

            <div className={styles.resultsContainer}>
                {loading && (
                    <div className={styles.loading}>Searching communities...</div>
                )}

                {error && (
                    <div className={styles.error}>{error}</div>
                )}

                {hasSearched && !loading && communities.length === 0 && !error && (
                    <div className={styles.noResults}>No communities found</div>
                )}

                {communities.length > 0 && (
                    <div className={styles.grid}>
                        {communities.map((community) => (
                            <CommunityCard
                                key={community.id}
                                url={community.uniqueUrl}
                                name={community.name}
                                description={community.tagline}
                                member={community.memberCount}
                                profile={community.profileImage?.key}
                                cover={community.coverImage?.key} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}