'use client';

import Link from 'next/link';
import Icon from '@/components/ui/Icon/Icon';
import { useState, useRef, useEffect } from 'react';
import { communityApi } from '@/lib/api/communities';
import { useRouter } from 'next/navigation';
import { CommunityData } from '@/lib/api/communities';
import OverlayPortal from '@/components/ui/OverlayPortal/OverlayPortal';
import styles from './CommunityDropdown.module.css';

interface CommunityDropdownProps {
    community: CommunityData;
    className?: string;
    trigger?: React.ReactNode;
}

export default function CommunityDropdown({ community, className = '', trigger }: CommunityDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const router = useRouter()
    const [isLeaving, setIsLeaving] = useState(false)
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

    const handleLeaveCommunity = async () => {
        if (isLeaving) return
        
        const confirmLeave = confirm('Are you sure you want to leave this community? This action cannot be undone.')
        if (!confirmLeave) return

        try {
            setIsLeaving(true)
            await communityApi.leaveCommunity(community.id)
            router.refresh()
        } catch (error) {
            console.error('Error leaving community:', error)
            alert('Failed to leave community. Please try again.')
        } finally {
            setIsLeaving(false)
            setIsOpen(false)
        }
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const currentTrigger = trigger ? triggerRef.current : buttonRef.current;
            if (
                menuRef.current &&
                currentTrigger &&
                !menuRef.current.contains(event.target as Node) &&
                !currentTrigger.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        function handleEscape(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen]);

    const handleToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isOpen) {
            const currentTrigger = trigger ? triggerRef.current : buttonRef.current;
            if (currentTrigger) {
                const rect = currentTrigger.getBoundingClientRect();
                setMenuPosition({
                    top: rect.bottom + window.scrollY + 8,
                    left: rect.right + window.scrollX - 200
                });
            }
        }

        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <div className={`${styles.dropdown} ${className}`}>
            {trigger ? (
                <div
                    ref={triggerRef}
                    onClick={handleToggle}
                    style={{ cursor: 'pointer' }}
                    aria-label="Community options"
                    aria-expanded={isOpen}>
                    {trigger}
                </div>
            ) : (
                <button
                    ref={buttonRef}
                    onClick={handleToggle}
                    className={styles.trigger}
                    aria-label="Community options"
                    aria-expanded={isOpen}>
                    <Icon name='verticalEllipsis' color='var(--color-text-light)' size='sm' />
                </button>
            )}

            {isOpen && (
                <OverlayPortal>
                    <div className={styles.backdrop} onClick={closeMenu} />
                    <div
                        ref={menuRef}
                        className={`${styles.menu} ${styles.menuPortal} ${isOpen ? styles.open : ''}`}
                        style={{
                            position: 'absolute',
                            top: menuPosition.top,
                            left: menuPosition.left
                        }}>
                        <nav className={styles.menuItems}>
                            <Link
                                href={`/community/${community.uniqueUrl}/members`}
                                className={styles.menuItem}
                                onClick={closeMenu}>
                                <Icon
                                    name="group"
                                    size='sm'
                                    color='var(--color-text)'/>
                                <span>Members</span>
                            </Link>

                            <Link
                                href={`/community/${community.uniqueUrl}/events`}
                                className={styles.menuItem}
                                onClick={closeMenu}>
                                <Icon
                                    name="calendar"
                                    size='sm'
                                    color='var(--color-text)'/>
                                <span>Events</span>
                            </Link>

                            <div
                                className={`${styles.menuItem} ${styles.destructive}`}
                                onClick={handleLeaveCommunity}>
                                <Icon
                                    name="leave"
                                    size='sm'
                                    color="var(--color-danger)" />
                                <span>{isLeaving ? 'Leaving...' : 'Leave Community'}</span>
                            </div>
                        </nav>
                    </div>
                </OverlayPortal>
            )}
        </div>
    );
}