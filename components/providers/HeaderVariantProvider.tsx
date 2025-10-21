'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { HeaderVariant } from '@/types/header';

interface HeaderVariantContextType {
    variant: HeaderVariant | undefined;
    setVariant: (variant: HeaderVariant | undefined) => void;
}

const HeaderVariantContext = createContext<HeaderVariantContextType | undefined>(undefined);

export function HeaderVariantProvider({ children }: { children: ReactNode }) {
    const [variant, setVariant] = useState<HeaderVariant | undefined>(undefined);

    return (
        <HeaderVariantContext.Provider value={{ variant, setVariant }}>
            {children}
        </HeaderVariantContext.Provider>
    );
}

export function useHeaderVariant() {
    const context = useContext(HeaderVariantContext);
    if (context === undefined) {
        throw new Error('useHeaderVariant must be used within a HeaderVariantProvider');
    }
    return context;
}
