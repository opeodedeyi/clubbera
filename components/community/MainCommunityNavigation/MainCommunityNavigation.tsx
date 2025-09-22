'use client';

import Link from 'next/link';
import Icon from '@/components/ui/Icon/Icon';
import { usePathname, useRouter } from 'next/navigation';
import { communityApi } from '@/lib/api/communities';
import { useState } from 'react';
import styles from './MainCommunityNavigation.module.css';


interface MainNavigationProps {
    communityURL: string;
    communityId: number;
    isAdmin: boolean;
}

export default function MainCommunityNavigation({ communityURL, communityId, isAdmin }: MainNavigationProps) {
    const pathname = usePathname()
    const router = useRouter()
    const [isLeaving, setIsLeaving] = useState(false)

    const handleLeaveCommunity = async () => {
        if (isLeaving) return
        
        const confirmLeave = confirm('Are you sure you want to leave this community? This action cannot be undone.')
        if (!confirmLeave) return

        try {
            setIsLeaving(true)
            await communityApi.leaveCommunity(communityId)
            router.refresh()
        } catch (error) {
            console.error('Error leaving community:', error)
            alert('Failed to leave community. Please try again.')
        } finally {
            setIsLeaving(false)
        }
    }

    return (
        <nav className={`${styles.navigation} self-start desktop-only-flex`}>
            <Link
                href={`/community/${communityURL}/members`}
                className={`${styles.navigationItem} ${pathname === `/community/${communityURL}/members` ? styles.active : ''}`}>
                <Icon
                    name="group"
                    size='sm'
                    color='var(--color-text)'/>
                <span>Members</span>
            </Link>

            <Link
                href={`/community/${communityURL}/events`}
                className={`${styles.navigationItem} ${pathname === `/community/${communityURL}/events` ? styles.active : ''}`}>
                <Icon
                    name="calendar"
                    size='sm'
                    color='var(--color-text)'/>
                <span>Events</span>
            </Link>

            {!isAdmin && (
                <button
                    onClick={handleLeaveCommunity}
                    disabled={isLeaving}
                    className={styles.navigationItemExit}>
                    <Icon
                        name="leave"
                        size='md'
                        color='var(--color-danger)' />
                    <span>{isLeaving ? 'Leaving...' : 'Leave Community'}</span>
                </button>
            )}
        </nav>
    );
}