'use client';

import { CommunityData } from '@/lib/api/communities';
import BackButton from '@/components/ui/BackButton/BackButton';
import MemberHeader from '../MemberHeader/MemberHeader';
import CommunityHeader from '../CommunityHeader/CommunityHeader';
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

                <div className={styles.contentMain}></div>
            </div>
        </div>
    )
}