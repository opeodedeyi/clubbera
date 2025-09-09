'use client';

import Link from 'next/link';
import Icon from '@/components/ui/Icon/Icon';
import { usePathname } from 'next/navigation';
import { CommunityPermissions } from '@/lib/api/communities';
import styles from './MENavigation.module.css';


interface MainNavigationProps {
    eventId?: number;
    permissions?: CommunityPermissions;
}

export default function MENavigation({ eventId, permissions }: MainNavigationProps) {
    const pathname = usePathname()

    return (
        <nav className={`${styles.navigation} self-start desktop-only-flex`}>
            <Link
                href={`/event/${eventId}/manage`}
                className={`${styles.navigationItem} ${pathname === `/event/${eventId}/manage` ? styles.active : ''}`}>
                <Icon
                    name="globe"
                    size='sm'
                    color='var(--color-text)'/>
                <span>Manage Event</span>
            </Link>

            {/* manage attendees */}

            {/* manage waitlist */}

            <Link
                href={`/event/${eventId}/manage/analytics`}
                className={`${styles.navigationItem} ${pathname === `/event/${eventId}/manage/analytics` ? styles.active : ''}`}>
                <Icon
                    name="megaphone"
                    size='sm'
                    color='var(--color-text)'/>
                <span>Analytics & Insights</span>
            </Link>
        </nav>
    );
}