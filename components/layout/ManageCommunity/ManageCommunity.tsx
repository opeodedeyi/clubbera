import { CommunityData, CommunityPermissions } from '@/lib/api/communities';
import MainNavigation from '@/components/ManageCommunity/MainNavigation/MainNavigation';
import styles from './ManageCommunity.module.css';

interface ManageCommunityProps {
    children: React.ReactNode;
    community?: CommunityData;
    communityId?: number;
    permissions?: CommunityPermissions;
}

export default function ManageCommunity({ children, community, communityId, permissions }: ManageCommunityProps) {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.containerLeft}>

                    <div className={styles.containerContent}>
                        {children}
                    </div>
                </div>

                <MainNavigation communityId={community?.id || communityId} permissions={permissions} /> {/* pass uniqueurl and id of the community to the community */}
            </div>
        </>
    );
}