'use client';

import { useState, useEffect } from 'react';
import CommunityCard from '@/components/cards/community/CommunityCard/CommunityCard';
import { communityApi, type CommunitySearchResult } from '@/lib/api/communities';
import { locationService } from '@/lib/services/locationService';
import styles from './DiscoverCommunities.module.css';

export default function DiscoverCommunities() {
    const [communities, setCommunities] = useState<CommunitySearchResult[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadRecommendations();
    }, []);

    const loadRecommendations = async () => {
        try {
            const location = await locationService.getLocation();
            let response = await communityApi.getCommunityRecommendations(
                6, // Limit to 6 for home page
                0,
                location?.lat,
                location?.lng
            );
            
            // If no results with location, try without location
            if (response.data.length === 0 && location?.lat && location?.lng) {
                response = await communityApi.getCommunityRecommendations(6, 0);
            }
            
            setCommunities(response.data);
        } catch (error) {
            console.error('Failed to load community recommendations:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h2>Discover Communities</h2>

            <div className={styles.containerCards}>
                {loading ? (
                    <div>Loading communities...</div>
                ) : communities.length > 0 ? (
                    communities.map((community) => (
                        <CommunityCard
                            key={community.id}
                            url={community.uniqueUrl}
                            name={community.name}
                            description={community.tagline}
                            member={community.memberCount}
                            profile={community.profileImage?.key}
                            cover={community.coverImage?.key} />
                    ))
                ) : (
                    <div>No communities found</div>
                )}
            </div>
        </div>
    );
} 