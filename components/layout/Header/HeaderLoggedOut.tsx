import Link from 'next/link';
import Button from '@/components/ui/Button/Button';
import ClubberaLogo from '@/components/ui/Icon/ClubberaLogo';
import type { HeaderProps } from '@/types/header';
import styles from './Header.module.css';

export default function HeaderLoggedOut({ className = '' }: HeaderProps) {
    return (
        <header className={`${styles.header} ${styles.loggedOut} ${className}`}>
            <div className={styles.containerlo}>
                <div className={styles.left}>
                    <Link href="/" className={styles.logo}>
                        <ClubberaLogo variant="custom" textColor="var(--color-text)" />
                    </Link>
                </div>

                <div className={`${styles.actions} desktop-only-flex`}>
                    <Button as="link" href="/join" variant='plain' size='large'>
                        Join Clubbera
                    </Button>
                </div>
            </div>
        </header>
    )
}