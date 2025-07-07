'use client'

import Link from 'next/link';
import Icon from '@/components/ui/Icon/Icon';
import BrandIcon from '@/components/ui/Icon/BrandIcon';
import Button from '@/components/ui/Button/Button';
import AuthLayout from "@/components/layout/AuthLayout/AuthLayout";
import styles from '@/styles/pages/auth.module.css';


export default function login() {
    return (
        <AuthLayout particleCount={4}>
            <>
                <div className={styles.textContent}>
                    <h1 className={styles.textContentTitle}>Welcome <br /><span className={styles.specialText}>Back</span></h1>

                    <p className={styles.textContentSubtitle}>Ready to reconnect with friends? Login to resume discovery of new experiences together.</p>
                </div>

                <div className={styles.btnContent}>
                    <Button
                        iconLeft={<Icon name='mail' color='var(--color-default)' /> }
                        size='full'
                        variant='plain'>
                        Login with Email
                    </Button>
                    <p className={styles.btnContentLink}>Not a member? 
                        <Link className={styles.specialTextLink} href='/signup'> Sign up</Link>
                    </p>
                </div>
            </>
        </AuthLayout>
    )
}