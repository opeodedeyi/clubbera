'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { eventApi, type EventSearchResult } from '@/lib/api/events';
import { locationService } from '@/lib/services/locationService';
import EventCard from '@/components/cards/event/EventCard/EventCard';
import EventCardSkeleton from '@/components/cards/event/EventCard/EventCardSkeleton';
import SearchFilter from '@/components/Form/SearchFilter/SearchFilter';
import styles from './search.module.css';

type EventType = 'physical' | 'online' | 'hybrid' | null;
type TimeRange = 'upcoming' | 'this_week' | 'this_month' | 'past' | null;

export default function SearchPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const query = searchParams.get('q') || '';
    const type = searchParams.get('type') || 'events';

    const [results, setResults] = useState<EventSearchResult[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [eventType, setEventType] = useState<EventType>(
        (searchParams.get('eventType') as EventType) || null
    );
    const [timeRange, setTimeRange] = useState<TimeRange>(
        (searchParams.get('timeRange') as TimeRange) || null
    );

    // Update URL when filters change
    const updateFilters = (newEventType: EventType, newTimeRange: TimeRange) => {
        const params = new URLSearchParams();
        params.set('q', query);
        params.set('type', type);
        if (newEventType) params.set('eventType', newEventType);
        if (newTimeRange) params.set('timeRange', newTimeRange);
        router.push(`/search?${params.toString()}`);
    };

    const handleEventTypeChange = (value: string | null) => {
        const newEventType = value as EventType;
        setEventType(newEventType);
        updateFilters(newEventType, timeRange);
    };

    const handleTimeRangeChange = (value: string | null) => {
        const newTimeRange = value as TimeRange;
        setTimeRange(newTimeRange);
        updateFilters(eventType, newTimeRange);
    };

    const handleResetFilters = () => {
        setEventType(null);
        setTimeRange(null);
        const params = new URLSearchParams();
        params.set('q', query);
        params.set('type', type);
        router.push(`/search?${params.toString()}`);
    };

    const hasActiveFilters = eventType !== null || timeRange !== null;

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
                        location?.lng,
                        eventType || undefined,
                        timeRange || undefined
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
    }, [query, type, eventType, timeRange]);

    const eventTypeOptions = [
        { value: null, label: 'All types' },
        { value: 'physical', label: 'Physical' },
        { value: 'online', label: 'Online' },
        { value: 'hybrid', label: 'Hybrid' }
    ];

    const timeRangeOptions = [
        { value: null, label: 'All time' },
        { value: 'upcoming', label: 'Upcoming' },
        { value: 'this_week', label: 'This week' },
        { value: 'this_month', label: 'This month' },
        { value: 'past', label: 'Past events' }
    ];

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <p className={styles.title}>
                        {query ? `Showing results for "${query}"` : 'Search'}
                    </p>

                    {/* Filters Bar */}
                    <div className={styles.filtersBar}>
                        <SearchFilter
                            options={eventTypeOptions}
                            value={eventType}
                            placeholder="Event type"
                            onChange={handleEventTypeChange} />
                        <SearchFilter
                            options={timeRangeOptions}
                            value={timeRange}
                            placeholder="Time range"
                            onChange={handleTimeRangeChange} />
                        {hasActiveFilters && (
                            <button
                                onClick={handleResetFilters}
                                className={styles.resetButton}>
                                Reset filters
                            </button>
                        )}
                    </div>
                </div>

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
                        <p>No results found for &quot;{query}&quot;</p>
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
