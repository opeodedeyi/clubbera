import { IMAGES } from "@/lib/images";
import BrandIcon from "@/components/ui/Icon/BrandIcon";
import styles from "./ForWho.module.css";


export default function ForWho() {
    return (
        <div className={styles.container}>
            <div className={styles.containerText}>
                <h6 className={styles.textTitle}>New Home for Real-World Communities.</h6>
                <p className={styles.textSubtitle}>Real people, real connections, real experiences, join a community that brings it all together.</p>
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