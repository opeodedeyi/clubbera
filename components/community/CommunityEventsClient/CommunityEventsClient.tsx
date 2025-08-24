'use client';

import { CommunityData } from '@/lib/api/communities';
import CommunityLayout from "@/components/layout/CommunityLayout/CommunityLayout";

interface CommunityEventsClientProps {
    community: CommunityData;
}

export default function CommunityEventsClient({ community }: CommunityEventsClientProps) {
    console.log('CommunityMemberView', community);
    
    return (
        <CommunityLayout community={community}>
            <></>
        </CommunityLayout>
    )
}