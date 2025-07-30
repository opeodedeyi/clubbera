'use client'

import Link from 'next/link';
import Icon from '@/components/ui/Icon/Icon';
import Button from '@/components/ui/Button/Button';
import TextInput from '@/components/Form/TextInput/TextInput';
import PasswordInput from '@/components/Form/PasswordInput/PasswordInput';
import AuthLayout from "@/components/layout/AuthLayout/AuthLayout";
import { useSignupForm } from '@/hooks/useSignupForm';
import styles from '@/styles/pages/auth.module.css';


export default function Signup() {
    const {
        formData,
        isLoading,
        error,
        handleInputChange,
        handleSubmit,
        clearError
    } = useSignupForm()

    return (
        <AuthLayout particleCount={4}>
            <>
                <div className={styles.textContent}>
                    <h1 className={styles.textContentTitle}>Join the <br /><span className={styles.specialText}>Adventure</span></h1>

                    <p className={styles.textContentSubtitle}>Sign up to connect with like-minded individuals and <br className=''/>embark on exciting journeys together.</p>
                </div>

                <form className={styles.formContent}>
                    {error && (
                        <div className={styles.errorMessage} onClick={clearError}>
                            {error}
                        </div>
                    )}

                    <TextInput
                        name='name'
                        label='Name'
                        placeholder='Enter your fullname'
                        type='text'
                        value={formData.name}
                        onChange={(value) => handleInputChange('name', value)}
                        disabled={isLoading}
                        isRequired />

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
                        disabled={isLoading || !formData.name || !formData.email || !formData.password}>
                        {isLoading ? 'Creating Account...' : 'Signup with Email'}
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