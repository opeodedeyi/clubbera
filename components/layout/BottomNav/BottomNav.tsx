'use client';

import { useAuth } from '@/hooks/useAuth';
import { usePostCreation } from '@/components/providers/PostCreationProvider';
import BottomNavLoggedOut from './BottomNavLoggedOut';
import BottomNavLoggedIn from './BottomNavLoggedIn';
import BottomNavSkeleton from './BottomNavSkeleton';

export default function BottomNav() {
    const { user, loading, mounted } = useAuth();
    const { openCreatePost } = usePostCreation();

    if (!mounted) {
        return <BottomNavSkeleton />;
    }

    if (loading) {
        return <BottomNavSkeleton />;
    }

    if (user) {
        return <BottomNavLoggedIn openCreatePost={openCreatePost} />;
    }

    return <BottomNavLoggedOut />;
}