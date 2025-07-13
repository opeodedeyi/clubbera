import { IMAGES } from '@/lib/images';
import styles from './NextEventCard.module.css';

interface NextEventCardProps {
    status?: string;
    title?: string;
    imageSrc?: string;
    className?: string;
}

const NextEventCard: React.FC<NextEventCardProps> = ({ 
    status = 'Upcoming',
    title = 'Reservation Status',
    imageSrc,
    className = ''
}) => {
    return (
        <div className={`${styles.nextEvent} ${className}`}>
            <div className={styles.nextEventText}>
                <p className={styles.miniTitleSub}>{status}</p>
                <h5 className={styles.miniTitle}>{title}</h5>
            </div>

            <div className={styles.nextEventImage}>
                <img
                    src={imageSrc || IMAGES.pages.communities.cover}
                    className={styles.eventImageSRC}
                    alt='event-cover-image' />
            </div>
        </div>
    );
};

export default NextEventCard;