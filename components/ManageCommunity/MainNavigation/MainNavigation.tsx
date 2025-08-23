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

    return (
        <nav className={`${styles.navigation} self-start desktop-only-flex`}>
            {permissions?.canEditCommunity && (
                <Link
                    href={`/community/${communityId}/manage`}
                    className={`${styles.navigationItem} ${pathname === `/community/${communityId}/manage` ? styles.active : ''}`}>
                    <Icon
                        name="globe"
                        size='sm'
                        color='var(--color-text)'/>
                    <span>Community Overview</span>
                </Link>
            )}

            {permissions?.canViewAnalytics && (
                <Link
                    href={`/community/${communityId}/manage/analytics`}
                    className={`${styles.navigationItem} ${pathname === `/community/${communityId}/manage/analytics` ? styles.active : ''}`}>
                    <Icon
                        name="megaphone"
                        size='sm'
                        color='var(--color-text)'/>
                    <span>Analytics & Insights</span>
                </Link>
            )}

            {permissions?.canManageMembers && (
                <Link
                    href={`/community/${communityId}/manage/members`}
                    className={`${styles.navigationItem} ${pathname === `/community/${communityId}/manage/members` ? styles.active : ''}`}>
                    <Icon
                        name="group"
                        size='md'
                        color='var(--color-text)' />
                    <span>Members</span>
                </Link>
            )}
        </nav>
    );
}