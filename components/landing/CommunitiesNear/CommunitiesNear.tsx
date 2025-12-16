"use client";

import { useEffect, useState } from "react";
import CardHeroLayout from "@/components/layout/CardHeroLayout/CardHeroLayout";
import CommunityCardFixed from "@/components/cards/community/CommunityCardFixed/CommunityCardFixed";
import CommunityCardSkeleton from "@/components/cards/community/CommunityCard/CommunityCardSkeleton";
import { communityApi, type CommunitySearchResult } from "@/lib/api/communities";
import { locationService } from "@/lib/services/locationService";
import styles from "./CommunitiesNear.module.css";

export default function CommunitiesNear() {
    const [communities, setCommunities] = useState<CommunitySearchResult[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCommunities = async () => {
            try {
                const location = await locationService.getLocation();
                const response = await communityApi.getCommunityRecommendations(
                    4,
                    0,
                    location?.lat,
                    location?.lng
                );
                setCommunities(response.data);
            } catch (error) {
                console.error("Failed to load communities:", error);
            } finally {
                setLoading(false);
            }
        };

        loadCommunities();
    }, []);

    return (
        <CardHeroLayout title="Communities Near You">
            {loading ? (
                <>
                    <CommunityCardSkeleton className={styles.card} />
                    <CommunityCardSkeleton className={styles.card} />
                    <CommunityCardSkeleton className={styles.card} />
                    <CommunityCardSkeleton className={styles.card} />
                </>
            ) : (
                communities.map((community) => (
                    <CommunityCardFixed
                        key={community.uniqueUrl}
                        url={community.uniqueUrl}
                        profile={community.profileImage?.key}
                        cover={community.coverImage?.key}
                        name={community.name}
                        description={community.tagline}
                        member={community.memberCount}
                        className={styles.card} />
                ))
            )}
        </CardHeroLayout>
    );
}