import Icon from "@/components/ui/Icon/Icon";
import styles from "./ExtraFeatures.module.css";

export default function ExtraFeatures() {
    return (
        <div className={styles.container}>
            <div className={`${styles.FeaturesCard} ${styles.eventTheme}`}>
                <div className={`${styles.innerCard} ${styles.borderEvent}`}>
                    <div className={styles.eventHeader}>
                        <h1>Clubbera</h1>
                    </div>

                    <div className={styles.eventBody}>
                        <div className={styles.eventBodyCal}>
                            <Icon name="calendar" size="xs" color="var(--color-event)"/>
                            <p>Starting in 2days</p>
                        </div>

                        <div className={styles.eventBodyText}>
                            <p className={styles.eventBodyTextTitle}>Curated <span className="font-boris color-event">Event&apos;s</span> <br/>
                            for <span className="font-boris color-event">Everyone</span></p>

                            <p className={styles.eventBodyTextSub}>Whether you&apos;re a planner or a <br/>
                            spontaneous soul, we&apos;ve got you.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`${styles.FeaturesCard} ${styles.defaultTheme}`}>
                <div className={`${styles.innerCard} ${styles.borderDefault} ${styles.otherCard}`}>

                </div>
            </div>
        </div>
    );
}