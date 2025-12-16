'use client'

import Link from 'next/link';
import { useState } from 'react';
import ClubberaLogo from '@/components/ui/Icon/ClubberaLogo';
import LoggedOutMenu from '../loggedOutMenu/loggedOutMenu';
import SearchBar from '@/components/ui/SearchBar/SearchBar';
import type { HeaderProps } from '@/types/header';
import styles from './Header.module.css';

export default function HeaderLoggedOut({ variant, className = '' }: HeaderProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const config = {
        showSearch: variant?.showSearch ?? true,
        showNotifications: variant?.showNotifications ?? true,
        showNavigation: variant?.showNavigation ?? true,
        ...variant
    }

    return (
        <header className={`${styles.header} ${styles.loggedOut} ${className}`}>
            <div className={styles.containerlo}>
                <div className={styles.left}>
                    <Link href="/" className={styles.logo}>
                        <ClubberaLogo variant="custom" textColor="var(--color-text)" />
                    </Link>
                </div>

                {config.showSearch && (
                    <div className={`${styles.search}`}>
                        <SearchBar
                            size="small"
                            className='desktop-only-flex'
                            placeholder="Search events and locations..."
                            value={searchQuery}
                            onChange={setSearchQuery}/>
                    </div>
                )}

                <LoggedOutMenu />
            </div>
        </header>
    )
}