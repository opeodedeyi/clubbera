'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CommunityData } from '@/lib/api/communities';
import { eventApi, EventSearchResult } from '@/lib/api/events';
import EventsCard from '@/components/events/EventsCard/EventsCard';
import { formatDateWithTimezone } from '@/lib/utils/timezoneFormatter';
import ToggleButtonGroup from '@/components/ui/ToggleButtonGroup/ToggleButtonGroup';
import CommunityLayout from "@/components/layout/CommunityLayout/CommunityLayout";
import styles from './CommunityEventsClient.module.css'

interface CommunityEventsClientProps {
    community: CommunityData;
}

type EventView = 'upcoming' | 'previous'

const VIEW_OPTIONS = [
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'previous', label: 'Previous' }
]

export default function CommunityEventsClient({ community }: CommunityEventsClientProps) {
    const searchParams = useSearchParams()
    const router = useRouter()

    // Initialize state based on URL parameter to avoid flash
    const initialView = searchParams.get('view') === 'previous' ? 'previous' : 'upcoming';
    const [currentView, setCurrentView] = useState<EventView>(initialView);
    const [events, setEvents] = useState<EventSearchResult[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const view = searchParams.get('view')
        if (view === 'previous') {
            setCurrentView('previous')
        } else {
            setCurrentView('upcoming')
        }
    }, [searchParams])

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            setError(null);

            try {
                const filters = currentView === 'upcoming'
                    ? { upcoming: true, pastEvents: false }
                    : { upcoming: false, pastEvents: true };

                const response = await eventApi.getCommunityEvents(
                    community.id,
                    1,
                    10,
                    filters
                );

                console.log('Full response:', response);

                setEvents(response.data.events);
            } catch (err) {
                setError('Failed to load events');
                console.error('Error fetching events:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [community.id, currentView])

    const handleViewChange = (view: string) => {
        const newView = view as EventView
        setCurrentView(newView)

        if (newView === 'previous') {
            router.push(`/community/${community.uniqueUrl}/events?view=previous`)
        } else {
            router.push(`/community/${community.uniqueUrl}/events`)
        }
    }

    return (
        <CommunityLayout community={community}>
            <div className={styles.container}>
                <ToggleButtonGroup
                    className='self-start'
                    options={VIEW_OPTIONS}
                    activeValue={currentView}
                    onChange={handleViewChange}
                    activeColor="--color-event" />

                <div className={styles.eventsContainer}>
                    {loading && <div className={styles.loading}>Loading events...</div>}

                    {error && <div className={styles.error}>{error}</div>}

                    {!loading && !error && events.length === 0 && (
                        <div className={styles.noEvents}>
                            <EventsCard
                                eventId={0}
                                title={`No ${currentView} events found for this community.`}
                                startTime="0 minutes"/>
                        </div>
                    )}

                    {!loading && !error && events.length > 0 && (
                        <div className={styles.eventsList}>
                            {events.map((event) => (
                                <EventsCard
                                    key={event.id}
                                    eventId={event.id}
                                    coverImage={event.coverImage?.key}
                                    title={event.title}
                                    // event.maxAttendees
                                    startTime={formatDateWithTimezone(event.startTime, event.timezone, 'HH:mm')}/>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </CommunityLayout>
    )
}