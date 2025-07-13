'use client'

import Link from 'next/link';
import Icon from '@/components/ui/Icon/Icon';
import Button from '@/components/ui/Button/Button';
import AuthLayout from "@/components/layout/AuthLayout/AuthLayout";
import styles from '@/styles/pages/auth.module.css';


export default function signup() {
    return (
        <AuthLayout particleCount={4}>
            <>
                <div className={styles.textContent}>
                    <h1 className={styles.textContentTitle}>Join the <br /><span className={styles.specialText}>Adventure</span></h1>

                    <p className={styles.textContentSubtitle}>Sign up to connect with like-minded individuals and <br className=''/>embark on exciting journeys together.</p>
                </div>

                <div className={styles.btnContent}>
                    <Button
                        iconLeft={<Icon name='mail' color='var(--color-default)' /> }
                        size='full'
                        variant='plain'>
                        Signup with Email
                    </Button>
                    <p className={styles.btnContentLink}>Already a member? 
                        <Link className={styles.specialTextLink} href='/login'> Log in</Link>
                    </p>
                </div>

                <p className={styles.btnContentLink}>By Clicking finish, you agree to our community guidelines and have read our terms of service and privacy policy</p>
            </>
        </AuthLayout>
    )
}