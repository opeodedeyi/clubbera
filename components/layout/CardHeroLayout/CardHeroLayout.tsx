import styles from "./CardHeroLayout.module.css";

interface CardHeroLayoutProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}

export default function CardHeroLayout({ title, subtitle, children }: CardHeroLayoutProps) {
    return (
        <div className={styles.container}>
            <div className={styles.containerText}>
                <h5 className={styles.textTitle}>{title}</h5>
                { subtitle && 
                    <p className={styles.textSubtitle}>{subtitle}</p>
                }
            </div>

            <div className={styles.cardsContainer}>
                {children}
            </div>
        </div>
    );
}