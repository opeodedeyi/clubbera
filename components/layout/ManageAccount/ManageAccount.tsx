'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/Icon/Icon';
import PageWrapper from "@/components/ui/PageWrapper/PageWrapper";
import BackButton from "@/components/ui/BackButton/BackButton";
import styles from "./ManageAccount.module.css";

export default function ManageAccount({ children }) {
    const pathname = usePathname()

    return (
        <PageWrapper showParticles={false}>
            <div className={styles.container}>
                <div className={styles.containerLeft}>
                    <BackButton className='self-start'/>

                    <div className={styles.containerContent}>
                        {children}
                    </div>
                </div>

                <nav className={`${styles.navigation} self-start desktop-only-flex`}>
                    <Link
                        href="/manage/account" 
                        className={`${styles.navigationItem} ${pathname === '/manage/account' ? styles.active : ''}`}>
                        <Icon
                            name="profile"
                            size='sm'
                            color='var(--color-text)'/>
                        <span>Account</span>
                    </Link>

                    <Link
                        href="/manage/communities" 
                        className={`${styles.navigationItem} ${pathname === '/manage/communities' ? styles.active : ''}`}>
                        <Icon
                            name="globe"
                            size='sm'
                            color='var(--color-text)'/>
                        <span>Communities</span>
                    </Link>

                    <Link
                        href="/appearance" 
                        className={`${styles.navigationItem} ${pathname === '/appearance' ? styles.active : ''}`}>
                        <Icon
                            name="toggle"
                            size='md'
                            strokeColor='var(--color-background-light)'
                            fillColor='var(--color-text)'/>
                        <span>App Appearance</span>
                    </Link>
                </nav>
            </div>
        </PageWrapper>
    );
}