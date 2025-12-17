'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { eventApi, type EventSearchResult } from '@/lib/api/events';
import { locationService } from '@/lib/services/locationService';
import EventCard from '@/components/cards/event/EventCard/EventCard';
import EventCardSkeleton from '@/components/cards/event/EventCard/EventCardSkeleton';
import styles from './search.module.css';

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';
    const type = searchParams.get('type') || 'events';

    const [results, setResults] = useState<EventSearchResult[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const performSearch = async () => {
            if (!query.trim()) {
                setResults([]);
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                if (type === 'events') {
                    const location = await locationService.getLocation();
                    const response = await eventApi.searchEvents(
                        query,
                        20,
                        0,
                        location?.lat,
                        location?.lng
                    );
                    setResults(response.data.events);
                }
                // Add other types (communities, people) here later
            } catch (err) {
                console.error('Search error:', err);
                setError('Failed to perform search');
            } finally {
                setLoading(false);
            }
        };

        performSearch();
    }, [query, type]);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <p className={styles.title}>
                    {query ? `Showing results for "${query}"` : 'Search'}
                </p>

                {/* filters go here */}

                {loading && (
                    <div className={styles.results}>
                        <EventCardSkeleton />
                        <EventCardSkeleton />
                        <EventCardSkeleton />
                        <EventCardSkeleton />
                        <EventCardSkeleton />
                        <EventCardSkeleton />
                        <EventCardSkeleton />
                        <EventCardSkeleton />
                        <EventCardSkeleton />
                        <EventCardSkeleton />
                    </div>
                )}

                {!loading && error && (
                    <div className={styles.error}>
                        <p>{error}</p>
                    </div>
                )}

                {!loading && !error && query && results.length === 0 && (
                    <div className={styles.noResults}>
                        <p>No results found for "{query}"</p>
                    </div>
                )}

                {!loading && !error && results.length > 0 && (
                    <div className={styles.results}>
                        {results.map((event) => (
                            <EventCard
                                key={event.id}
                                eventId={event.id}
                                coverImage={event.coverImage?.key}
                                title={event.title}
                                description={event.description}
                                startingIn={event.startingIn}
                                attendeeCount={event.attendeeCount} />
                        ))}
                    </div>
                )}

                {!loading && !query && (
                    <div className={styles.emptyState}>
                        <p>Enter a search query to get started</p>
                    </div>
                )}
            </div>
        </div>
    );
}
