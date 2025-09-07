import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { communityApi, type CommunitySearchResult } from '@/lib/api/communities';
import { locationService } from '@/lib/services/locationService';

export const useDiscoverCommunities = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [communities, setCommunities] = useState<CommunitySearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasSearched, setHasSearched] = useState(false);

    useEffect(() => {
        const queryFromUrl = searchParams.get('q');
        if (!queryFromUrl) {
            loadRecommendations();
        }
    }, []);

    const loadRecommendations = async () => {
        setLoading(true);
        setError(null);
        setHasSearched(false);

        try {
            const location = await locationService.getLocation();
            const response = await communityApi.getCommunityRecommendations(
                20, 
                0, 
                location?.lat, 
                location?.lng
            );
            setCommunities(response.data);
        } catch (err) {
            setError('Failed to load recommendations');
            console.error('Recommendations error:', err);
        } finally {
            setLoading(false);
        }
    };

    const searchCommunities = async (query: string) => {
        if (!query.trim()) {
            loadRecommendations();
            setHasSearched(false);
            updateUrl('');
            return;
        }

        setLoading(true);
        setError(null);
        setHasSearched(true);
        updateUrl(query);

        try {
            const location = await locationService.getLocation();
            const response = await communityApi.searchCommunities(
                query, 
                20, 
                0, 
                location?.lat, 
                location?.lng
            );
            setCommunities(response.data);
        } catch (err) {
            setError('Failed to search communities');
            console.error('Search error:', err);
        } finally {
            setLoading(false);
        }
    };

    const updateUrl = (query: string) => {
        const currentParams = new URLSearchParams(searchParams.toString());
        
        if (query.trim()) {
            currentParams.set('q', query);
        } else {
            currentParams.delete('q');
        }
        
        const newUrl = currentParams.toString() 
            ? `/communities?${currentParams.toString()}`
            : '/communities';
            
        router.push(newUrl, { scroll: false });
    };

    const initializeFromUrl = () => {
        const queryFromUrl = searchParams.get('q') || '';
        if (queryFromUrl) {
            searchCommunities(queryFromUrl);
        }
        return queryFromUrl;
    };

    return {
        communities,
        loading,
        error,
        hasSearched,
        searchCommunities,
        initializeFromUrl,
        loadRecommendations
    };
};