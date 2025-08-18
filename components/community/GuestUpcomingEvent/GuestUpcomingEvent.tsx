'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon/Icon';
// import EventCard from '@/components/Event/EventCard/EventCard';
import styles from './GuestUpcomingEvent.module.css';


interface EventData {
    id: number;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    location?: {
        name: string;
        address: string;
        type: 'physical' | 'virtual' | 'hybrid';
    };
    image?: {
        provider: string;
        key: string;
        altText: string;
    };
    attendeeCount: number;
    maxAttendees?: number;
    isPublic: boolean;
    communityId: number;
    createdBy: number;
}

interface GuestUpcomingEventProps {
    communityId: number;
    limit?: number; // Number of events to show
    className?: string;
}

export default function GuestUpcomingEvent({ 
    communityId,
    limit = 3,
    className 
}: GuestUpcomingEventProps) {
    const [events, setEvents] = useState<EventData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchUpcomingEvents();
    }, [communityId, limit]);

    const fetchUpcomingEvents = async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            // TODO: Replace with actual API call when route is available
            // const response = await fetch(`/api/communities/${communityId}/events/upcoming?limit=${limit}`);
            // if (!response.ok) throw new Error('Failed to fetch upcoming events');
            // const data = await response.json();
            // setEvents(data.data || []);
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // For now, return empty array to show empty state
            setEvents([]);
            
        } catch (err) {
            console.error('Error fetching upcoming events:', err);
            setError('Failed to load upcoming events');
            setEvents([]);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className={`${styles.guestUpcomingEvent} ${className || ''}`}>
                <h2 className={styles.title}>Upcoming Events</h2>
                <div className={styles.loadingContainer}>
                    <p className={styles.loadingText}>Loading events...</p>
                </div>
            </div>
        );
    }

    if (events.length === 0 || error) {
        return (
            <div className={`${styles.guestUpcomingEvent} ${className || ''}`}>
                <h2 className={styles.title}>Upcoming Events</h2>
                
                <div className={styles.emptyState}>
                    <div className={styles.emptyStateIcon}>
                        <Icon name='calendar' size='xxl' color='var(--color-text-light)'/>
                    </div>
                    <p>No Scheduled Events, <br />check back later</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`${styles.guestUpcomingEvent} ${className || ''}`}>
                <h2 className={styles.title}>Upcoming Events</h2>
            
                {/* {events.slice(0, limit).map((event) => (
                    // <EventCard 
                    //     key={event.id}
                    //     event={event}
                    //     variant="upcoming"
                    //     showCommunityName={false} />
                ))} */}
                
                {events.length > limit && (
                    <div className={styles.viewAllContainer}>
                        <button className={styles.viewAllButton}>
                            View All Events ({events.length})
                        </button>
                    </div>
                )}
        </div>
    );
}