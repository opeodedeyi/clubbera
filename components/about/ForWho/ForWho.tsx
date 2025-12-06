import { IMAGES } from "@/lib/images";
import styles from "./ForWho.module.css";


export default function ForWho() {
    return (
        <div className={styles.container}>
            <div className={styles.containerText}>
                <h6 className={styles.textTitle}>We believe nobody should feel like a stranger.</h6>
                <p className={styles.textSubtitle}>Clubbera exists because the best communities in the world shouldn&apos;t be the hardest to find.</p>
            </div>

            <div className={styles.imageWrapper}>
                <div className={styles.containerImage}>
                    <img src={IMAGES.pages.landing.feature1} alt="feature image" />
                </div>

                {/* navigation goes here */}
            </div>
        </div>
    );
}