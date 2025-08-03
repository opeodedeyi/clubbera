'use client';

import { useAuth } from '@/hooks/useAuth';
import BottomNavLoggedOut from './BottomNavLoggedOut';
import BottomNavLoggedIn from './BottomNavLoggedIn';
import BottomNavSkeleton from './BottomNavSkeleton';

export default function BottomNav() {
    const { user, loading, mounted } = useAuth();

    if (!mounted) {
        return <BottomNavSkeleton />;
    }

    if (loading) {
        return <BottomNavSkeleton />;
    }

    if (user) {
        return <BottomNavLoggedIn />;
    }

    return <BottomNavLoggedOut />;
}