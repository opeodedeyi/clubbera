import Icon from '@/components/ui/Icon/Icon'
import styles from './Pagination.module.css'

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    hasMore: boolean
}

export default function Pagination({ currentPage, totalPages, onPageChange, hasMore }: PaginationProps) {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1)
        }
    }

    const handleNext = () => {
        if (currentPage < totalPages || hasMore) {
            onPageChange(currentPage + 1)
        }
    }

    const renderPageNumbers = () => {
        if (totalPages <= 0) return null

        const pages = []
        const maxVisiblePages = 5
        
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)
        
        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1)
        }

        if (startPage > 1) {
            pages.push(
                <button
                    key={1}
                    onClick={() => onPageChange(1)}
                    className={styles.pageNumber}>
                    1
                </button>
            )
            if (startPage > 2) {
                pages.push(<span key="start-ellipsis" className={styles.ellipsis}>...</span>)
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`${styles.pageNumber} ${i === currentPage ? styles.active : ''}`}>
                    {i}
                </button>
            )
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push(<span key="end-ellipsis" className={styles.ellipsis}>...</span>)
            }
            pages.push(
                <button
                    key={totalPages}
                    onClick={() => onPageChange(totalPages)}
                    className={styles.pageNumber}>
                    {totalPages}
                </button>
            )
        }

        return pages
    }

    return (
        <div className={styles.pagination}>
            <button
                onClick={handlePrevious}
                disabled={currentPage <= 1}
                className={styles.arrowButton}>
                <Icon name="arrowLeft" size='sm' />
            </button>
            
            <div className={styles.pageNumbers}>
                {renderPageNumbers()}
            </div>
            
            <button
                onClick={handleNext}
                disabled={!hasMore && currentPage >= totalPages}
                className={styles.arrowButton}>
                <Icon name="arrowRight" size='sm' />
            </button>
        </div>
    )
}