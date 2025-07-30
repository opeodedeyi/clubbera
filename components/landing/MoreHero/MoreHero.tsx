import Icon from "@/components/ui/Icon/Icon";
import styles from "./MoreHero.module.css";


function MoreHeroCard({ icon, title}) {
    return (
        <div className={styles.card}>
            <div className={styles.cardBackground}>
                <Icon name={icon} color="var(--color-danger)" size="max"/>
            </div>
            
            <p className={`${styles.cardTitle} font-boris`}>{title}</p>
        </div>
    );
}

export default function MoreHero() {
    return (
        <div className={styles.container}>
            <p className={styles.containerText}>
                Built for <br/>
                everyday <span className="font-boris" style={{color: 'var(--color-danger)'}}>Socialising,</span> <br/>
                No more <span className="font-boris" style={{color: 'var(--color-danger)'}}>Endless</span><br/>
                <span className="font-boris" style={{color: 'var(--color-danger)'}}>Searching.</span>
            </p>

            <div className={styles.containerCards}>
                <div className={styles.containerCardsRow}>
                    <MoreHeroCard icon="megaphone" title="Create Your Club, Host Your Way"/>
                    <MoreHeroCard icon="balloon" title="Chat & Plan, All in One Place"/>
                </div>

                <div className={styles.containerCardsRow}>
                    <MoreHeroCard icon="heart" title="Build Real Friendships, Digitally"/>
                    <MoreHeroCard icon="mail" title="RSVP to Events That Spark Joy"/>
                </div>
            </div>
        </div>
    );
}