'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { eventApi, EventSearchResult } from '@/lib/api/events';
import { formatDateWithTimezone } from '@/lib/utils/timezoneFormatter';
import PageWrapper from "@/components/ui/PageWrapper/PageWrapper";
import EventsCard from '@/components/events/EventsCard/EventsCard';
import ToggleButtonGroup from '@/components/ui/ToggleButtonGroup/ToggleButtonGroup';
import styles from './EventsContent.module.css';

type EventView = 'upcoming' | 'previous';

const VIEW_OPTIONS = [
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'previous', label: 'Previous' }
]

interface GroupedEvents {
    [dateKey: string]: {
        relativeLabel: string;
        dateLabel: string;
        events: EventSearchResult[];
    };
}

interface TimelineSectionProps {
    relativeLabel: string;
    dateLabel: string;
    events: EventSearchResult[];
    formatTime: (startTime: string, timezone?: string) => string;
}

function TimelineSection({ relativeLabel, dateLabel, events, formatTime }: TimelineSectionProps) {
    return (
        <div className={styles.timeline}>
            <div className={`${styles.timelineDate} desktop-only-flex`}>
                <p className={styles.timelineDateTitle}>{relativeLabel}</p>
                <p className={styles.timelineDateSubtitle}>{dateLabel}</p>
            </div>

            <div className={styles.timelineHL}></div>

            <div className={styles.cardContent}>
                <div className={`${styles.timelineDate} ${styles.cardContentExtraSpacing} tablet-mobile-flex`}>
                    <p className={styles.timelineDateTitle}>{relativeLabel}</p>
                    <p className={styles.timelineDateSubtitle}>{dateLabel}</p>
                </div>

                {events.map((event) => (
                    <EventsCard
                        key={event.id}
                        eventId={event.id}
                        coverImage={event.coverImage?.key}
                        title={event.title}
                        startTime={formatTime(event.startTime, event.timezone)}
                    />
                ))}
            </div>
        </div>
    );
}

export default function EventsContent() {
    const searchParams = useSearchParams()
    const router = useRouter()

    // Initialize state based on URL parameter to avoid flash
    const initialView = searchParams.get('view') === 'previous' ? 'previous' : 'upcoming';
    const [currentView, setCurrentView] = useState<EventView>(initialView);
    const [events, setEvents] = useState<EventSearchResult[]>([]);
    const [groupedEvents, setGroupedEvents] = useState<GroupedEvents>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            setError(null);

            try {
                const filters = currentView === 'upcoming'
                    ? { upcoming: true, pastEvents: false }
                    : { upcoming: false, pastEvents: true };

                const response = await eventApi.getMyEvents(
                    1,
                    10,
                    filters
                );

                console.log('Full response:', response);
                console.log('response.data:', response.data);
                console.log('Type of response.data:', typeof response.data);
                console.log('Is array?', Array.isArray(response.data));

                // Handle different possible response structures
                let eventsData: EventSearchResult[] = [];

                if (Array.isArray(response.data)) {
                    eventsData = response.data;
                } else if (response.data && typeof response.data === 'object' && 'events' in response.data) {
                    // Handle nested structure like CommunityEventsResponse
                    eventsData = (response.data as any).events || [];
                } else {
                    console.warn('Unexpected response structure:', response);
                    eventsData = [];
                }

                console.log('Final eventsData:', eventsData);
                setEvents(eventsData);

                if (currentView === 'upcoming') {
                    const grouped = groupEventsByDate(eventsData);
                    setGroupedEvents(grouped);
                }
            } catch (err) {
                setError('Failed to load events');
                console.error('Error fetching events:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [currentView])

    const handleViewChange = (view: string) => {
        const newView = view as EventView
        setCurrentView(newView)

        if (newView === 'previous') {
            router.push('/events?view=previous')
        } else {
            router.push('/events')
        }
    }

    const getRelativeTimeLabel = (date: Date): string => {
        const today = new Date();
        const diffTime = date.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const DAYS_IN_WEEK = 7;
        const DAYS_IN_MONTH = 30;
        const DAYS_IN_YEAR = 365;

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Tomorrow';
        if (diffDays === -1) return 'Yesterday';

        if (diffDays > 1 && diffDays <= DAYS_IN_WEEK) return `In ${diffDays} days`;
        if (diffDays < -1 && diffDays >= -DAYS_IN_WEEK) return `${Math.abs(diffDays)} days ago`;

        if (diffDays > DAYS_IN_WEEK && diffDays <= DAYS_IN_MONTH) {
            const weeks = Math.ceil(diffDays / DAYS_IN_WEEK);
            return `In ${weeks} ${weeks === 1 ? 'week' : 'weeks'}`;
        }

        if (diffDays > DAYS_IN_MONTH && diffDays <= DAYS_IN_YEAR) {
            const months = Math.ceil(diffDays / DAYS_IN_MONTH);
            return `In ${months} ${months === 1 ? 'month' : 'months'}`;
        }

        if (diffDays > DAYS_IN_YEAR) {
            const years = Math.ceil(diffDays / DAYS_IN_YEAR);
            return `In ${years} ${years === 1 ? 'year' : 'years'}`;
        }

        return `${Math.abs(diffDays)} days ago`;
    };

    const formatDateLabel = (date: Date): string => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            day: 'numeric'
        });
    };

    const groupEventsByDate = (events: EventSearchResult[]): GroupedEvents => {
        const grouped: GroupedEvents = {};

        if (!Array.isArray(events)) {
            console.error('groupEventsByDate called with non-array:', events);
            return grouped;
        }

        events.forEach(event => {
            const eventDate = new Date(event.startTime);
            const dateKey = eventDate.toDateString();

            if (!grouped[dateKey]) {
                grouped[dateKey] = {
                    relativeLabel: getRelativeTimeLabel(eventDate),
                    dateLabel: formatDateLabel(eventDate),
                    events: []
                };
            }

            grouped[dateKey].events.push(event);
        });

        return grouped;
    };

    const formatSimpleEventTime = (startTime: string, timezone?: string): string => {
        return formatDateWithTimezone(startTime, timezone, 'HH:mm');
    };

    return (
        <PageWrapper showParticles={false}>
            <div className={styles.navigation}>
                <h1>Events</h1>

                <ToggleButtonGroup
                    options={VIEW_OPTIONS}
                    activeValue={currentView}
                    onChange={handleViewChange}
                    activeColor="--color-event"/>
            </div>

            <main className={styles.contentContainer}>
                {loading && (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                        Loading events...
                    </div>
                )}

                {error && (
                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-error)' }}>
                        {error}
                    </div>
                )}

                {!loading && !error && events.length === 0 && (
                    <div className={styles.noEvent}>
                        <EventsCard
                            eventId={0}
                            title={`No ${currentView} events found.`}
                            startTime='0 days' />
                        
                    </div>
                )}

                {!loading && !error && events.length > 0 && (
                    <>
                        {currentView === 'upcoming' ? (
                            // Upcoming events - grouped by date
                            Object.entries(groupedEvents).map(([dateKey, group]) => (
                                <TimelineSection
                                    key={dateKey}
                                    relativeLabel={group.relativeLabel}
                                    dateLabel={group.dateLabel}
                                    events={group.events}
                                    formatTime={formatSimpleEventTime} />
                            ))
                        ) : (
                            // Previous events
                            <TimelineSection
                                relativeLabel="Ended"
                                dateLabel="Event ended"
                                events={events}
                                formatTime={formatSimpleEventTime} />
                        )}
                    </>
                )}
            </main>
        </PageWrapper>
    )
}