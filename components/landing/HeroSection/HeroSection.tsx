import { IMAGES } from "@/lib/images";
import Button from "@/components/ui/Button/Button";
import styles from "./HeroSection.module.css";


interface HeroSectionProps {
    headline?: string;
    subHeadline?: string;
    ctaBtnText?: string;
}

export default function HeroSection({ headline, subHeadline, ctaBtnText }: HeroSectionProps) {
    return (
        <div className={styles.container}>
            <div className={`${styles.heroImage} ${styles.imageOne}`}>
                <img src={IMAGES.vectors.clubberaPurple} alt="Hero" />
            </div>

            <div className={`${styles.heroImage} ${styles.imageTwo}`}>
                <img src={IMAGES.vectors.clubberaPink} alt="Hero" />
            </div>

            <div className={styles.heroContent}>
                <div className={styles.heroText}>
                    <p className={styles.heroTitle}>
                        {headline}
                    </p>
                    <p className={styles.heroSubText}>
                        {subHeadline}
                    </p>
                </div>

                <Button
                    as="link"
                    variant="gray"
                    className={styles.heroButton}
                    href="/join">
                    {ctaBtnText}
                </Button>
            </div>

            <div className={`${styles.heroImage} ${styles.imageThree}`}>
                <img src={IMAGES.vectors.clubberaYellow} alt="Hero" />
            </div>
        </div>
    );
}