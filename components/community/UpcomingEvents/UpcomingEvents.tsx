'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CommunityData } from '@/lib/api/communities';
import styles from './UpcomingEvents.module.css';
import Icon from '@/components/ui/Icon/Icon';

// to be edited later
interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location?: string;
    attendeesCount: number;
    maxAttendees?: number;
    isUserAttending: boolean;
}

interface UpcomingEventsProps {
    community: CommunityData;
    variant: 'admin' | 'member';
    className?: string;
}

export default function UpcomingEvents({ community, variant, className }: UpcomingEventsProps) {
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const isAdmin = variant === 'admin';

    useEffect(() => {
        // Simulate API call
        const fetchEvents = async () => {
            try {
                setIsLoading(true);
                setError(null);
                
                // TODO: Replace with actual API call
                // const endpoint = isAdmin 
                //     ? `/api/communities/${community.id}/events/admin` 
                //     : `/api/communities/${community.id}/events/upcoming`;
                // const response = await fetch(endpoint);
                // const data = await response.json();
                // setEvents(data.events.slice(0, 3)); // Get at most 3 events
                
                // Simulate loading delay
                await new Promise(resolve => setTimeout(resolve, 800));
                
                // For now, set empty events array
                setEvents([]);
                
            } catch (err) {
                setError('Failed to load events');
                console.error('Error fetching events:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, [community.id, isAdmin]);

    if (isLoading) {
        return (
            <div className={`${styles.upcomingEvents} ${styles[variant]} ${className || ''}`}>
                <div className={styles.loadingContainer}>
                    <p className={styles.loadingText}>Loading events...</p>
                </div>
            </div>
        );
    }

    if (events.length === 0 || error) {
        console.error('No events found or error occurred:', error);
        return (
            <>
                { variant === 'admin' ? (
                    <div className={styles.noEventsAdmin}>
                        <div className={styles.eventsAdminTop}>
                            <h3 className={styles.title}>Events</h3>

                            <Link className={styles.createLink} href={`/community/${community.id}/createevent`}>Create Event</Link>
                        </div>

                        <div className={styles.noEventsAdminMain}>
                            <p className={styles.noEventsAdminText}>No Upcoming Events, click create to begin </p>

                            <div className={styles.AdminImg}></div>
                        </div>
                    </div>
                ) : (
                    <div className={styles.noEventsMember}>
                        <h3 className={styles.title}>Upcoming Events</h3>

                        <div className={styles.noEventsMemberMain}>
                            <div className={styles.noEventsMemberIcon}>
                                <Icon name="calendar" size='lg' />
                            </div>

                            <p className={styles.noEventsAdminText}>No Upcoming Events, click create to begin </p>
                        </div>
                    </div>
                )}
            </>
        );
    }

    // This will be used when we have actual events
    return (
        <>
            { variant === 'admin' ? (
                <div className={styles.eventsAdmin}>
                    <div className={styles.eventsAdminTop}>
                        <h3 className={styles.title}>Events</h3>

                        <Link className={styles.createLink} href={`/community/${community.id}/createevent`}>Create Event</Link>
                    </div>

                    <div className={styles.eventsAdminMain}>
                        <div>
                            {/* normal events for admin members */}
                        </div>

                        <div className={styles.AdminImg}></div>
                    </div>

                    {/* pagination goes here */}
                </div>
            ) : (
                <div className={styles.eventsMember}>
                    <h3 className={styles.title}>Upcoming Events</h3>

                    {/* <div className={styles.eventsMemberMain}>
                        <p className={styles.noEventsAdminText}>No Upcoming Events, click create to begin </p>

                        <div className={styles.AdminImg}></div>
                    </div> */}
                </div>
            )}
        </>
    );
}