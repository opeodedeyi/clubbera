'use client';

import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/Icon/Icon';
import styles from './BackButton.module.css';


interface BackButtonProps {
    fallbackUrl?: string
    className?: string
}

export default function BackButtonMobile({ 
    fallbackUrl = '/', 
    className = '',
}: BackButtonProps) {
    const router = useRouter()

    const handleBack = () => {
        // Check if there's history to go back to
        if (window.history.length > 1) {
            router.back()
        } else {
            router.push(fallbackUrl)
        }
    }

    return (
        <button
            className={`${className} ${styles.backButtonMobile}`}
            onClick={handleBack}
            aria-label="Go back to previous page">
            <Icon name='arrowLeft' size='xs' />
        </button>
    )
}