'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import styles from './TopLoadingBar.module.css'

export default function TopLoadingBar() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(false)
    }, [pathname, searchParams])

    useEffect(() => {
        // Listen for link clicks
        const handleLinkClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const link = target.closest('a')
            
            if (link && link.href && !link.href.startsWith('mailto:') && !link.href.startsWith('tel:')) {
                const url = new URL(link.href)
                const currentUrl = new URL(window.location.href)
                
                // Only show loading for different pages
                if (url.pathname !== currentUrl.pathname || url.search !== currentUrl.search) {
                    setLoading(true)
                }
            }
        }

        document.addEventListener('click', handleLinkClick)
        
        return () => {
            document.removeEventListener('click', handleLinkClick)
        }
    }, [])

    if (!loading) return null

    return (
        <div className={styles.topLoadingBar}>
            <div className={styles.progress}></div>
        </div>
    )
}