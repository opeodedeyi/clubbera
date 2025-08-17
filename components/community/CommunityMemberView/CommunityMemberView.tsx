import { CommunityData } from '@/lib/api/communities';
// import Button from '@/components/ui/Button/Button';
import BackButton from '@/components/ui/BackButton/BackButton';
import CommunityHeader from '../CommunityHeader/CommunityHeader';
import styles from './CommunityMemberView.module.css';

interface CommunityMemberViewProps {
    community: CommunityData;
}

export default function CommunityMemberView({ community }: CommunityMemberViewProps) {
    return (
        <div className={styles.container}>
            <BackButton className='self-start desktop-only-flex'/>
            
            <div className={styles.content}>
                <CommunityHeader community={community}/>

                <div className={styles.contentMain}></div>
            </div>
        </div>
    )
}