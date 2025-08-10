// components/Form/ToggleSwitch/ToggleSwitch.tsx
'use client';

import React from 'react';
import Icon from '@/components/ui/Icon/Icon';
import styles from './ToggleSwitch.module.css';

interface ToggleOption {
    readonly icon?: 'group' | 'lock';
    readonly value: boolean;
    readonly label: string;
    readonly description?: string;
}

interface ToggleSwitchProps {
    options: readonly [ToggleOption, ToggleOption]; // Exactly 2 options
    value: boolean;
    onChange: (value: boolean) => void;
    disabled?: boolean;
    error?: string;
    variant?: 'community' | 'event';
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
    options,
    value,
    onChange,
    disabled = false,
    error,
    variant = 'community'
}) => {
    const [trueOption, falseOption] = options;

    const handleOptionClick = (optionValue: boolean) => {
        if (!disabled && value !== optionValue) {
            onChange(optionValue);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.toggleContainer}>
                {/* True Option */}
                <div 
                    className={`${styles.option} ${value === trueOption.value ? styles.selected : ''} ${styles[variant]} ${disabled ? styles.disabled : ''}`}
                    onClick={() => handleOptionClick(trueOption.value)}
                    data-variant={variant}>
                    <div className={styles.optionContent}>
                        <Icon name={trueOption.icon} className={styles.icon}/>
                        <div className={styles.optionContentText}>
                            <p className={styles.optionLabel}>{trueOption.label}</p>
                            <p className={styles.optionDescription}>{trueOption.description}</p>
                        </div>
                    </div>
                    <div className={styles.switchContainer}>
                        <div className={`${styles.switch} ${value === trueOption.value ? styles.switchOn : ''}`}
                            data-variant={variant}>
                            <div className={styles.switchThumb}></div>
                        </div>
                    </div>
                </div>

                {/* False Option */}
                <div 
                    className={`${styles.option} ${value === falseOption.value ? styles.selected : ''} ${styles[variant]} ${disabled ? styles.disabled : ''}`}
                    onClick={() => handleOptionClick(falseOption.value)}
                    data-variant={variant}>
                    <div className={styles.optionContent}>
                        <Icon name={falseOption.icon} className={styles.icon}/>
                        <div className={styles.optionContentText}>
                            <p className={styles.optionLabel}>{falseOption.label}</p>
                            <p className={styles.optionDescription}>{falseOption.description}</p>
                        </div>
                    </div>
                    <div className={styles.switchContainer}>
                        <div className={`${styles.switch} ${value === falseOption.value ? styles.switchOn : ''}`}
                            data-variant={variant}>
                            <div className={styles.switchThumb}></div>
                        </div>
                    </div>
                </div>
            </div>
            
            {error && <span className={styles.errorText}>{error}</span>}
        </div>
    );
};

export default ToggleSwitch;