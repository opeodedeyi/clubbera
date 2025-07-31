import { IMAGES } from "@/lib/images";
import Button from "@/components/ui/Button/Button";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
    return (
        <div className={styles.container}>
            <div className={styles.heroContent}>
                <div className={styles.heroText}>
                    <p className={styles.heroTitle}>
                        Discover, <br className="desktop-only-flex"/>
                        Connect <span className="font-boris">&<br className="tablet-mobile-flex"/></span> Thrive <br className="desktop-only-flex"/> 
                        with <span className="font-boris" style={{color: 'var(--color-default)'}}>Clubbera.</span>
                    </p>
                    <p className={styles.heroSubText}>
                        Real people, real connections, real experiences - join a community that brings it all together.
                    </p>
                </div>

                <Button
                    as="link"
                    variant="default"
                    className={styles.heroButton}
                    href="/join">
                    Get Started
                </Button>
            </div>

            <div className={styles.heroImage}>
                <img src={IMAGES.pages.landing.heroImage} alt="Hero" />
            </div>
        </div>
    );
}