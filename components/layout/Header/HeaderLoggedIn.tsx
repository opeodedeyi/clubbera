'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ActionIcon from '@/components/ui/ActionIcon/ActionIcon';
import SearchBarMobile from '@/components/ui/SearchBar/SearchBarMobile';
import SearchBar from '@/components/ui/SearchBar/SearchBar';
import ClubberaLogo from '@/components/ui/Icon/ClubberaLogo';
import UserMenu from '@/components/layout/UserMenu/UserMenu';
import Icon from '@/components/ui/Icon/Icon';
import BackButtonMobile from '@/components/ui/BackButton/BackButtonMobile';
import CommunityDropdown from '@/components/community/CommunityDropdown/CommunityDropdown';
import ShareModal from '@/components/ui/ShareModal/ShareModal';
import { useNotifications } from '@/lib/hooks/useNotifications';
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
    const [showShareModal, setShowShareModal] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { unreadCount } = useNotifications();
    // Backend automatically joins users to their Socket.IO rooms on connection

    // Sync searchbar with URL params when on search page
    useEffect(() => {
        if (pathname === '/search') {
            const queryParam = searchParams.get('q') || '';
            setSearchQuery(queryParam);
        } else {
            setSearchQuery('');
        }
    }, [pathname, searchParams]);

    const isActive = (href: string, exactMatch = false) => {
        if (exactMatch) {
            return pathname === href
        }
        return pathname.startsWith(href)
    }

    const handleSearch = (query: string) => {
        const urlSearchParams = new URLSearchParams({
            q: query,
            type: 'events'
        });
        router.push(`/search?${urlSearchParams.toString()}`);
    }

    const config = {
        showSearch: variant?.showSearch ?? true,
        showNotifications: variant?.showNotifications ?? true,
        showNavigation: variant?.showNavigation ?? true,
        ...variant
    }

    const isCommunityPage = !!variant?.communityData;
    const isSearchPage = pathname === '/search';

    return (
        <header className={`${styles.header} ${styles.loggedIn} ${className}`}>
            <div className={styles.container}>
                {/* Desktop Content - Always visible on desktop, hidden on mobile for community/search pages */}
                <div className={`${styles.left} ${isCommunityPage ? styles.hideOnMobileCommunity : ''} ${isSearchPage ? styles.hideOnMobileSearch : ''}`}>
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

                {/* Mobile Community Header - Only visible on mobile for community pages */}
                {isCommunityPage && variant.communityData && (
                    <div className={styles.mobileOnly}>
                        <BackButtonMobile />
                    </div>
                )}

                {/* Mobile Search Header - Only visible on mobile for search page */}
                {isSearchPage && (
                    <div className={`${styles.mobileOnly} ${styles.fullWidthMobileSearch}`}>
                        <SearchBarMobile
                            size="small"
                            placeholder="Search events and locations..."
                            value={searchQuery}
                            onChange={setSearchQuery}
                            onSubmit={handleSearch} />
                    </div>
                )}

                <div className={styles.actions}>
                    {/* Desktop Actions */}
                    {config.showSearch && (
                        <div className={`${styles.search} ${isCommunityPage ? styles.hideOnMobileCommunity : ''} ${isSearchPage ? styles.hideOnMobileSearch : ''}`}>
                            <SearchBar
                                size="small"
                                className='desktop-only-flex'
                                placeholder="Search events and locations..."
                                value={searchQuery}
                                onChange={setSearchQuery}
                                onSubmit={handleSearch}/>
                        </div>
                    )}

                    {config.showNotifications && (
                        <div className={`${styles.notificationWrapper} ${isCommunityPage ? styles.hideOnMobileCommunity : ''} ${isSearchPage ? styles.hideOnMobileSearch : ''}`}>
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
                            {unreadCount > 0 && (
                                <span className={styles.notificationDot} />
                            )}
                        </div>
                    )}

                    <div className={`${isCommunityPage ? styles.hideOnMobileCommunity : ''} ${isSearchPage ? styles.hideOnMobileSearch : ''}`}>
                        <UserMenu user={user} />
                    </div>

                    {/* Mobile Community Actions - Only visible on mobile for community pages */}
                    {isCommunityPage && variant.communityData && (
                        <div className={styles.mobileOnly}>
                            <div className={styles.communityMobileActions}>
                                <button
                                    className={styles.communityActionButton}
                                    onClick={() => setShowShareModal(true)}
                                    aria-label="share community">
                                    <Icon name='share' color='var(--color-text-light)' size='sm' />
                                </button>

                                <CommunityDropdown
                                    community={variant.communityData}
                                    trigger={
                                        <button
                                            className={styles.communityActionButton}
                                            aria-label="community options">
                                            <Icon name='verticalEllipsis' color='var(--color-text-light)' size='sm' />
                                        </button>
                                    } />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Share Modal */}
            {isCommunityPage && variant.communityData && (
                <ShareModal
                    type="community"
                    url={typeof window !== 'undefined' ? window.location.href : ''}
                    isOpen={showShareModal}
                    onClose={() => setShowShareModal(false)} />
            )}
        </header>
    )
}