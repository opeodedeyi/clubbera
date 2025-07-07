'use client'

import Link from 'next/link';
import Icon from '@/components/ui/Icon/Icon';
import Button from '@/components/ui/Button/Button';
import AuthLayout from "@/components/layout/AuthLayout/AuthLayout";
import styles from '@/styles/pages/auth.module.css';


export default function forgotpassword() {
    return (
        <AuthLayout particleCount={4}>
            <>
                <div className={styles.textContent}>
                    <h1 className={styles.textContentTitle}>Forgot <br /><span className={styles.specialText}>Password?</span></h1>

                    <p className={styles.textContentSubtitle}>We will send you a mail to reset your password.</p>
                </div>

                <div className={styles.btnContent}>
                    <Button
                        iconLeft={<Icon name='mail' color='var(--color-default)' /> }
                        size='full'
                        variant='plain'>
                        Send Email
                    </Button>
                    <p className={styles.btnContentLink}>Didn't forget password? 
                        <Link className={styles.specialTextLink} href='/signup'> Log in</Link>
                    </p>
                </div>
            </>
        </AuthLayout>
    )
}