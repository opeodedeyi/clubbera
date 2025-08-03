'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/Icon/Icon';
import styles from './BottomNav.module.css';

const loggedOutNavItems = [
    { href: '/', icon: 'home', label: 'Home' },
    { href: '/search', icon: 'search', label: 'Discover' },
    { href: '/login', icon: 'profile', label: 'Login' },
] as const;

export default function BottomNavLoggedOut() {
    const pathname = usePathname();

    return (
        <nav className={styles.bottomNav}>
            {loggedOutNavItems.map((item) => {
                const isActive = pathname === item.href;
                
                return (
                    <Link 
                        key={item.href}
                        href={item.href} 
                        className={`${styles.navItem} ${isActive ? styles.active : ''}`}>
                        <Icon name={item.icon} size="md" />
                    </Link>
                );
            })}
        </nav>
    );
}