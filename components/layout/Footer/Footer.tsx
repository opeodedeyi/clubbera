import BrandIcon from '@/components/ui/Icon/BrandIcon';
import Link from 'next/link';
import styles from './Footer.module.css'

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return(
        <footer className={styles.footer}>
            <div className={styles.footerMain}>
                <div className={styles.footerLink}>
                    <Link href="/"><BrandIcon name="clubbera" size="xl" /></Link>
                    <Link href="/" className={`${styles.linkItem} font-boris`}>Discover</Link>
                    <Link href="/" className={`${styles.linkItem} font-boris`}>Contact Us</Link>
                    <Link href="/" className={`${styles.linkItem} font-boris`}>Policy</Link>
                </div>

                <div className={styles.footerSocials}>
                    <Link href="/"><BrandIcon name="instagram" size="xl" color='var(--color-text-light)'/></Link>
                    <Link href="/"><BrandIcon name="x" size="lg" color='var(--color-text-light)'/></Link>
                </div>
            </div>

            <p className={styles.footerCopywrite}>&copy; Clubbera {currentYear}. All rights reserved.</p>
        </footer>
    )
}