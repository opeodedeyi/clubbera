import Button from "@/components/ui/Button/Button";
import styles from "./JoinNow.module.css";


export default function JoinNow() {
    return (
        <div className={styles.container}>
            <div className={styles.containerMain}>
                <p className={styles.containerText}>Ready for <br /><span className={`font-boris color-default`}>Clubbera?</span></p>

                <p>Sign up today and start exploring events, clubs, and connections near you.</p>
            </div>

            <Button as="link" variant="default" href="/join">Join Clubbera</Button>
        </div>
    );
}