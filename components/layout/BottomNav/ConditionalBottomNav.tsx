'use client';

import { usePathname } from 'next/navigation';
import BottomNav from './BottomNav';

// Pages where bottom nav should NOT show
const PAGES_WITHOUT_BOTTOM_NAV = ['/login', '/signup', '/join', '/onboarding'];

export default function ConditionalBottomNav() {
    const pathname = usePathname();
    const shouldShowBottomNav = !PAGES_WITHOUT_BOTTOM_NAV.includes(pathname);

    return shouldShowBottomNav ? <BottomNav /> : null;
}