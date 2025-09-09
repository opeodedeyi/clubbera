import Button from '@/components/ui/Button/Button';
import styles from './ManageEventTitle.module.css';

interface Props {
    title: string;
    onClick?: () => void;
    hasUnsavedChanges?: boolean;
    buttonText?: string;
    disabled?: boolean;
    isSticky?: boolean;
}

export default function ManageEventTitle({ title, onClick, buttonText, hasUnsavedChanges, disabled, isSticky=false }: Props) {
    return (
        <div className={`${styles.container} ${isSticky ? styles.sticky : ''}`}>
            <h2>{title}</h2>

            {hasUnsavedChanges && buttonText && (
                <Button
                    variant='event'
                    onClick={onClick}
                    disabled={disabled}>
                    {buttonText}
                </Button>
            )}
        </div>
    );
}