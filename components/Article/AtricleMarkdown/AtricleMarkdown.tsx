import styles from './AtricleMarkdown.module.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ArticleMarkdownProps {
    children?: React.ReactNode; 
    article: string;
}

export default function ArticleMarkdown({ children, article }: ArticleMarkdownProps) {
    return (
        <div className={styles.container}>
            <div className={styles.markdown}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {article}
                </ReactMarkdown>
            </div>
            {children} {/* will edit later as this will be recommendations by the side, only visible on desktop */}
        </div>
    )
}