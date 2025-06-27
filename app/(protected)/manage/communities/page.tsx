'use client';

import ManageAccount from '@/components/layout/ManageAccount/ManageAccount';
import styles from "@/styles/pages/manageCommunities.module.css";

export default function ManageCommunities() {

    return (
        <ManageAccount>
            <div className={styles.contentOrder}>
                <div className={styles.contentText}>
                    <p>Make your community safer</p>
                    <h2>Communities</h2>
                </div>

                <div className={styles.scrollContainer}>
                    
                </div>
            </div>
        </ManageAccount>
    );
}