'use client';

import { usePathname } from 'next/navigation';
import BottomNav from './BottomNav';

// Pages where bottom nav should NOT show
const PAGES_WITHOUT_BOTTOM_NAV = ['/login', '/signup', '/join', '/onboarding'];
const PATH_PREFIXES_WITHOUT_BOTTOM_NAV = [];
// Pages that show bottom nav, but their sub-paths don't
const PAGES_WITH_BOTTOM_NAV_ONLY_ON_ROOT = ['/messages'];

export default function ConditionalBottomNav() {
    const pathname = usePathname();

    // Check if it's in the exact pages list
    if (PAGES_WITHOUT_BOTTOM_NAV.includes(pathname)) {
        return null;
    }

    // Check if it's under a prefix that should never show bottom nav
    if (PATH_PREFIXES_WITHOUT_BOTTOM_NAV.some(prefix => pathname.startsWith(prefix))) {
        return null;
    }

    // Check if it's a root page that shows bottom nav, but sub-paths don't
    for (const rootPath of PAGES_WITH_BOTTOM_NAV_ONLY_ON_ROOT) {
        if (pathname.startsWith(rootPath)) {
            // Only show if it's exactly the root path
            if (pathname !== rootPath) {
                return null;
            }
        }
    }

    return <BottomNav />;
}