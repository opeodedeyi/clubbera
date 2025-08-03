'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/Icon/Icon';
import styles from './BottomNav.module.css';


const loggedInNavItems = [
    { href: '/home', icon: 'home', label: 'Feed' },
    { href: '/communities', icon: 'group', label: 'Discover' },
    { href: '/messages', icon: 'chat', label: 'Messages' },
    { href: '/events', icon: 'calendar', label: 'Events' },
    { href: '/search', icon: 'search', label: 'Explore' },
] as const;

export default function BottomNavLoggedIn() {
    const pathname = usePathname();

    return (
        <nav className={styles.bottomNav}>
            {loggedInNavItems.map((item) => {
                const isActive = pathname === item.href;
                
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`${styles.navItem} ${isActive ? styles.active : ''}`} >
                        <Icon name={item.icon} size="lg" />
                    </Link>
                );
            })}
        </nav>
    );
}