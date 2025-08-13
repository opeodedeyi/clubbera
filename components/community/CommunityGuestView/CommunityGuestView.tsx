import { CommunityData } from '@/lib/api/communities';
// import Button from '@/components/ui/Button/Button';
import BackButton from '@/components/ui/BackButton/BackButton';
import CommunityHeader from '../CommunityHeader/CommunityHeader';
import styles from './CommunityGuestView.module.css';

interface CommunityGuestViewProps {
    community: CommunityData;
}

export default function CommunityGuestView({ community }: CommunityGuestViewProps) {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <BackButton className='self-start'/>
            </div>
            
            <div className={styles.content}>
                <CommunityHeader community={community}/>

                <div className={styles.contentText}>
                    <h2 className={styles.contentTextTitle}>
                        Community Description
                    </h2>
                    <p>{community.description}</p>
                </div>

                {/* upcoming event */}

                <div className={styles.contentText}>
                    <h2 className={styles.contentTextTitle}>
                        Community Guidelines
                    </h2>
                    <p>{community.guidelines}</p>
                </div>

                {/* featured communities */}
            </div>
        </div>
    )
}