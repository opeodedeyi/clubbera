'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button/Button';
import Icon from '@/components/ui/Icon/Icon';


interface BackButtonProps {
    fallbackUrl?: string
    className?: string
    children?: React.ReactNode
}

export default function BackButton({ 
    fallbackUrl = '/', 
    className = '',
    children 
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
        <Button
            variant='plain'
            className={className}
            onClick={handleBack}
            iconLeft={<Icon name='arrowLeft' size='xs' />}
            aria-label="Go back to previous page">
            {children || 'Back'}
        </Button>
    )
}