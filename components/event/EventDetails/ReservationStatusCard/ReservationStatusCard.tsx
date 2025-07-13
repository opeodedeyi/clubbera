// components/event/ReservationStatusCard/ReservationStatusCard.tsx
import Button from "@/components/ui/Button/Button";
import styles from './ReservationStatusCard.module.css';

interface ReservationStatusCardProps {
    title?: string;
    buttonText?: string;
    onUpdateRSVP?: () => void;
    isLoading?: boolean;
    className?: string;
}

const ReservationStatusCard: React.FC<ReservationStatusCardProps> = ({ 
    title = 'Reservation Status',
    buttonText = 'Update RSVP',
    onUpdateRSVP,
    isLoading = false,
    className = ''
}) => {
    return (
        <div className={`${styles.reservationStatus} ${className}`}>
            <h5 className={styles.miniTitle}>{title}</h5>
            <Button 
                variant='plain' 
                onClick={onUpdateRSVP}
                disabled={isLoading} >
                {isLoading ? 'Updating...' : buttonText}
            </Button>
        </div>
    );
};

export default ReservationStatusCard;