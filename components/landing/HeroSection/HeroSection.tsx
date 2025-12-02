import { IMAGES } from "@/lib/images";
import Button from "@/components/ui/Button/Button";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
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
                        Start a community that brings it all together.
                    </p>
                    <p className={styles.heroSubText}>
                        Real people, real connections, real experiences, join a community that brings it all together.
                    </p>
                </div>

                <Button
                    as="link"
                    variant="gray"
                    className={styles.heroButton}
                    href="/join">
                    Join Clubbera
                </Button>
            </div>

            <div className={`${styles.heroImage} ${styles.imageThree}`}>
                <img src={IMAGES.vectors.clubberaYellow} alt="Hero" />
            </div>
        </div>
    );
}