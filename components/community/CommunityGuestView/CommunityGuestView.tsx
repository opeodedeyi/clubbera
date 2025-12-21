'use client';

import { CommunityData } from '@/lib/api/communities';
import { defaultCommunityGuidelines } from '@/lib/data/communityGuidelines';
import ExpandableTextSection from '../ExpandableTextSection/ExpandableTextSection';
import BackButton from '@/components/ui/BackButton/BackButton';
import CommunityHeader from '../CommunityHeader/CommunityHeader';
import GuestUpcomingEvent from '../GuestUpcomingEvent/GuestUpcomingEvent';
import styles from './CommunityGuestView.module.css';

interface CommunityGuestViewProps {
    community: CommunityData;
}

export default function CommunityGuestView({ community }: CommunityGuestViewProps) {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <CommunityHeader
                    community={community} />
            </div>
            
            <div className={styles.contentMain}>
                <ExpandableTextSection 
                    title="Community Description"
                    content={community.description}
                    enableMarkdown={true}
                    maxLines={5} />

                {/* work on this component below */}
                <GuestUpcomingEvent
                    communityId={community.id} />

                <ExpandableTextSection 
                    title="Community Guidelines"
                    content={community.guidelines || defaultCommunityGuidelines}
                    enableMarkdown={true} />
            </div>

            {/* Build Featured Communities */}
        </div>
    )
}