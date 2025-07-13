import { IMAGES } from '@/lib/images';
import styles from './EventImage.module.css';

interface EventImageProps {
    src?: string;
    alt?: string;
    className?: string;
}

const EventImage: React.FC<EventImageProps> = ({ 
    src, 
    alt = 'event-cover-image', 
    className = '' 
}) => {
    return (
        <div className={`${styles.eventImage} ${className}`}>
            <img
                src={src || IMAGES.pages.communities.cover}
                className={styles.eventImageSRC}
                alt={alt}/>
        </div>
    );
};

export default EventImage;