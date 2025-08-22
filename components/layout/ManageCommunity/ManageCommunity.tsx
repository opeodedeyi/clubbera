import BackButton from '@/components/ui/BackButton/BackButton';
import { CommunityData, CommunityPermissions } from '@/lib/api/communities';
import MainNavigation from '@/components/ManageCommunity/MainNavigation/MainNavigation';
import styles from './ManageCommunity.module.css';

interface ManageCommunityProps {
    children: React.ReactNode;
    community?: CommunityData;
    permissions?: CommunityPermissions;
}

export default function ManageCommunity({ children, community, permissions }: ManageCommunityProps) {
    return (
        <>
            <div className={styles.containerBtn}>
                <BackButton className='self-start'/>
            </div>

            <div className={styles.container}>
                <div className={styles.containerLeft}>

                    <div className={styles.containerContent}>
                        {children}
                    </div>
                </div>

                <MainNavigation communityId={community.id} permissions={permissions} /> {/* pass uniqueurl and id of the community to the community */}
            </div>
        </>
    );
}