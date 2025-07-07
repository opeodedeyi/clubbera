'use client'

import PageWrapper from "@/components/ui/PageWrapper/PageWrapper";
import BackButton from "@/components/ui/BackButton/BackButton";
import styles from './AuthLayout.module.css';


export default function AuthLayout({ children, particleCount=2 }) {
    return (
        <PageWrapper showParticles={true} particleCount={particleCount} particlesHeight={300}>
            <div className={styles.container}>
                <BackButton className='self-start'/>

                <div className={styles.containerMain}>
                    {children}
                </div>
            </div>
        </PageWrapper>
    )
}