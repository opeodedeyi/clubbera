import { IMAGES } from "@/lib/images";
import BrandIcon from "@/components/ui/Icon/BrandIcon";
import styles from "./ForWho.module.css";


function Tag({ text, className='', selected=false }: { text: string, className?: string, selected?: boolean }) {
    return (
        <div className={`${styles.mainTag} ${className} ${selected ? styles.selectedTag : ''}`}>
            <span className={styles.tag}>{text}</span>
        </div>
    );
}

export default function ForWho() {
    return (
        <div className={styles.container}>

            <div className={styles.containerTop}>
                <h1 className={styles.containerText}>Clubbera is built for <br />every player.</h1>

                <div className={styles.containerTags}>
                    <Tag text="Marvel" className="desktop-only-flex" />
                    <Tag text="Football" selected/>
                    <Tag text="Yoga" />
                    <Tag text="& Many More" />
                </div>

                <BrandIcon className={styles.design1} name="clubberaHex" size="lg" color="var(--color-default)" />
                <BrandIcon className={styles.design2} name="clubberaPlay" size="lg" />
                <BrandIcon className={styles.design3} name="clubberaOreo" size="xl" />
            </div>

            <div className={styles.imageWrapper}>
                <div className={styles.containerImage}>
                    <img src={IMAGES.pages.landing.feature1} alt="feature image" />

                    <BrandIcon className={styles.design4} name="clubbera" size="xxxl" />
                </div>

                {/* colored character goes here */}
            </div>
        </div>
    );
}