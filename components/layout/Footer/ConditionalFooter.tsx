'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';

const PAGES_WITHOUT_FOOTER = ['/home', '/join', '/login', '/signup', '/community/create'];

export default function ConditionalFooter() {
    const pathname = usePathname();
    const shouldShowFooter = !PAGES_WITHOUT_FOOTER.includes(pathname);

    return shouldShowFooter ? <Footer /> : null;
}