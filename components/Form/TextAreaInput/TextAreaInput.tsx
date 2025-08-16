'use client';

import { useState, useEffect, useRef, useCallback } from "react";
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
    const isAdjustingHeight = useRef(false);

    const adjustHeight = useCallback(() => {
        const textarea = textareaRef.current;
        if (!textarea || isAdjustingHeight.current) return;

        isAdjustingHeight.current = true;

        // iOS-specific: Store more viewport info
        const currentScrollY = window.scrollY;
        const currentScrollX = window.scrollX;
        // const visualViewport = window.visualViewport;
        
        // Prevent iOS WebKit from interfering
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        
        if (isIOS) {
            // Temporarily lock the viewport position
            document.body.style.position = 'fixed';
            document.body.style.top = `-${currentScrollY}px`;
            document.body.style.left = `-${currentScrollX}px`;
            document.body.style.width = '100%';
        }
        
        // Reset height
        textarea.style.height = 'auto';
        
        const scrollHeight = textarea.scrollHeight;
        const minRows = props.minRows || 2;
        const computedStyle = getComputedStyle(textarea);
        const lineHeight = parseInt(computedStyle.lineHeight);
        const padding = parseInt(computedStyle.paddingTop) + parseInt(computedStyle.paddingBottom);
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
        
        if (isIOS) {
            requestAnimationFrame(() => {
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.left = '';
                document.body.style.width = '';
                window.scrollTo(currentScrollX, currentScrollY);
                isAdjustingHeight.current = false;
            });
        } else {
            isAdjustingHeight.current = false;
        }
    }, [props.minRows, props.maxRows]);

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