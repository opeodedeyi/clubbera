'use client';

import { useEffect } from 'react';
import { CommunityData } from '@/lib/api/communities';
import { useHeaderVariant } from '@/components/providers/HeaderVariantProvider';
import CommunityHeader from '../CommunityHeader/CommunityHeader';
import CommunityPosts from '../CommunityPosts/CommunityPosts';
import UpcomingEvents from '../UpcomingEvents/UpcomingEvents';
import { defaultCommunityGuidelines } from '@/lib/data/communityGuidelines';
import CommunityInfoSection from '../CommunityInfoSection/CommunityInfoSection';
import styles from './CommunityMemberView.module.css';

interface CommunityMemberViewProps {
    community: CommunityData;
}

export default function CommunityMemberView({ community }: CommunityMemberViewProps) {
    console.log('CommunityMemberView', community);
    const { setVariant } = useHeaderVariant();

    // Set header variant when component mounts
    useEffect(() => {
        setVariant({
            communityData: {
                id: community.id,
                name: community.name,
                uniqueUrl: community.uniqueUrl
            }
        });

        // Clear variant when component unmounts
        return () => {
            setVariant(undefined);
        };
    }, [community.id, community.name, community.uniqueUrl, setVariant]);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <CommunityHeader community={community}/>

                <div className={styles.contentMain}>
                    <div className={styles.contentLeft}>
                        { community.user.isAdmin && (
                            <UpcomingEvents
                                community={community}
                                variant='admin' />
                        )}

                        <CommunityPosts community={community}/>
                    </div>

                    <div className={styles.contentRight}>
                        <CommunityInfoSection
                            className='desktop-only-flex'
                            title={community.name}
                            content={community.description}
                            enableMarkdown={true}
                            memberCount={community.memberCount}
                            maxLines={7} />
                        
                        { community.user.isAdmin===false && (
                            <UpcomingEvents
                                community={community}
                                variant='member'/>
                        )}

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