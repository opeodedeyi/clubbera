'use client';

import { CommunityData } from '@/lib/api/communities';
import CommunityLayout from "@/components/layout/CommunityLayout/CommunityLayout";

interface CommunityMembersClientProps {
    community: CommunityData;
}

export default function CommunityMembersClient({ community }: CommunityMembersClientProps) {
    console.log('CommunityMemberView', community);
    
    return (
        <CommunityLayout community={community}>
            <></>
        </CommunityLayout>
    )
}