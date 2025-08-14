'use client'

import Link from 'next/link';
import { useEffect } from 'react';
import Icon from '@/components/ui/Icon/Icon';
import BrandIcon from '@/components/ui/Icon/BrandIcon';
import Button from '@/components/ui/Button/Button';
import { useGoogleLogin } from '@/hooks/useGoogleLogin';
import AuthLayout from "@/components/layout/AuthLayout/AuthLayout";
import styles from '@/styles/pages/auth.module.css';


export default function join() {
    const { 
        isLoading,
        error,
        isGoogleReady,
        handleGoogleLogin,
        clearError
    } = useGoogleLogin();

    const handleGoogleClick = () => {
        clearError();
        handleGoogleLogin();
    };

    return (
        <>
            <AuthLayout particleCount={4}>
                <>
                    <div className={styles.textContent}>
                        <h1 className={styles.textContentTitle}>Join the <br/><span className={styles.specialText}>Adventure</span></h1>

                        <p className={styles.textContentSubtitle}>Sign up to connect with like-minded individuals and  <br className='desktop-only'/>embark on exciting journeys together.</p>
                    </div>

                    <div className={styles.btnContent}>
                        {error && (
                            <div className={styles.error}>
                                {error}
                            </div>
                        )}

                        <Button
                            onClick={handleGoogleClick}
                            disabled={isLoading || !isGoogleReady}
                            iconLeft={<BrandIcon name='google' />} 
                            size='full' 
                            variant='plain'>
                            {isLoading ? 'Signing up...' : 
                            !isGoogleReady ? 'Loading...' : 
                            'Signup with Google'}
                        </Button>
                        <Button
                            as="link"
                            href='/signup'
                            iconLeft={<Icon name='mail' color='var(--color-default)' /> }
                            size='full'
                            variant='plain'>
                            Signup with Email
                        </Button>
                        <p
                            className={styles.btnContentLink}>Already a member? 
                            <Link className={styles.specialTextLink} href='/login'> Log in</Link>
                        </p>
                    </div>

                    <p className={styles.btnContentLink}>By Clicking finish, you agree to our community guidelines and have read our terms of service and privacy policy</p>
                </>
            </AuthLayout>
        </>
    )
}