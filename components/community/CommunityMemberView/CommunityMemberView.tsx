'use client';

import { CommunityData } from '@/lib/api/communities';
import MemberHeader from '../MemberHeader/MemberHeader';
import BackButton from '@/components/ui/BackButton/BackButton';
import CommunityHeader from '../CommunityHeader/CommunityHeader';
import { defaultCommunityGuidelines } from '@/lib/data/communityGuidelines';
import CommunityInfoSection from '../CommunityInfoSection/CommunityInfoSection';
import styles from './CommunityMemberView.module.css';

interface CommunityMemberViewProps {
    community: CommunityData;
}

export default function CommunityMemberView({ community }: CommunityMemberViewProps) {
    console.log('CommunityMemberView', community);
    
    return (
        <div className={styles.container}>
            <MemberHeader community={community}/>
            <BackButton className='self-start desktop-only-flex'/>
            
            <div className={styles.content}>
                <CommunityHeader community={community}/>

                <div className={styles.contentMain}>
                    <div className={styles.contentLeft}>
                        {/* { community.user.isAdmin && (
                                upcoming events for admin members
                        )} */}

                        {/* posts for community members */}
                    </div>

                    <div className={styles.contentRight}>
                        <CommunityInfoSection
                            className='desktop-only-flex'
                            title={community.name}
                            content={community.description}
                            enableMarkdown={true}
                            memberCount={community.memberCount}
                            maxLines={7} />
                        
                        {/* { community.user.isAdmin===false && (
                                upcoming events for normal members
                        )} */}

                        <CommunityInfoSection 
                            className='desktop-only-flex'
                            title="Community Guidelines"
                            content={community.guidelines || defaultCommunityGuidelines}
                            enableMarkdown={true}
                            maxLines={10} />
                    </div>
                </div>
            </div>
        </div>
    )
}