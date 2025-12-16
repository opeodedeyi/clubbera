"use client";

import { useEffect, useState } from "react";
import CardHeroLayout from "@/components/layout/CardHeroLayout/CardHeroLayout";
import EventsCardFixed from "@/components/cards/event/EventCardFixed/EventsCardFixed";
import EventsCardSkeleton from "@/components/cards/event/EventCardFixed/EventsCardSkeleton";
import { eventApi, type EventSearchResult } from "@/lib/api/events";
import { locationService } from "@/lib/services/locationService";
import styles from "./UpcomingEvents.module.css";

export default function UpcomingEvents() {
    const [events, setEvents] = useState<EventSearchResult[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const location = await locationService.getLocation();
                const response = await eventApi.searchEvents(
                    undefined,
                    4,
                    0,
                    location?.lat,
                    location?.lng
                );
                setEvents(response.data.events);
            } catch (error) {
                console.error("Failed to load events:", error);
            } finally {
                setLoading(false);
            }
        };

        loadEvents();
    }, []);

    return (
        <CardHeroLayout title="Upcoming Events">
            {loading ? (
                <>
                    <EventsCardSkeleton className={styles.card} />
                    <EventsCardSkeleton className={styles.card} />
                    <EventsCardSkeleton className={styles.card} />
                    <EventsCardSkeleton className={styles.card} />
                </>
            ) : (
                events.map((event) => (
                    <EventsCardFixed
                        key={event.id}
                        eventId={event.id}
                        coverImage={event.coverImage?.key}
                        title={event.title}
                        description={event.description}
                        attendeeCount={event.attendeeCount}
                        startingIn={event.startingIn}
                        className={styles.card}/>
                ))
            )}
        </CardHeroLayout>
    );
}