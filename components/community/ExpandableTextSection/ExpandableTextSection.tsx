'use client';

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import styles from './ExpandableTextSection.module.css';

interface ExpandableTextSectionProps {
    title: string;
    content: string | null;
    maxLines?: number;
    enableMarkdown?: boolean;
    className?: string;
}

export default function ExpandableTextSection({ 
    title, 
    content, 
    maxLines = 7,
    enableMarkdown = false,
    className 
}: ExpandableTextSectionProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [shouldTruncate, setShouldTruncate] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const fullContentRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if (!content || !contentRef.current || !fullContentRef.current) return;

        const computedStyle = window.getComputedStyle(contentRef.current);
        const lineHeight = parseFloat(computedStyle.lineHeight);
        
        const maxHeight = lineHeight * maxLines;
        
        const fullHeight = fullContentRef.current.scrollHeight;
        setShouldTruncate(fullHeight > maxHeight);
    }, [content, maxLines]);

    if (!content) return null;

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };

    const renderContent = () => {
        if (enableMarkdown) {
            return (
                <ReactMarkdown
                    components={{
                        p: ({ children }) => <p className={styles.paragraph}>{children}</p>,
                        h1: ({ children }) => <h1 className={styles.h1}>{children}</h1>,
                        h2: ({ children }) => <h2 className={styles.h2}>{children}</h2>,
                        h3: ({ children }) => <h3 className={styles.h3}>{children}</h3>,
                        ul: ({ children }) => <ul className={styles.list}>{children}</ul>,
                        ol: ({ children }) => <ol className={styles.orderedList}>{children}</ol>,
                        li: ({ children }) => <li className={styles.listItem}>{children}</li>,
                        strong: ({ children }) => <strong className={styles.bold}>{children}</strong>,
                        em: ({ children }) => <em className={styles.italic}>{children}</em>,
                        a: ({ href, children }) => (
                            <a href={href} className={styles.link} target="_blank" rel="noopener noreferrer">
                                {children}
                            </a>
                        ),
                    }}>
                    {content}
                </ReactMarkdown>
            );
        }
        
        return <p className={styles.plainText}>{content}</p>;
    };
    
    return (
        <div className={`${styles.expandableTextSection} ${className || ''}`}>
            <h2 className={styles.title}>{title}</h2>

            <div 
                ref={fullContentRef}
                className={styles.hiddenContent}
                aria-hidden="true">
                {renderContent()}
            </div>
            
            {/* Visible content */}
            <div 
                ref={contentRef}
                className={`${styles.content} ${
                    shouldTruncate && !isExpanded ? styles.truncated : ''
                }`}
                style={{
                    '--max-lines': maxLines,
                } as React.CSSProperties}>
                {renderContent()}
            </div>
            
            {shouldTruncate && (
                <button 
                    onClick={toggleExpansion}
                    className={styles.toggleButton}
                    aria-expanded={isExpanded}>
                    {isExpanded ? 'View Less' : 'View All'}
                </button>
            )}
        </div>
    );
}