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
        if (hasMore) {
            onPageChange(currentPage + 1)
        }
    }

    return (
        <div className={styles.pagination}>
            <button
                onClick={handlePrevious}
                disabled={currentPage <= 1}
                className={styles.button}
            >
                Previous
            </button>
            
            <span className={styles.pageInfo}>
                Page {currentPage} {totalPages > 0 && `of ${totalPages}`}
            </span>
            
            <button
                onClick={handleNext}
                disabled={!hasMore}
                className={styles.button}
            >
                Next
            </button>
        </div>
    )
}