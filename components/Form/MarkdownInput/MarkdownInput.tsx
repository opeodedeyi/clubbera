'use client';

import { useRef } from "react";
import Icon from '@/components/ui/Icon/Icon';
import styles from '../Input.module.css';
import markdownStyles from './MarkdownInput.module.css';

interface MarkdownInputProps {
    name: string;
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    onFocus?: () => void;
    rows?: number; // Fixed height in rows
    disabled?: boolean;
    isRequired?: boolean;
    error?: string;
}

const MarkdownInput: React.FC<MarkdownInputProps> = (props) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        props.onChange(e.target.value);
    };

    const insertMarkdown = (before: string, after: string = '', placeholder: string = '') => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);
        const textToInsert = selectedText || placeholder;
        
        const newText = 
            textarea.value.substring(0, start) + 
            before + textToInsert + after + 
            textarea.value.substring(end);

        props.onChange(newText);

        // Set cursor position after insertion
        setTimeout(() => {
            if (selectedText) {
                // If text was selected, place cursor after the formatted text
                textarea.setSelectionRange(start + before.length + textToInsert.length + after.length, start + before.length + textToInsert.length + after.length);
            } else {
                // If no text selected, place cursor between the markdown syntax
                textarea.setSelectionRange(start + before.length, start + before.length + textToInsert.length);
            }
            textarea.focus();
        }, 0);
    };

    const insertLink = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);
        
        const linkText = selectedText || 'link text';
        const linkMarkdown = `[${linkText}](url)`;
        
        const newText = 
            textarea.value.substring(0, start) + 
            linkMarkdown + 
            textarea.value.substring(end);

        props.onChange(newText);

        // Place cursor on 'url' part for easy editing
        setTimeout(() => {
            const urlStart = start + linkText.length + 3; // [linktext](|url)
            const urlEnd = urlStart + 3; // length of 'url'
            textarea.setSelectionRange(urlStart, urlEnd);
            textarea.focus();
        }, 0);
    };

    const insertList = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);
        
        let listText;
        if (selectedText) {
            // Convert selected text to list items
            const lines = selectedText.split('\n').filter(line => line.trim());
            listText = lines.map(line => `- ${line.trim()}`).join('\n');
        } else {
            listText = '- List item';
        }
        
        const newText = 
            textarea.value.substring(0, start) + 
            listText + 
            textarea.value.substring(end);

        props.onChange(newText);

        setTimeout(() => {
            textarea.setSelectionRange(start + listText.length, start + listText.length);
            textarea.focus();
        }, 0);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        // Keyboard shortcuts
        if (e.metaKey || e.ctrlKey) {
            switch (e.key) {
                case 'b':
                    e.preventDefault();
                    insertMarkdown('**', '**', 'bold text');
                    break;
                case 'i':
                    e.preventDefault();
                    insertMarkdown('*', '*', 'italic text');
                    break;
                case 'u':
                    e.preventDefault();
                    insertMarkdown('<u>', '</u>', 'underlined text');
                    break;
                case 'k':
                    e.preventDefault();
                    insertLink();
                    break;
            }
        }
    };
    
    return (
        <div className={styles.inputContainer}>
            <label className={styles.formLabel} htmlFor={props.name}>
                {props.label}
            </label>

            <div className={styles.textareaWrapper}>
                {/* Markdown Toolbar - Now on top */}
                <div className={markdownStyles.toolbar}>
                    <button
                        type="button"
                        onClick={() => insertMarkdown('# ', '', 'Heading')}
                        className={markdownStyles.toolbarButton}
                        title="Header"
                        disabled={props.disabled}>
                        <Icon name="heading" size="sm" />
                    </button>
                    
                    <button
                        type="button"
                        onClick={() => insertMarkdown('**', '**', 'bold text')}
                        className={markdownStyles.toolbarButton}
                        title="Bold (Ctrl+B)"
                        disabled={props.disabled}>
                        <Icon name="bold" size="sm" />
                    </button>
                    
                    <button
                        type="button"
                        onClick={() => insertMarkdown('*', '*', 'italic text')}
                        className={markdownStyles.toolbarButton}
                        title="Italic (Ctrl+I)"
                        disabled={props.disabled}>
                        <Icon name="italic" size="sm" />
                    </button>
                    
                    <button
                        type="button"
                        onClick={() => insertMarkdown('<u>', '</u>', 'underlined text')}
                        className={markdownStyles.toolbarButton}
                        title="Underline (Ctrl+U)"
                        disabled={props.disabled}>
                        <Icon name="underline" size="sm" />
                    </button>
                    
                    <button
                        type="button"
                        onClick={insertLink}
                        className={markdownStyles.toolbarButton}
                        title="Link (Ctrl+K)"
                        disabled={props.disabled}>
                        <Icon name="link" size="sm" />
                    </button>
                    
                    <button
                        type="button"
                        onClick={insertList}
                        className={markdownStyles.toolbarButton}
                        title="Unordered List"
                        disabled={props.disabled}>
                        <Icon name="list" size="sm" />
                    </button>
                </div>

                {/* Fixed height textarea with scroll */}
                <textarea
                    ref={textareaRef}
                    id={props.name}
                    className={`${styles.textAreaInput} ${markdownStyles.markdownTextarea}`}
                    name={props.name}
                    placeholder={props.placeholder}
                    value={props.value || ''}
                    onFocus={props.onFocus}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    rows={props.rows || 6}
                    disabled={props.disabled}
                    required={props.isRequired}
                />
            </div>

            {props.error && <span className={styles.errorText}>{props.error}</span>}
        </div>
    );
};

export default MarkdownInput;