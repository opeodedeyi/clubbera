'use client'

import styles from './LegalLayout.module.css';


export default function LegalLayout({ children, currentPage, title, time }) {
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.legalHeader}>
                <p className={styles.breadCrumbs}>{`Legal > ${currentPage}`}</p>
                <h1 className={styles.legalTitle}>{title}</h1>
                <p className={styles.legalTime}>{time}</p>
            </div>

            {children}
        </div>
    )
}