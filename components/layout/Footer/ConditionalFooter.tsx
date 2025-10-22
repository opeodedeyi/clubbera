'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';

const PAGES_WITHOUT_FOOTER = ['/home', '/join', '/login', '/signup', '/community/create'];
const PATH_PREFIXES_WITHOUT_FOOTER = ['/messages'];
const PATH_SEGMENTS_WITHOUT_FOOTER = ['/createevent'];

export default function ConditionalFooter() {
    const pathname = usePathname();

    const shouldShowFooter = !PAGES_WITHOUT_FOOTER.includes(pathname) &&
                            !PATH_PREFIXES_WITHOUT_FOOTER.some(prefix => pathname.startsWith(prefix)) &&
                            !PATH_SEGMENTS_WITHOUT_FOOTER.some(segment => pathname.includes(segment));

    return shouldShowFooter ? <Footer /> : null;
}