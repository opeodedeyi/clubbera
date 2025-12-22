'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/Icon/Icon';
import styles from './BottomNav.module.css';

type NavLinkItem = {
    type: 'link';
    href: string;
    icon: 'home' | 'search' | 'calendar' | 'chat';
    label: string;
};

type NavButtonItem = {
    type: 'button';
    icon: 'createPost';
    label: string;
    action: 'openCreatePost';
};

type NavItem = NavLinkItem | NavButtonItem;

const loggedInNavItems: NavItem[] = [
    { type: 'link', href: '/home', icon: 'home', label: 'Feed' },
    { type: 'link', href: '/search', icon: 'search', label: 'Explore' },
    { type: 'button', icon: 'createPost', label: 'Create', action: 'openCreatePost' },
    { type: 'link', href: '/events', icon: 'calendar', label: 'Events' },
    { type: 'link', href: '/messages', icon: 'chat', label: 'Messages' },
];

interface BottomNavLoggedInProps {
    openCreatePost?: () => void;
}

export default function BottomNavLoggedIn({ openCreatePost }: BottomNavLoggedInProps) {
    const pathname = usePathname();

    return (
        <nav className={styles.bottomNav}>
            {loggedInNavItems.map((item, index) => {
                if (item.type === 'button') {
                    return (
                        <button
                            key={`${item.action}-${index}`}
                            onClick={openCreatePost}
                            className={styles.navItem}
                            aria-label={item.label}>
                            <Icon name={item.icon} size="lg" />
                        </button>
                    );
                }

                const isActive = pathname === item.href;

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`${styles.navItem} ${isActive ? styles.active : ''}`}>
                        <Icon name={item.icon} size="lg" />
                    </Link>
                );
            })}
        </nav>
    );
}