'use client'

import { useAuth } from '@/hooks/useAuth'
import styles from './AuthToggle.module.css'


export default function AuthToggle() {
    const { user, toggleMockAuth } = useAuth()

    // Only show in development
    if (process.env.NODE_ENV !== 'development') {
        return null
    }

    return (
        <div className={styles.toggle}>
            <button onClick={toggleMockAuth} className={styles.button}>
                {user ? '👤 Logout (Dev)' : '🔓 Login (Dev)'}
            </button>
        </div>
    )
}