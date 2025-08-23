import Button from '@/components/ui/Button/Button';
import styles from './EditCommunityTitle.module.css';

interface Props {
    title: string;
    description?: string;
    onClick?: () => void;
    hasUnsavedChanges?: boolean;
    buttonText?: string;
    disabled?: boolean;
    isSticky?: boolean;
}

export default function EditCommunityTitle({ title, description, onClick, buttonText, hasUnsavedChanges, disabled, isSticky=false }: Props) {
    return (
        <div className={`${styles.container} ${isSticky ? styles.sticky : ''}`}>
            <div className={styles.containerText}>
                <p className={styles.sectionDescription}>{description}</p>
                <h2>{title}</h2>
            </div>

            {hasUnsavedChanges && buttonText && (
                <Button
                    variant='community'
                    onClick={onClick}
                    disabled={disabled}>
                    {buttonText}
                </Button>
            )}
        </div>
    );
}