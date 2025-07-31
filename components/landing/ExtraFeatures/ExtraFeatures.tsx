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
                    <span className={styles.designLine1}/>
                    <span className={styles.designLine2}/>
                    <span className={styles.designLine3}/>

                    <div className={styles.otherHeader}>
                        <Icon name="chat" size="max" color="var(--color-default)"/>
                    </div>

                    <div className={styles.otherBodyText}>
                        <p className={styles.eventBodyTextTitle}><span className="font-boris color-default">Meet,</span> Message,<br/>
                        <span className="font-boris color-default">Connect</span></p>

                        <p className={styles.eventBodyTextSub}>Chat one-on-one to plan events and <br />
                        build friendships that last.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}