'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/Icon/Icon';
import { IMAGES } from '@/lib/images';
import { CommunityData } from '@/lib/api/communities';
import { eventApi, EventSearchResult } from '@/lib/api/events';
import { getS3ImageUrl } from '@/lib/s3Utils';
import { formatSmartDateWithTimezone } from '@/lib/utils/timezoneFormatter';
import UpcomingEventsSkeleton from './UpcomingEventsSkeleton';
import styles from './UpcomingEvents.module.css';

interface UpcomingEventsProps {
    community: CommunityData;
    variant: 'admin' | 'member';
    className?: string;
}

export default function UpcomingEvents({ community, variant, className }: UpcomingEventsProps) {
    const [events, setEvents] = useState<EventSearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setIsLoading(true);
                setError(null);
                
                // Fetch 1 upcoming event for the community
                const response = await eventApi.getCommunityEvents(
                    community.id,
                    1, // page
                    1, // limit - get only 1 event
                    { upcoming: true, pastEvents: false } // filters - only upcoming events
                );
                
                // Handle the actual response structure: {events: Array, pagination: {...}}
                console.log('API response:', response);
                // Handle both possible response structures
                const responseData = response.data as EventSearchResult[] | {events: EventSearchResult[]};
                const eventsData = (responseData as {events: EventSearchResult[]})?.events || (responseData as EventSearchResult[]) || [];
                console.log('Events data from API:', eventsData);
                setEvents(eventsData);
                
            } catch (err) {
                setError('Failed to load events');
                console.error('Error fetching events:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, [community.id]);

    if (isLoading) {
        return <UpcomingEventsSkeleton variant={variant} className={className} />;
    }

    if (error) {
        return (
            <>
                { variant === 'admin' ? (
                    <div className={styles.noEventsAdmin}>
                        <div className={styles.eventsAdminTop}>
                            <h3 className={styles.title}>Events</h3>

                            <Link className={styles.createLink} href={`/community/${community.id}/createevent`}>Create Event</Link>
                        </div>

                        <div className={styles.noEventsAdminMain}>
                            <p className={styles.noEventsAdminText}>Failed to load events</p>

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

                            <p className={styles.noEventsAdminText}>Failed to load events</p>
                        </div>
                    </div>
                )}
            </>
        );
    }

    if (!Array.isArray(events) || events.length === 0) {
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

                            <div className={styles.AdminNoImg}></div>
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

                    <Link href={`/event/${events[0].id}`} className={styles.eventlink}>
                        <div className={styles.eventsAdminMain}>
                            <div>
                                {events.length > 0 && (
                                    <div className={styles.eventAdminItem}>
                                        <div className={styles.eventAdminDnT}>
                                            <p>{formatSmartDateWithTimezone(events[0].startTime, events[0].timezone)}</p>
                                            <p><Icon name='group' color='var(--color-event)'/> {events[0].currentAttendees}</p>
                                        </div>
                                        <h4>{events[0].title}</h4>
                                    </div>
                                )}
                            </div>

                            <div className={styles.AdminImg}>
                                {events.length > 0 && (
                                    <img 
                                        src={getS3ImageUrl(events[0].coverImage?.key) || IMAGES.pages.communities.cover}
                                        alt={events[0].coverImage?.altText || `Cover image for ${events[0].title}`} />
                                )}
                            </div>
                        </div>
                    </Link>

                    {/* pagination goes here */}
                </div>
            ) : (
                <div className={styles.eventsMember}>
                    <h3 className={styles.title}>Upcoming Events</h3>

                    {Array.isArray(events) && events.length > 0 && events[0] && (
                        <Link href={`/event/${events[0].id}`} className={styles.eventlink}>
                        <div className={styles.eventsMemberMain}>
                            <div className={styles.memberImg}>
                                {events.length > 0 && (
                                    <img 
                                        src={getS3ImageUrl(events[0]?.coverImage?.key) || IMAGES.pages.communities.cover}
                                        alt={events[0]?.coverImage?.altText || `Cover image for ${events[0].title}`} />
                                )}
                            </div>

                            <div className={styles.memberBody}>
                                <div className={styles.sameLine}>
                                    <Icon name='calendar' className='desktop-only-flex' color='var(--color-event)' />
                                    <p className={styles.memberStartingIn}>Starting {formatSmartDateWithTimezone(events[0]?.startTime, events[0]?.timezone)}</p>
                                </div>

                                <div className={styles.memberBodyText}>
                                    <h4>{events[0]?.title}</h4>
                                    <p>{events[0]?.description}</p>
                                </div>

                                <div className={`${styles.sameLine} ${styles.attendees}`}>
                                    <Icon name='group' size='sm' color='var(--color-gray)' />
                                    <p>{events[0]?.attendeeCount} <span>Attendees</span></p>
                                </div>
                            </div>
                        </div>
                        </Link>
                    )}

                    {(!Array.isArray(events) || events.length === 0) && !isLoading && (
                        <p className={styles.noEvents}>No upcoming events</p>
                    )}
                </div>
            )}
        </>
    );
}
