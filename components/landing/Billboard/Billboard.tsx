import { IMAGES } from "@/lib/images";
import BrandIcon from "@/components/ui/Icon/BrandIcon";
import Button from "@/components/ui/Button/Button";
import styles from "./Billboard.module.css";


interface BillboardProps {
    title?: string;
    text?: string;
    btnText?: string;
    direction?: string;
    link?: string;
    variant?: string;
}

export default function Billboard({ title, text, btnText, direction, link, variant }: BillboardProps) {
    return (
        <div className={styles.container}>
            <div className={styles.backgroundBillboard}>
            <div className={styles.mainBillboard} style={{ rotate: direction === "left" ? "3deg" : direction === "right" ? "-3deg" : "0deg" }}>
                { variant === "baloon" ? (
                    <>
                        <div className={`${styles.billboardImage} ${styles.baloonOne}`}>
                            <img src={IMAGES.vectors.clubberaPurple} alt="Hero" />
                        </div>

                        <div className={`${styles.billboardImage} ${styles.baloonTwo}`}>
                            <img src={IMAGES.vectors.clubberaPink} alt="Hero" />
                        </div>

                        <div className={`${styles.billboardImage} ${styles.baloonThree}`}>
                            <img src={IMAGES.vectors.clubberaYellow} alt="Hero" />
                        </div>
                    </>
                ) : (
                    <>
                        <BrandIcon
                            name="clubberaHex"
                            className={`${styles.billboardImage} ${styles.imageOne}`} />
                        <BrandIcon
                            name="clubberaPlay"
                            color="var(--color-default)"
                            className={`${styles.billboardImage} ${styles.imageTwo}`} />
                        <BrandIcon
                            name="clubberaTriangle"
                            className={`${styles.billboardImage} ${styles.imageThree}`} />
                        <BrandIcon
                            name="clubberaOreo"
                            className={`${styles.billboardImage} ${styles.imageFour}`} />
                    </>
                )}

                <div className={styles.billboardText}>
                    <p className={styles.billboardTitle}>
                        {title}
                    </p>
                    <p className={styles.billboardSubText}>
                        {text}
                    </p>
                </div>

                <Button
                    as="link"
                    variant="gray"
                    className={styles.billboardButton}
                    href={`${link}`}>
                    {btnText}
                </Button>
            </div>
            </div>
        </div>
    );
}