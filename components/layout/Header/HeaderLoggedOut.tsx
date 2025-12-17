'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import ClubberaLogo from '@/components/ui/Icon/ClubberaLogo';
import LoggedOutMenu from '../loggedOutMenu/loggedOutMenu';
import SearchBar from '@/components/ui/SearchBar/SearchBar';
import type { HeaderProps } from '@/types/header';
import styles from './Header.module.css';

export default function HeaderLoggedOut({ variant, className = '' }: HeaderProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    // Sync searchbar with URL params when on search page
    useEffect(() => {
        if (pathname === '/search') {
            const queryParam = searchParams.get('q') || '';
            setSearchQuery(queryParam);
        } else {
            setSearchQuery('');
        }
    }, [pathname, searchParams]);

    const config = {
        showSearch: variant?.showSearch ?? true,
        showNotifications: variant?.showNotifications ?? true,
        showNavigation: variant?.showNavigation ?? true,
        ...variant
    }

    const handleSearch = (query: string) => {
        const searchParams = new URLSearchParams({
            q: query,
            type: 'events'
        });
        router.push(`/search?${searchParams.toString()}`);
    }

    return (
        <header className={`${styles.header} ${styles.loggedOut} ${className}`}>
            <div className={styles.containerlo}>
                <div className={styles.left}>
                    <Link href="/" className={styles.logo} style={{outline: 'none'}}>
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
                            onChange={setSearchQuery}
                            onSubmit={handleSearch}/>
                    </div>
                )}

                <LoggedOutMenu />
            </div>
        </header>
    )
}