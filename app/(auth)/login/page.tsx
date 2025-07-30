'use client'

import Link from 'next/link';
import Icon from '@/components/ui/Icon/Icon';
import TextInput from '@/components/Form/TextInput/TextInput';
import PasswordInput from '@/components/Form/PasswordInput/PasswordInput';
import Button from '@/components/ui/Button/Button';
import { useLoginForm } from '@/hooks/useLoginForm';
import AuthLayout from "@/components/layout/AuthLayout/AuthLayout";
import styles from '@/styles/pages/auth.module.css';


export default function login() {
    const {
        formData,
        isLoading,
        error,
        handleInputChange,
        handleSubmit,
        clearError
    } = useLoginForm()

    return (
        <AuthLayout particleCount={4}>
            <>
                <div className={styles.textContent}>
                    <h1 className={styles.textContentTitle}>Welcome <br /><span className={styles.specialText}>Back</span></h1>

                    <p className={styles.textContentSubtitle}>Ready to reconnect with friends? Login to resume discovery of new experiences together.</p>
                </div>
                
                <form className={styles.formContent}>
                    {error && (
                        <div className={styles.errorMessage} onClick={clearError}>
                            {error}
                        </div>
                    )}

                    <TextInput
                        name='email'
                        label='Email address'
                        placeholder='Enter your email'
                        type='email'
                        value={formData.email}
                        onChange={(value) => handleInputChange('email', value)}
                        disabled={isLoading}
                        isRequired />

                    <PasswordInput
                        name='password'
                        label='Password'
                        placeholder='Enter your password'
                        value={formData.password}
                        onChange={(value) => handleInputChange('password', value)}
                        disabled={isLoading}
                        isRequired />
                </form>

                <div className={styles.btnContent}>
                    <Button
                        iconLeft={<Icon name='mail' color='var(--color-default)' /> }
                        size='full'
                        onClick={handleSubmit}
                        variant='plain'
                        disabled={isLoading || !formData.email || !formData.password}>
                        {isLoading ? 'Logging in...' : 'Login with Email'}
                    </Button>
                    <p className={styles.btnContentLink}>Not a member? 
                        <Link className={styles.specialTextLink} href='/signup'> Sign up</Link>
                    </p>
                </div>
            </>
        </AuthLayout>
    )
}