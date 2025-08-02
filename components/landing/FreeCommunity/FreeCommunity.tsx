import Button from "@/components/ui/Button/Button";
import BrandIcon from "@/components/ui/Icon/BrandIcon";
import styles from "./FreeCommunity.module.css";


export default function FreeCommunity() {
    return (
        <div className={styles.container}>
            <div className={styles.containerMain}>
                <h2 className={styles.containerText}>Creating a Community <br />is Free</h2>

                <p>Building your Community on Clubbera is free. Focus on the things that matter and worry less about the cost.</p>

                <BrandIcon className={styles.design1} name="clubberaGame" size="lg" color="var(--color-default)" />
                <BrandIcon className={styles.design2} name="clubberaTriangle" size="lg" />
                <BrandIcon className={styles.design3} name="clubberaTaiwo" size="xl" color="var(--color-event)"/>
            </div>

            <Button as="link" variant="plain" href="/login">Create Free Community</Button>
        </div>
    );
}