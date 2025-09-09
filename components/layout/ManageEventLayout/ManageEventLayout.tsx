import { CommunityPermissions } from '@/lib/api/communities';
import BackButton from '@/components/ui/BackButton/BackButton';
import { EventDetails } from "@/types/event";
import MENavigation from '@/components/ManageEvent/MENavigation/MENavigation';
import styles from './ManageEventLayout.module.css';

interface ManageEventProps {
    children: React.ReactNode;
    event?: EventDetails;
    permissions?: CommunityPermissions;
}

export default function ManageEventLayout({ children, event, permissions }: ManageEventProps) {
    return (
        <div className={styles.container}>
            <div className={styles.containerLeft}>
                <BackButton className='self-start'/>

                <div className={styles.containerContent}>
                    {children}
                </div>
            </div>

            <MENavigation eventId={event.id} permissions={permissions} /> {/* pass uniqueurl and id of the community to the community */}
        </div>
    );
}