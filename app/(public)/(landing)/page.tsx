import PageWrapper from "@/components/ui/PageWrapper/PageWrapper";
import styles from "@/styles/pages/landing.module.css";

export default function Landing() {
    return (
        <PageWrapper showParticles={true}>
            <h1>Hello My Friends</h1>
            <p className={styles.description}>
                This is a simple landing page built with Next.js and React.
            </p>
            <p className={styles.description}>
                It is designed to be clean and minimalistic, showcasing the power of modern web development.
            </p>
            <p className={styles.description}>
                Feel free to explore the code and customize it to your liking!
            </p>
            <p className={styles.description}>
                Happy coding!
            </p>
        </PageWrapper>
    );
}