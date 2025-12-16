'use client'

import { useState, useRef, useEffect } from 'react';
import styles from './SearchBar.module.css';
import type { SearchBarProps } from '@/types/search';
import Icon from '@/components/ui/Icon/Icon';


export default function SearchBar({
    size = 'large',
    backgroundColor = 'var(--color-default)',
    placeholder = 'Search communities, events...',
    value = '',
    onChange,
    onSubmit,
    onFocus,
    onBlur,
    className = ''
}: SearchBarProps) {
    const [isFocused, setIsFocused] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [originalPosition, setOriginalPosition] = useState<DOMRect | null>(null)
    const searchRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    // Detect mobile/tablet
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768)
        }
        
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const handleFocus = () => {
        setIsFocused(true)
        onFocus?.()

        // On mobile, move search to top
        if (isMobile && searchRef.current) {
            const rect = searchRef.current.getBoundingClientRect()
            setOriginalPosition(rect)
            
            searchRef.current.classList.add(styles.mobileFloating)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    const handleBlur = () => {
        setIsFocused(false)
        onBlur?.()

        // On mobile, return to original position
        if (isMobile && searchRef.current) {
            searchRef.current.classList.remove(styles.mobileFloating)
            setOriginalPosition(null)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (onSubmit && value.trim()) {
            onSubmit(value.trim())
        }
    }
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && onSubmit && value.trim()) {
            e.preventDefault()
            onSubmit(value.trim())
        }
    }

    console.log(originalPosition)

    // Build CSS classes
    const searchClasses = [
        styles.searchContainer,
        styles[size],
        isMobile && styles.mobile,
        isFocused && styles.focused,
        className
    ].filter(Boolean).join(' ')

    return (
        <>
            {/* Mobile floating overlay */}
            {isMobile && isFocused && (
                <div className={styles.mobileOverlay} onClick={handleBlur} />
            )}

            <form onSubmit={handleSubmit} className={styles.searchForm}>
                <div ref={searchRef} className={searchClasses}>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder={placeholder}
                        value={value}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        className={styles.searchInput}/>

                    <button
                        type='submit'
                        className={styles.searchbtn}
                        style={{ backgroundColor }}>
                        <Icon
                            name="search"
                            size="md"
                            color='var(--color-white)'  />
                    </button>
                </div>
            </form>
        </>
    )
}