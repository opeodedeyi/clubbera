'use client';

import { IMAGES } from '@/lib/images';
import Link from 'next/link';
import styles from './EventsCard.module.css';
import { getS3ImageUrl } from '@/lib/s3Utils';

interface EventsCardProps {
    eventId: number;
    coverImage?: string;
    title?: string;
    startTime?: string;
    guestCount?: number;
}

export default function EventsCard({
    eventId,
    coverImage,
    title = "No Title",
    startTime = "Hh:Mm"
}: EventsCardProps) {
    const cardContent = (
        <div className={styles.container}>
            <div className={styles.containerBody}>
                <p className={styles.containerBodyTime}>{startTime}</p>
                <h3 className={styles.containerBodyTitle}>{title}</h3>
            </div>

            <div className={styles.containerImage}>
                <img
                    src={getS3ImageUrl(coverImage) || IMAGES.pages.communities.cover}
                    alt={`${title} event cover`}/>
            </div>
        </div>
    );

    if (eventId > 0) {
        return (
            <Link href={`/event/${eventId}`} className={styles.cardLink}>
                {cardContent}
            </Link>
        );
    }

    return cardContent;
}