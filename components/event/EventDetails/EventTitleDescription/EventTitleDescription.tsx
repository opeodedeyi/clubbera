import styles from './EventTitleDescription.module.css';


interface EventTitleDescriptionProps {
    title: string;
    description: string;
    className?: string;
}

const EventTitleDescription: React.FC<EventTitleDescriptionProps> = ({ 
    title, 
    description, 
    className = '' 
}) => {
    return (
        <div className={`${styles.titleDescription} ${className}`}>
            <h5 className={styles.miniTitle}>{title}</h5>
            <p className={styles.miniDescription}>{description}</p>
        </div>
    );
};

export default EventTitleDescription;