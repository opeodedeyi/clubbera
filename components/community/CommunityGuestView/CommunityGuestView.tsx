import { CommunityData } from '@/lib/api/communities';
// import Button from '@/components/ui/Button/Button';
import { defaultCommunityGuidelines } from '@/lib/data/communityGuidelines';
import ExpandableTextSection from '../ExpandableTextSection/ExpandableTextSection';
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
            </div>
            
            <div className={styles.contentMain}>
                <ExpandableTextSection 
                    title="Community Description"
                    content={community.description}
                    enableMarkdown={true}
                    maxLines={5} />

                {/* upcoming event */}

                <ExpandableTextSection 
                    title="Community Guidelines"
                    content={community.guidelines || defaultCommunityGuidelines}
                    enableMarkdown={true} />
            </div>
        </div>
    )
}