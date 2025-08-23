'use client';

import { useState } from 'react';
import styles from '../Input.module.css';

interface PasswordInputProps {
    name: string;
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    isRequired?: boolean;
    disabled?: boolean;
    error?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = (props) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(e.target.value);
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className={styles.inputContainer}>
            <label className={styles.formLabel} htmlFor={props.name}>{props.label}</label>

            <div className={styles.formInputPassword}>
                <input
                    id={props.name}
                    name={props.name}
                    className={styles.formInput}
                    placeholder={props.placeholder}
                    value={props.value || ''}
                    onChange={handleChange}
                    required={props.isRequired}
                    disabled={props.disabled}
                    type={isPasswordVisible ? "text" : "password"} />

                <span className={styles.eyeIcon} onClick={togglePasswordVisibility}>
                    {isPasswordVisible ? (
                        <span></span>
                    ) : (
                        <span></span>
                    )}
                </span>
            </div>

            {props.error && <span className={styles.errorText}>{props.error}</span>}
        </div>
    );
}

export default PasswordInput;