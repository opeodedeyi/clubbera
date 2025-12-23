'use client'

import { useState, useRef, useEffect } from 'react';
import { getS3ImageUrl } from '@/lib/s3Utils';
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
    const [isExpandedMenuOpen, setIsExpandedMenuOpen] = useState(false)
    const { user, logout } = useAuth()
    const menuRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                menuRef.current && 
                buttonRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false)
                setIsExpandedMenuOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    useEffect(() => {
        function handleEscape(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setIsOpen(false)
                setIsExpandedMenuOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
        }
    }, [isOpen])

    const handleToggle = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsOpen(!isOpen)
    }

    const handleLogout = () => {
        logout()
        setIsOpen(false)
    }

    const closeMenu = () => {
        setIsOpen(false)
        setIsExpandedMenuOpen(false)
    }

    const toggleExpandedMenu = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsExpandedMenuOpen(!isExpandedMenuOpen)
    }

    return (
        <div className={`${styles.userMenu} ${className}`}>
            <button
                ref={buttonRef}
                onClick={handleToggle}
                onTouchStart={(e) => e.stopPropagation()}
                className={styles.trigger}
                aria-label="User menu"
                aria-expanded={isOpen} >
                <img
                    src={
                        user.profileImage?.provider == "aws-s3" ?
                        getS3ImageUrl(user.profileImage?.key) :
                        user.profileImage?.key || 
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

                    <div className={`${styles.expandableSection} tablet-mobile-flex`}>
                        <div
                            className={`${styles.menuItemBtn}`}
                            onClick={toggleExpandedMenu}>
                            <Icon 
                                name="editProfile"
                                size='sm'
                                color='var(--color-text)'/>
                            <span>Manage Account</span>
                            <Icon 
                                name="arrowDown"
                                size='xxs'
                                color='var(--color-text)'
                                className={`${styles.arrowIcon} ${isExpandedMenuOpen ? styles.rotated : ''}`}/>
                        </div>

                        {/* Expanded sub-options */}
                        <div className={`${styles.subMenu} ${isExpandedMenuOpen ? styles.subMenuOpen : ''}`}>
                            <Link
                                href="/manage/account" 
                                className={styles.menuItem}
                                onClick={closeMenu}>
                                <Icon
                                    name="profile"
                                    size='sm'
                                    color='var(--color-text)'/>
                                <span>Account</span>
                            </Link>

                            <Link
                                href="/manage/communities" 
                                className={styles.menuItem}
                                onClick={closeMenu}>
                                <Icon
                                    name="profile"
                                    size='sm'
                                    color='var(--color-text)'/>
                                <span>Communities</span>
                            </Link>

                            <Link
                                href="/manage/appearance" 
                                className={styles.menuItem}
                                onClick={closeMenu}>
                                <Icon
                                    name="toggle"
                                    size='sm'
                                    strokeColor='var(--color-background-light)'
                                    fillColor='var(--color-text)'/>
                                <span>App Appearance</span>
                            </Link>
                        </div>
                    </div>

                    <Link 
                        href="/community/create" 
                        className={styles.menuItem}
                        onClick={closeMenu}>
                        <Icon
                            name="createPost"
                            size='sm'
                            color="var(--color-text)" />
                        <span>Create free Community</span>
                    </Link>
                    
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