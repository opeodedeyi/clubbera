'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon/Icon';
import TextInput from '@/components/Form/TextInput/TextInput';
import Button from '@/components/ui/Button/Button';
import OverlayPortal from '@/components/ui/OverlayPortal/OverlayPortal';
import { usersApi } from '@/lib/api/users';
import { useAuth } from '@/hooks/useAuth';
import styles from './EmailVerificationModal.module.css';

interface EmailVerificationModalProps {
    isOpen: boolean;
}

const EmailVerificationModal: React.FC<EmailVerificationModalProps> = ({ isOpen }) => {
    const [step, setStep] = useState<'sending' | 'input'>('sending');
    const [verificationCode, setVerificationCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [resendCooldown, setResendCooldown] = useState(0);
    const { user, updateUser } = useAuth();

    const sendVerificationCode = async () => {
        if (!user?.email) return;
        
        setIsLoading(true);
        setError(null);
        
        try {
            await usersApi.verifyEmailCodeRequest({ email: user.email });
            setStep('input');
            setResendCooldown(60);
        } catch (err: any) {
            setError(err?.response?.data?.message || 'Failed to send verification code');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen && user?.email) {
            sendVerificationCode();
        }
    }, [isOpen]);

    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendCooldown]);

    const verifyCode = async () => {
        if (!user?.email || !verificationCode.trim()) return;
        
        setIsLoading(true);
        setError(null);

        try {
            await usersApi.verifyEmailCode({
                email: user.email,
                verificationCode: verificationCode.trim()
            });
            
            updateUser({ isEmailConfirmed: true });
        } catch (err: any) {
            setError(err?.response?.data?.message || 'Invalid verification code');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = () => {
        if (resendCooldown === 0) {
            sendVerificationCode();
        }
    };

    if (!isOpen) return null;

    return (
        <OverlayPortal>
            <div className={styles.overlay}>
                <div className={styles.modal}>
                    <div className={styles.header}>
                        <p className={styles.title}>Verify Your Email</p>
                    </div>

                    {step === 'sending' ? (
                        <div className={styles.content}>
                            <div className={styles.loadingState}>
                                <Icon name="loadingEllipsis" className={styles.loadingIcon} />
                                <p>Sending verification code to {user?.email}</p>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.content}>
                            <p className={styles.instructions}>
                                We've sent a 6-digit verification code to <strong>{user?.email}, please verify to continue</strong>
                            </p>
                            
                            <TextInput
                                name="verificationCode"
                                label=""
                                placeholder="Enter 6-digit code"
                                value={verificationCode}
                                onChange={(value) => setVerificationCode(value)}
                                maxLength={6}
                                disabled={isLoading}
                                className={styles.codeInput}
                                error={error}/>

                            <div className={styles.actions}>
                                <Button
                                    variant='default'
                                    onClick={verifyCode}
                                    disabled={!verificationCode.trim() || isLoading}
                                    loading={isLoading}>
                                    Verify Email
                                </Button>

                                <button
                                    onClick={handleResend}
                                    disabled={resendCooldown > 0 || isLoading}
                                    className={styles.resendButton}>
                                    {resendCooldown > 0 
                                        ? `Resend code in ${resendCooldown}s` 
                                        : 'Resend code'
                                    }
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </OverlayPortal>
    );
};

export default EmailVerificationModal;