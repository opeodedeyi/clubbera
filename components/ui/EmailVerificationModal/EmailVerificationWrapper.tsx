'use client';

import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import EmailVerificationModal from './EmailVerificationModal';

const EmailVerificationWrapper: React.FC = () => {
    const { showEmailVerification } = useAuth();

    return <EmailVerificationModal isOpen={showEmailVerification} />;
};

export default EmailVerificationWrapper;