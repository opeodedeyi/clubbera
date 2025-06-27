'use client'

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ActionIcon from '@/components/ui/ActionIcon/ActionIcon';
import SearchBar from '@/components/ui/SearchBar/SearchBar';
import ClubberaLogo from '@/components/ui/Icon/ClubberaLogo';
import UserMenu from '@/components/layout/UserMenu/UserMenu';
import type { HeaderProps, User } from '@/types/header';
import styles from './Header.module.css';

interface HeaderLoggedInProps extends HeaderProps {
    user: User
}

interface NavItem {
    href: string
    label: string
    exactMatch?: boolean
}

const navItems: NavItem[] = [
    { href: '/communities', label: 'Communities' },
    { href: '/messages', label: 'Messages' },
    { href: '/events', label: 'Events' },
]

export default function HeaderLoggedIn({ user, variant, className = '' }: HeaderLoggedInProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const pathname = usePathname()

    const isActive = (href: string, exactMatch = false) => {
        if (exactMatch) {
            return pathname === href
        }
        return pathname.startsWith(href)
    }

    const config = {
        showSearch: variant?.showSearch ?? true,
        showNotifications: variant?.showNotifications ?? true,
        showNavigation: variant?.showNavigation ?? true,
        ...variant
    }

    return (
        <header className={`${styles.header} ${styles.loggedIn} ${className}`}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <Link href="/home" className={styles.logo}>
                        <ClubberaLogo variant="custom" textColor="var(--color-text)" />
                    </Link>

                    {config.showNavigation && (
                        <nav className={`${styles.nav} desktop-only-flex`}>
                            {navItems.map(({ href, label, exactMatch }) => {
                                return (
                                    <Link
                                        key={href}
                                        href={href}
                                        className={`${styles.navLink} ${isActive(href, exactMatch) ? styles.active : ''}`}>
                                        {label}
                                    </Link>
                                );
                            })}
                        </nav>
                    )}
                </div>

                <div className={styles.actions}>
                    {config.showSearch && (
                        <div className={styles.search}>
                            <SearchBar
                                size="small"
                                className='desktop-only-flex'
                                placeholder="Events, Communities, People"
                                value={searchQuery}
                                onChange={setSearchQuery}/>
                        </div>
                    )}

                    {config.showNotifications && (
                        <ActionIcon
                            as="link"
                            href="/notifications"
                            icon={{
                                name: 'notification',
                                size: 'cHeader',
                                hover: 'opacity',
                                color: 'var(--color-icon-header)'
                            }}
                            className={styles.actionIcon}
                            aria-label="Notifications" />
                    )}

                    <UserMenu user={user} />
                </div>
            </div>
        </header>
    )
}