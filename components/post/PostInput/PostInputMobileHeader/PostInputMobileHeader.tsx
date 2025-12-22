import Button from '@/components/ui/Button/Button';
import Icon from '@/components/ui/Icon/Icon';
import styles from './PostInputMobileHeader.module.css';

interface PostInputMobileHeaderProps {
    onCancel: () => void;
    onSubmit: () => void;
    canSubmit: boolean;
}

export default function PostInputMobileHeader({ onCancel, onSubmit, canSubmit }: PostInputMobileHeaderProps) {
    return (
        <div className={styles.mobileHeader}>
            <button className={styles.cancelButton} onClick={onCancel}>
                <Icon name="arrowLeft" size="xs" color="var(--color-text)" />
            </button>
            <Button
                variant='default'
                size="small"
                onClick={onSubmit}
                disabled={!canSubmit}>
                Post
            </Button>
        </div>
    );
}
