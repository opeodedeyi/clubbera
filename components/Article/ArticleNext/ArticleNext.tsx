import Link from 'next/link';
import styles from './AtricleNext.module.css';

interface ArticleMarkdownProps {
    url: string; 
    text: string;
}

export default function ArticleNext({ url, text }: ArticleMarkdownProps) {
    return (
        <div className={styles.container}>
            <p className={styles.label}>Next Article</p>
            <Link href={url} className={styles.link}>
                {text}
            </Link>
        </div>
    )
}