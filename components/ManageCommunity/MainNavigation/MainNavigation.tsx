'use client';

import Link from 'next/link';
import Icon from '@/components/ui/Icon/Icon';
import { usePathname } from 'next/navigation';
import { CommunityPermissions } from '@/lib/api/communities';
import styles from './MainNavigation.module.css';


interface MainNavigationProps {
    communityId?: number;
    permissions?: CommunityPermissions;
}

export default function MainNavigation({ communityId, permissions }: MainNavigationProps) {
    const pathname = usePathname()

    console.log(permissions);

    return (
        <nav className={`${styles.navigation} self-start desktop-only-flex`}>
            <Link
                href={`/community/${communityId}/manage`}
                className={`${styles.navigationItem} ${pathname === `/community/${communityId}/manage` ? styles.active : ''}`}>
                <Icon
                    name="globe"
                    size='sm'
                    color='var(--color-text)'/>
                <span>Community Overview</span>
            </Link>

            <Link
                href={`/community/${communityId}/analytics`}
                className={`${styles.navigationItem} ${pathname === `/community/${communityId}/analytics` ? styles.active : ''}`}>
                <Icon
                    name="megaphone"
                    size='sm'
                    color='var(--color-text)'/>
                <span>Analytics & Insights</span>
            </Link>

            <Link
                href={`/community/${communityId}/members`}
                className={`${styles.navigationItem} ${pathname === `/community/${communityId}/members` ? styles.active : ''}`}>
                <Icon
                    name="group"
                    size='md'
                    color='var(--color-text)' />
                <span>Members</span>
            </Link>
        </nav>
    );
}