'use client';

import { useState } from 'react';
import { EventDetails } from "@/types/event";
import Button from '@/components/ui/Button/Button';
import BackButton from '@/components/ui/BackButton/BackButton';
import styles from "./ManageEventContent.module.css";


interface ManageEventContentProps {
    initialEvent: EventDetails
}

const ManageEventContent: React.FC<ManageEventContentProps> = ({ initialEvent }: ManageEventContentProps) => {
    const [
        event,
        // setEvent
    ] = useState<EventDetails>(initialEvent)

    console.log(event)

    return (
        <div className={styles.container}>
            <BackButton />

            <div className={styles.content}>
                <div className={styles.contentMain}>
                    <h2 className={styles.contentMainTitle}>Manage Event</h2>

                    <div className={styles.contentForm}>

                    </div>
                </div>

                <div className={styles.contentCard}>
                    {/* card goes here */}
                </div>
            </div>
            
            <div className={styles.contentFooter}>
                <Button variant='event'>Update Event</Button>
            </div>
        </div>
    )
}

export default ManageEventContent