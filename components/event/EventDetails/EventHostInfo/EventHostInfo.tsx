import Icon from '@/components/ui/Icon/Icon';
import Link from 'next/link';
import styles from './EventHostInfo.module.css';


interface EventHostInfoProps {
    title: string;
    url: string;
    className?: string;
}

const EventHostInfo: React.FC<EventHostInfoProps> = ({
    title,
    url,
    className = ''
}) => {
    return (
        <div className={`${styles.container} ${className}`}>
            <h5 className={styles.mainTitle}>Host Information</h5>
            <div className={styles.containerTexts}>
                <div className={styles.textTitle}>
                    <Icon name='globe' size='md' color='var(--color-text-muted)' />
                    <h5 className={styles.miniTitle}>Community</h5>
                </div>

                <Link className={styles.textLink} href={url}>{title}</Link>
            </div>
        </div>
    );
};

export default EventHostInfo;