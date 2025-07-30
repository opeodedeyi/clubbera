import styles from "./ForWho.module.css";


export default function ForWho() {
    return (
        <div className={styles.container}>
            <p className={styles.containerTop}>
                Built for <br/>
                everyday <span className="font-boris" style={{color: 'var(--color-danger)'}}>Socialising,</span> <br/>
                No more <span className="font-boris" style={{color: 'var(--color-danger)'}}>Endless</span><br/>
                <span className="font-boris" style={{color: 'var(--color-danger)'}}>Searching.</span>
            </p>

            <div className={styles.containerCard}>
                
            </div>
        </div>
    );
}