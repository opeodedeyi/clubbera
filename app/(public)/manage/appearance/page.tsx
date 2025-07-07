'use client';

import { useTheme } from '@/hooks/useTheme';
import ManageAccount from '@/components/layout/ManageAccount/ManageAccount';
import ThemeButton from '@/components/Theme/ThemeButtons/ThemeButton';
import styles from "@/styles/pages/appearance.module.css";

export default function Appearance() {
    const { switchToDark, switchToLight, switchToColored } = useTheme()

    return (
        <ManageAccount>
            <div className={styles.contentOrder}>
                <h2>Display Theme</h2>

                <div className={styles.scrollContainer}>
                    <div className={styles.cardRow}>
                        <ThemeButton
                            onClick={switchToLight}
                            backgroundColor='#E7E7E7'
                            borderColor='#6D6D6D'>
                            Light</ThemeButton>
                        <ThemeButton
                            onClick={switchToDark}
                            backgroundColor='#92E491'
                            borderColor='#006633'>
                            Dark</ThemeButton>
                        <ThemeButton
                            onClick={switchToColored}
                            backgroundColorOuter='#E0F9DF'
                            backgroundColor='#F1FCF1'
                            borderColor='#92E491'>
                            Colored</ThemeButton>
                    </div>
                </div>
            </div>
        </ManageAccount>
    );
}