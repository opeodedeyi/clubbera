'use client';

import { useState, useEffect, useRef } from "react";
import styles from '../Input.module.css';


interface TextAreaInputProps {
    name: string;
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    onFocus?: () => void;
    maxLength?: number;
    minRows?: number;
    maxRows?: number;
    disabled?: boolean;
    isRequired?: boolean;
    error?: string;
}

const TextAreaInput: React.FC<TextAreaInputProps> = (props) => {
    const [charCount, setCharCount] = useState(0);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        textarea.style.height = 'auto';

        const scrollHeight = textarea.scrollHeight;

        const minRows = props.minRows || 2;
        const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
        const padding = parseInt(getComputedStyle(textarea).paddingTop) * 2;
        const minHeight = (lineHeight * minRows) + padding;

        let maxHeight = scrollHeight;
        if (props.maxRows) {
            maxHeight = Math.min(scrollHeight, (lineHeight * props.maxRows) + padding);
        }

        const newHeight = Math.max(minHeight, Math.min(scrollHeight, maxHeight));
        textarea.style.height = `${newHeight}px`;

        if (props.maxRows && scrollHeight > maxHeight) {
            textarea.style.overflowY = 'auto';
        } else {
            textarea.style.overflowY = 'hidden';
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        props.onChange(e.target.value);
        setCharCount(e.target.value.length);
        setTimeout(adjustHeight, 0);
    };

    useEffect(() => {
        if (props.value) {
            setCharCount(props.value.length);
        }
        setTimeout(adjustHeight, 0);
    }, [props.value]);

    useEffect(() => {
        adjustHeight();
    }, []);
    
    return (
        <div className={styles.inputContainer}>
            <label className={styles.formLabel} htmlFor={props.name}>{props.label}</label>

            <div className={styles.textareaWrapper}>
                <textarea
                    ref={textareaRef}
                    id={props.name}
                    className={styles.textAreaInput}
                    name={props.name}
                    placeholder={props.placeholder}
                    value={props.value || ''}
                    onFocus={props.onFocus}
                    onChange={handleChange}
                    maxLength={props.maxLength}
                    disabled={props.disabled}
                    required={props.isRequired} />
                {props.maxLength && (
                    <div className={styles.charCount}>
                        {charCount}/{props.maxLength} characters
                    </div>
                )}
            </div>

            {props.error && <span className={styles.errorText}>{props.error}</span>}
        </div>
    );
}

export default TextAreaInput;