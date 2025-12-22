'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface PostCreationContextType {
    isOpen: boolean;
    preselectedCommunityId: string | null;
    openCreatePost: (communityId?: string) => void;
    closeCreatePost: () => void;
}

const PostCreationContext = createContext<PostCreationContextType | undefined>(undefined);

export function PostCreationProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [preselectedCommunityId, setPreselectedCommunityId] = useState<string | null>(null);

    const openCreatePost = (communityId?: string) => {
        setPreselectedCommunityId(communityId || null);
        setIsOpen(true);
    };

    const closeCreatePost = () => {
        setIsOpen(false);
        setPreselectedCommunityId(null);
    };

    return (
        <PostCreationContext.Provider value={{ isOpen, preselectedCommunityId, openCreatePost, closeCreatePost }}>
            {children}
        </PostCreationContext.Provider>
    );
}

export function usePostCreation() {
    const context = useContext(PostCreationContext);
    if (context === undefined) {
        throw new Error('usePostCreation must be used within a PostCreationProvider');
    }
    return context;
}
