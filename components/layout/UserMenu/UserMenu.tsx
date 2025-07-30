'use client'

import { useState, useRef, useEffect } from 'react';
import { IMAGES } from '@/lib/images';
import Icon from '@/components/ui/Icon/Icon';
import BrandIcon from '@/components/ui/Icon/BrandIcon';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import type { User } from '@/types/header';
import styles from './UserMenu.module.css';


interface UserMenuProps {
    user: User
    className?: string
}

export default function UserMenu({ className = '' }: UserMenuProps) {
    const [isOpen, setIsOpen] = useState(false)
    const { user, logout } = useAuth()
    const menuRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                menuRef.current && 
                buttonRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
            // Prevent body scroll on mobile when menu is open
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    // Close menu on escape key
    useEffect(() => {
        function handleEscape(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
        }
    }, [isOpen])

    const handleToggle = () => {
        setIsOpen(!isOpen)
    }

    const handleLogout = () => {
        logout()
        setIsOpen(false)
    }

    const closeMenu = () => {
        setIsOpen(false)
    }

    return (
        <div className={`${styles.userMenu} ${className}`}>
            <button
                ref={buttonRef}
                onClick={handleToggle}
                className={styles.trigger}
                aria-label="User menu"
                aria-expanded={isOpen} >
                <img
                    src={
                        // user.profileImage?.key || 
                        IMAGES.placeholders.avatar
                    }
                    alt='User Avatar'
                    className={styles.avatar} />
            </button>

            {isOpen && <div className={styles.backdrop} onClick={closeMenu} />}

            <div 
                ref={menuRef}
                className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
                <div className='tablet-mobile'>
                    <BrandIcon 
                        name='clubbera'
                        size='xxl'/>
                </div>
                

                <nav className={styles.menuItems}>
                    <Link 
                        href="/manage/account" 
                        className={`${styles.menuItem} desktop-only-flex`}
                        onClick={closeMenu}>
                        <Icon 
                            name="editProfile"
                            size='sm'
                            color='var(--color-text)'/>
                        <span>Manage Account</span>
                    </Link>

                    <div
                        className={`${styles.menuItemBtn} tablet-mobile-flex`}
                        onClick={closeMenu}>
                        <Icon 
                            name="editProfile"
                            size='sm'
                            color='var(--color-text)'/>
                        <span>Manage Account</span>
                        <Icon 
                            name="arrowDown"
                            size='xxs'
                            color='var(--color-text)'/>
                    </div>
                    
                    <Link
                        href={`/profile/${user.uniqueUrl}`} 
                        className={styles.menuItem}
                        onClick={closeMenu}>
                        <Icon
                            name="profile"
                            size='sm'
                            color='var(--color-text)'/>
                        <span>View Profile</span>
                    </Link>
                    
                    <Link 
                        href="/help" 
                        className={styles.menuItem}
                        onClick={closeMenu}>
                        <Icon
                            name="help"
                            size='sm'
                            fillColor="var(--color-text)" 
                            strokeColor="var(--color-background-light)" />
                        <span>Help & Support</span>
                    </Link>

                    <div
                        className={styles.menuItem}
                        onClick={handleLogout}>
                        <Icon
                            name="signout"
                            size='sm'
                            fillColor="var(--color-text)" 
                            strokeColor="var(--color-background-light)" />
                        <span>Sign Out</span>
                    </div>
                </nav>
            </div>
        </div>
    )
}