import Icon from "@/components/ui/Icon/Icon";
import styles from "./SocialWorld.module.css";


export default function SocialWorld() {
    return (
        <div className={styles.container}>
            <div className={styles.heroText}>
                <p className={styles.heroTitle}>
                    Your <span className="font-boris">Social World,</span><br/>
                    All in One Place
                </p>
                <p className={styles.heroSubText}>
                    Explore communities, join events, and connect effortlessly with tools designed for you.
                </p>
            </div>

            <div className={styles.containerCards}>
                <div className={styles.cardComm}>
                    <div className={styles.cardText}>
                        <Icon name="group" className={styles.cardIcon} size="max" color="var(--color-community)"/>

                        <p className={`font-boris ${styles.cardTitle}`}>
                            Discover, create, share <br />communities share your <br />passions.
                        </p>
                    </div>

                    <div className={styles.innerCommCard}>
                        <div className={styles.innerCommCardHeader}>
                            <span className={`font-boris`}>clubbera</span>
                        </div>

                        <div className={styles.innerCommCardBody}>
                            <p className={`font-boris ${styles.innerCommCardTitle}`}>Clubbera</p>
                            <p className={styles.innerCommCardSub}>Join the Fight! Welcome to the ultimate Invincible community. Connect with heroes</p>
                        </div>
                    </div>

                    <span className={`${styles.vectorBox} ${styles.communityBorder}`} style={{top: -30, left: -80}}/>
                    <span className={`${styles.vectorBox} ${styles.communityBorder}`} style={{top: 80, left: -20}}/>
                </div>

                <div className={styles.cardOther}>
                    <div className={styles.cardEvent}>
                        <div className={styles.cardText}>
                            <Icon name="calendar" className={styles.cardIcon} size="max" color="var(--color-event)"/>

                            <p className={`font-boris ${styles.cardTitle}`}>
                                Host, RSVP, to events fit your <br />schedule and spark excitement.
                            </p>
                        </div>

                        <div className={styles.innerEventCards}>
                            <div className={styles.innerEventCard}>
                                <p className={styles.innerEventCardSub}>4,050</p>
                                <p className={`font-boris ${styles.innerEventCardTitle}`}>Moonshot by Tech Cabal</p>
                            </div>

                            <div className={styles.innerEventCard}>
                                <p className={styles.innerEventCardSub}>15</p>
                                <p className={`font-boris ${styles.innerEventCardTitle}`}>Suzuka Grand prix</p>
                            </div>
                        </div>

                        <span className={`${styles.vectorBox} ${styles.eventBorder}`} style={{top: -30, right: 30}}/>
                        <span className={`${styles.vectorBox} ${styles.eventBorder}`}/>
                    </div>

                    <div className={styles.cardDefault}>
                        <div className={styles.cardText}>
                            <Icon name="chat" className={styles.cardIcon} size="max" color="var(--color-default)"/>

                            <p className={`font-boris ${styles.cardTitle}`}>
                                Chat securely with <br />friends, all within the app.
                            </p>
                        </div>

                        <div className={styles.cardDefaultInner}>
                            <div className={styles.cardDefaultInnerImg}>
                                <p className={styles.cardDefaultInnerImgT}>M</p>
                            </div>

                            <div className={styles.cardDefaultInnerText}>
                                <p className={`font-boris ${styles.cardInnerTitle}`}>Mayorkun Naimat</p>
                                <p className={styles.cardInnerSub}>Lovely chat Daniel, we will revisit during th...</p>
                            </div>
                        </div>

                        <span className={`${styles.vectorBox} ${styles.defaultBorder}`} style={{top: -30, left: 150}}/>
                        <span className={`${styles.vectorBox} ${styles.defaultBorder}`}/>
                    </div>
                </div>
            </div>
        </div>
    );
}