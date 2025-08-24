import Icon from '@/components/ui/Icon/Icon';
import styles from './TimingInfo.module.css';


interface TimingInfoProps {
    time?: string;
    attendees?: number;
    address?: string;
    calendarMonth?: string;
    calendarDay?: string;
    className?: string;
}

const TimingInfo: React.FC<TimingInfoProps> = ({ 
    time,
    attendees = 0,
    address,
    calendarMonth = 'Month', 
    calendarDay = '##',
    className = ''
}) => {
    return (
        <div className={`${styles.timingInfo} ${className}`}>
            <div className={styles.timingTexts}>
                <div className={styles.timingItem}>
                    <Icon name='clock' size='md' color='var(--color-event)' />
                    <p>{time}</p>
                </div>

                <div className={styles.timingItem}>
                    <Icon name='group' size='md' color='var(--color-event)' />
                    <p>{attendees} Registered</p>
                </div>

                <div className={styles.timingItem}>
                    <Icon name='locationMark' size='md' color='var(--color-event)' />
                    <p>{address}</p>
                </div>
            </div>

            <div className={styles.calendar}>
                <div className={styles.calendarMonth}>
                    <h5 className={styles.calendarMonthText}>{calendarMonth}</h5>
                </div>
                <div className={styles.calendarDay}>
                    <p className={styles.calendarDayText}>{calendarDay}</p>
                </div>
            </div>
        </div>
    );
};

export default TimingInfo;