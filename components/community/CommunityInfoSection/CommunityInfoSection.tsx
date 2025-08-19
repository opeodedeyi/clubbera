import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './CommunityInfoSection.module.css';

interface CommunityInfoSectionProps {
    title: string;
    content: string | null;
    enableMarkdown?: boolean;
    memberCount?: number | null;
    maxLines?: number | null;
    className?: string;
}

export default function CommunityInfoSection({ 
    title, 
    content, 
    enableMarkdown = false,
    memberCount,
    maxLines = 7,
    className 
}: CommunityInfoSectionProps) {
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
                        h4: ({ children }) => <h4 className={styles.h4}>{children}</h4>,
                        ul: ({ children }) => <ul className={styles.list}>{children}</ul>,
                        ol: ({ children }) => <ol className={styles.orderedList}>{children}</ol>,
                        li: ({ children }) => <li className={styles.listItem}>{children}</li>,
                        strong: ({ children }) => <strong className={styles.bold}>{children}</strong>,
                        em: ({ children }) => <em className={styles.italic}>{children}</em>,
                        code: ({ children }) => <code className={styles.inlineCode}>{children}</code>,
                        pre: ({ children }) => <pre className={styles.codeBlock}>{children}</pre>,
                        blockquote: ({ children }) => <blockquote className={styles.blockquote}>{children}</blockquote>,
                        a: ({ href, children }) => (
                            <a 
                                href={href} 
                                className={styles.link} 
                                target="_blank" 
                                rel="noopener noreferrer">
                                {children}
                            </a>
                        ),
                        hr: () => <hr className={styles.divider} />,
                    }}>
                    {content}
                </ReactMarkdown>
            );
        }
        
        return <div className={styles.plainText}>{content}</div>;
    };

    const formatMemberCount = (count: number) => {
        if (count >= 1000000) {
            return `${(count / 1000000).toFixed(1)}M`;
        } else if (count >= 1000) {
            return `${(count / 1000).toFixed(1)}K`;
        }
        return count.toString();
    };

    return (
        <div className={`${styles.communityInfoSection} ${className || ''}`}>
            <h2 className={styles.title}>{title}</h2>

            <div 
                ref={fullContentRef}
                className={styles.hiddenContent}
                aria-hidden="true">
                {renderContent()}
            </div>

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
                    {isExpanded ? 'Show less' : 'Show more'}
                </button>
            )}

            <div className={styles.statsRow}>
                {memberCount !== undefined && memberCount !== null && (
                    <div className={styles.statBadge}>
                        <span className={styles.statTitle}>
                            {formatMemberCount(memberCount)}
                        </span>
                        <span className={styles.statNumber}>
                            {memberCount === 1 ? 'Member' : 'members'}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}