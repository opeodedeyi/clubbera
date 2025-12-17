'use client';

import Link from 'next/link';
import { IMAGES } from '@/lib/images';
import Icon from '@/components/ui/Icon/Icon';
import styles from './EventCard.module.css';
import { getS3ImageUrl } from '@/lib/s3Utils';

interface EventCardProps {
    eventId: number;
    coverImage?: string;
    title?: string;
    description?: string;
    attendeeCount?: number;
    startingIn?: string;
    className?: string;
}

export default function EventCard({
    eventId,
    coverImage,
    title = "No Title",
    description = "No Description",
    attendeeCount,
    startingIn = "Hh:Mm",
    className
}: EventCardProps) {
    const cardContent = (
        <div className={styles.container}>
            <div className={styles.containerImage}>
                <img
                    src={getS3ImageUrl(coverImage) || IMAGES.pages.communities.cover}
                    alt={`${title} event cover`}/>
            </div>

            <div className={styles.containerBody}>
                <div className={styles.spaceBetween}>
                    <div className={styles.containerBodyRow}>
                        <Icon name="calendar" size='md' color='var(--color-event)'/>
                        <p className={styles.containerBodyTime}>{`Starting in ${startingIn}`}</p>
                    </div>

                    <div className={styles.containerBodyRow}>
                        <Icon name="group" size='md' color='var(--color-text)'/>
                        <span>{attendeeCount || 0}</span>
                    </div>
                </div>

                <div className={styles.containerBodyText}>
                    <h3 className={styles.containerBodyTitle}>{title}</h3>
                    <p className={styles.containerBodyDescription}>{description}</p>
                </div>
            </div>
        </div>
    );

    if (eventId > 0) {
        return (
            <Link href={`/event/${eventId}`} className={`${styles.cardLink} ${className || ''}`}>
                {cardContent}
            </Link>
        );
    }

    return <div className={className}>{cardContent}</div>;
}
