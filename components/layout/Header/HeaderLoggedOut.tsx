'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import ClubberaLogo from '@/components/ui/Icon/ClubberaLogo';
import LoggedOutMenu from '../loggedOutMenu/loggedOutMenu';
import SearchBarMobile from '@/components/ui/SearchBar/SearchBarMobile';
import SearchBar from '@/components/ui/SearchBar/SearchBar';
import type { HeaderProps } from '@/types/header';
import styles from './Header.module.css';

export default function HeaderLoggedOut({ className = '' }: HeaderProps) {
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

    const isSearchPage = pathname === '/search';
    const isHelpPage = pathname.startsWith('/help');

    const showSearch = !isHelpPage;

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
                <div className={`${styles.left} ${isSearchPage ? styles.hideOnMobileSearch : ''}`}>
                    <Link href="/" className={styles.logo} style={{outline: 'none'}}>
                        <ClubberaLogo variant="custom" textColor="var(--color-text)" />
                    </Link>
                </div>

                {/* Mobile Search Header - Only visible on mobile for search page */}
                {isSearchPage && (
                    <div className={`${styles.mobileOnly} ${styles.fullWidthMobileSearch}`}>
                        <SearchBarMobile
                            size="custom"
                            placeholder="Search events and locations..."
                            value={searchQuery}
                            onChange={setSearchQuery}
                            onSubmit={handleSearch} />
                    </div>
                )}

                {showSearch && (
                    <div className={`${styles.search} ${isSearchPage ? styles.hideOnMobileSearch : ''}`}>
                        <SearchBar
                            size="small"
                            className='desktop-only-flex'
                            placeholder="Search events and locations..."
                            value={searchQuery}
                            onChange={setSearchQuery}
                            onSubmit={handleSearch}/>
                    </div>
                )}

                <div className={`${isSearchPage ? styles.hideOnMobileSearch : ''}`}>
                    <LoggedOutMenu />
                </div>
            </div>
        </header>
    )
}