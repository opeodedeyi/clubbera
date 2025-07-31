import React from 'react';
import styles from './CenterContainer.module.css';

export default function CenterContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.centerContainer}>
            {children}
        </div>
    );
}