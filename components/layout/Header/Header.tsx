'use client';

import { useAuth } from '@/hooks/useAuth';
import { useHeaderVariant } from '@/components/providers/HeaderVariantProvider';
import HeaderLoggedOut from './HeaderLoggedOut';
import HeaderLoggedIn from './HeaderLoggedIn';
import HeaderSkeleton from './HeaderSkeleton';
import type { HeaderProps } from '@/types/header';


/**
 * Header component that displays different content based on authentication state.
 * Uses the `useAuth` hook to determine if the user is logged in or not.
 *
 * @param {HeaderProps} props - The properties for the header component.
 * @returns {JSX.Element} The rendered header component.
 */
export default function Header({ variant: propVariant, className = '' }: HeaderProps) {
    const { user, loading, mounted } = useAuth()
    const { variant: contextVariant } = useHeaderVariant()

    // Context variant takes precedence over prop variant
    const variant = contextVariant || propVariant

    if (!mounted) {
        return <HeaderSkeleton className={className} />
    }

    if (loading) {
        return <HeaderSkeleton className={className} />
    }

    if (user) {
        return <HeaderLoggedIn user={user} variant={variant} className={className} />
    }

    return <HeaderLoggedOut className={className} />
}