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
                <p className={styles.textTitle}>{title}</p>
                { subtitle && 
                    <p className={styles.textSubtitle}>{subtitle}</p>
                }
            </div>

            {children}
        </div>
    );
}