'use client'

import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/Icon/Icon';
import BrandIcon from '@/components/ui/Icon/BrandIcon';
import Link from 'next/link';
import styles from './loggedOutMenu.module.css';


interface MenuProps {
    className?: string
}

export default function LoggedOutMenu({ className = '' }: MenuProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isExpandedMenuOpen, setIsExpandedMenuOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)

    console.log(isExpandedMenuOpen);
    

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

    const closeMenu = () => {
        setIsOpen(false)
        setIsExpandedMenuOpen(false)
    }

    return (
        <div className={`${styles.userMenu} ${className}`}>
            <button
                ref={buttonRef}
                onClick={handleToggle}
                onTouchStart={(e) => e.stopPropagation()}
                className={styles.triggerMenu}
                aria-label="User menu"
                aria-expanded={isOpen} >
                <Icon 
                    name="menu"
                    size='md'
                    color='var(--color-text)' />
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
                        href="/login" 
                        className={styles.menuItem}
                        onClick={closeMenu}>
                        <Icon
                            name="help"
                            size='sm'
                            fillColor="var(--color-text)" 
                            strokeColor="var(--color-background-light)" />
                        <span>Log in</span>
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
                </nav>
            </div>
        </div>
    )
}