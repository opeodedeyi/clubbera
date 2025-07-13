import Button from "@/components/ui/Button/Button";
import styles from './EventButtons.module.css';


interface EventButtonsProps {
    onShare?: () => void;
    manageURL?: string;
    supportURL?: string
    showManage?: boolean;
    showGetSupport?: boolean;
    className?: string;
}

const EventButtons: React.FC<EventButtonsProps> = ({ 
    onShare,
    manageURL,
    supportURL,
    showManage = true,
    showGetSupport = false,
    className = ''
}) => {
    return (
        <div className={`${styles.contentButtons} ${className}`}>
            <Button variant='plain' onClick={onShare}>Share</Button>
            {showManage && (
                <Button as='link' variant='gray' href={manageURL}>Manage Event</Button>
            )}
            {showGetSupport && (
                <Button variant='gray' href={supportURL}>Get Support</Button>
            )}
        </div>
    );
};

export default EventButtons;