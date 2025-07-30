'use client';

import { createPortal } from 'react-dom';
import { ReactNode, useEffect, useState } from 'react';

interface OverlayPortalProps {
    children: ReactNode;
}

export default function OverlayPortal({ children }: OverlayPortalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return createPortal(children, document.body);
}
