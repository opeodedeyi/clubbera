import { CommunityData } from '@/lib/api/communities';
import BackButton from '@/components/ui/BackButton/BackButton';
import MainCommunityNavigation from '@/components/community/MainCommunityNavigation/MainCommunityNavigation';
import styles from './CommunityLayout.module.css';

interface ManageCommunityProps {
    children: React.ReactNode;
    community?: CommunityData;
}

export default function CommunityLayout({ children, community }: ManageCommunityProps) {
    return (
        <div className={styles.container}>
            <div className={styles.containerLeft}>
                <BackButton className='self-start desktop-only flex'/>

                <div className={styles.containerContent}>
                    {children}
                </div>
            </div>

            <MainCommunityNavigation communityId={community.id} communityURL={community.uniqueUrl} isAdmin={community.user?.isAdmin}/>
        </div>
    );
}