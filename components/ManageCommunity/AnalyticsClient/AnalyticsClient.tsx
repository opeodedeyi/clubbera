'use client';

import BackButton from '@/components/ui/BackButton/BackButton';
import EditCommunityTitle from '../EditCommunityTitle/EditCommunityTitle';
import Icon from '@/components/ui/Icon/Icon';
import { CommunityPermissions } from '@/lib/api/communities';
import ManageCommunity from '@/components/layout/ManageCommunity/ManageCommunity';
import styles from './AnalyticsClient.module.css';


interface Props {
    communityId: string | number;
    permissions?: CommunityPermissions;
}

export default function AnalyticsClient({ communityId, permissions }: Props) {
    const numericCommunityId = typeof communityId === 'string' ? parseInt(communityId) : communityId;

    return (
        <ManageCommunity communityId={numericCommunityId} permissions={permissions}>
            <div className={styles.mainContent}>
                <BackButton className={`${styles.backBtn} self-start`}/>

                <div className={styles.container}>
                    <EditCommunityTitle
                        title="Analytics & Insights"
                        description="Data to Grow Your Community"/>

                    <div className={styles.comingSoonSection}>
                        <div className={styles.emptyStateIcon}>
                            <Icon name='metric' size='xxl' color='var(--color-text-light)'/>
                        </div>
                        <div className={styles.comingSoonContent}>
                            <h3 className={styles.comingSoonTitle}>Coming Soon</h3>
                            <p className={styles.comingSoonDescription}>
                                Advanced analytics and insights to help you understand your community growth, engagement patterns, and member activity.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ManageCommunity>
    );
}