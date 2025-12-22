import { useState } from 'react';
import Link from 'next/link';
import { IMAGES } from '@/lib/images';
import Icon from '@/components/ui/Icon/Icon';
import { getS3ImageUrl } from '@/lib/s3Utils';
import { formatEventDate } from '@/lib/utils/dateFormatter';
import type { Post, PostImage } from '@/lib/types/posts';
import styles from './PostCardContent.module.css';

interface coverImage {
    id: number;
    alt_text: string | null;
    key: string;
    provider: string;
}

interface EventData {
    id?: number;
    title?: string;
    description?: string;
    start_time?: string;
    location?: string;
    unique_url: string;
    cover_image?: coverImage;
    current_attendees?: number;
}

interface PostCardContentProps {
    content: string;
    contentType: 'post' | 'poll' | 'event';
    images?: PostImage[];
    eventData?: EventData;
    pollData?: Post['poll_data'];
    userHasVoted?: boolean;
    userVote?: Post['userVote'];
    onPollOptionClick: (index: number) => void;
    isPollSubmitting: boolean;
}

export default function PostCardContent({
    content,
    contentType,
    images,
    eventData,
    pollData,
    userHasVoted,
    userVote,
    onPollOptionClick,
    isPollSubmitting
}: PostCardContentProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
    const [isExpanded, setIsExpanded] = useState(false);

    const isPollEnded = (endDate: string | null) => {
        if (!endDate) return false;
        const now = new Date().getTime();
        const end = new Date(endDate).getTime();
        return end - now <= 0;
    };

    const getTimeRemaining = (endDate: string | null) => {
        if (!endDate) return null;

        const now = new Date().getTime();
        const end = new Date(endDate).getTime();
        const diff = end - now;

        if (diff <= 0) return 'Ended';

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        if (days > 0) return `${days}d ${hours}h left`;
        if (hours > 0) return `${hours}h ${minutes}m left`;
        return `${minutes}m left`;
    };

    const handlePrevImage = () => {
        if (images && currentImageIndex > 0 && !isTransitioning) {
            setSlideDirection('left');
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentImageIndex(currentImageIndex - 1);
                setIsTransitioning(false);
            }, 300);
        }
    };

    const handleNextImage = () => {
        if (images && currentImageIndex < images.length - 1 && !isTransitioning) {
            setSlideDirection('right');
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentImageIndex(currentImageIndex + 1);
                setIsTransitioning(false);
            }, 300);
        }
    };

    return (
        <div className={styles.content}>
            { content && contentType !== 'event' && contentType !== 'poll' &&
                <div className={styles.contentTextWrapper}>
                    <p className={`${styles.contentText} ${!isExpanded ? styles.contentTextClamped : ''}`}>
                        {content}
                    </p>
                    {!isExpanded && (
                        <span
                            className={styles.showMoreButton}
                            onClick={() => setIsExpanded(true)}>
                            ...more
                        </span>
                    )}
                </div>
            }

            {/* Post type: regular post with optional images */}
            {contentType === 'post' && images && images.length > 0 && (
                <div className={styles.imageCarousel}>
                    <div className={styles.imageContainer}>
                        <img
                            src={getS3ImageUrl(images[currentImageIndex].key)}
                            alt={images[currentImageIndex].alt_text || images[currentImageIndex].altText || ''}
                            className={`${styles.postImage} ${isTransitioning ? (slideDirection === 'right' ? styles.slideOutLeft : styles.slideOutRight) : styles.slideIn}`}
                            key={currentImageIndex} />
                    </div>

                    {/* Navigation arrows */}
                    {images.length > 1 && (
                        <>
                            {currentImageIndex > 0 && (
                                <button
                                    className={`${styles.carouselButton} ${styles.carouselButtonLeft}`}
                                    onClick={handlePrevImage}
                                    aria-label="Previous image">
                                    <Icon name="arrowLeft" size="md" color="white" />
                                </button>
                            )}
                            {currentImageIndex < images.length - 1 && (
                                <button
                                    className={`${styles.carouselButton} ${styles.carouselButtonRight}`}
                                    onClick={handleNextImage}
                                    aria-label="Next image">
                                    <Icon name="arrowRight" size="md" color="white" />
                                </button>
                            )}
                        </>
                    )}

                    {/* Image indicators */}
                    {images.length > 1 && (
                        <div className={styles.imageIndicators}>
                            {images.map((_, index) => (
                                <div
                                    key={index}
                                    className={`${styles.indicator} ${index === currentImageIndex ? styles.indicatorActive : ''}`} />
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Post type: poll */}
            {contentType === 'poll' && pollData && (
                <div className={styles.pollContainer}>
                    <div className={styles.pollQuestion}>{pollData.question}</div>
                    <div className={styles.pollOptions}>
                        {pollData.options.map((option, index) => {
                            const totalVotes = pollData.options.reduce((sum, opt) => sum + (opt.votes || 0), 0);
                            const percentage = totalVotes > 0 ? ((option.votes || 0) / totalVotes * 100).toFixed(1) : 0;
                            const isVoted = userVote?.optionIndices.includes(index);
                            const pollEnded = isPollEnded(pollData.settings.endDate);
                            const showResults = userHasVoted || pollEnded;

                            // Determine state class
                            let stateClass = styles.pollOptionNotVoted;
                            if (pollEnded) {
                                stateClass = styles.pollOptionEnded;
                            } else if (userHasVoted) {
                                stateClass = styles.pollOptionVotedActive;
                            }

                            // Set minimum bar width for visibility
                            const barWidth = showResults && Number(percentage) === 0 ? 1 : percentage;

                            return (
                                <div
                                    key={index}
                                    className={`${styles.pollOption} ${stateClass} ${isPollSubmitting ? styles.pollOptionDisabled : ''}`}
                                    onClick={() => onPollOptionClick(index)}
                                    style={{ cursor: userHasVoted || isPollSubmitting || pollEnded ? 'default' : 'pointer' }}>
                                    {showResults && <div className={styles.pollOptionBar} style={{ width: `${barWidth}%` }} />}
                                    <div className={styles.pollOptionContent}>
                                        <div className={styles.pollOptionLeft}>
                                            <span className={styles.pollOptionText}>{option.text}</span>
                                            {isVoted && userHasVoted && <Icon name="check" size="sm" color="var(--color-text)" />}
                                        </div>
                                        {showResults && (
                                            <span className={styles.pollOptionVotes}>
                                                {percentage}%
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className={styles.pollFooter}>
                        <span className={styles.pollVoteCount}>
                            {pollData.options.reduce((sum, opt) => sum + (opt.votes || 0), 0)} votes
                        </span>
                        <span>•</span>
                        {pollData.settings.endDate && (
                            <span className={styles.pollTimeRemaining}>
                                {getTimeRemaining(pollData.settings.endDate)}
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* Post type: event */}
            {contentType === 'event' && eventData && (
                <Link href={`/event/${eventData.id}`} className={styles.eventCard}>
                    <div className={styles.eventTextContainer}>
                        <div className={styles.eventMainText}>
                            <p className={styles.eventTitle}>{eventData.title}</p>
                            
                            <p className={styles.eventDescription}>{eventData.description}</p>
                        </div>

                        <div className={styles.eventDetails}>
                            <div className={styles.eventSameRow}>
                                <Icon name="calendar" size='sm' color='var(--color-event)' />
                                <p>Starting {formatEventDate(eventData.start_time)}</p>
                            </div>

                            <div className={styles.eventSameRow}>
                                <Icon name="group" size='sm' color='var(--color-community)' />
                                <p>{eventData.current_attendees}</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.eventImageContainer}>
                        <img
                            src={getS3ImageUrl(eventData.cover_image?.key) || IMAGES.pages.communities.cover}
                            alt="Event"
                            className={styles.eventImage} />
                    </div>
                </Link>
            )}
        </div>
    );
}
