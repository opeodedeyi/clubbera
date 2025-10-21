import Link from 'next/link';
import { IMAGES } from '@/lib/images';
import Icon from '@/components/ui/Icon/Icon';
import { getS3ImageUrl } from '@/lib/s3Utils';
import { formatEventDate } from '@/lib/utils/dateFormatter';
import type { Post, PostImage } from '@/lib/types/posts';
import styles from './PostCard.module.css';

interface coverImage {
    id: number;
    alt_text: string | null;
    key: string;
    provider: string;
}

interface EventData {
    id?: number;
    title?: string;
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
    selectedPollOptions: number[];
    onPollOptionClick: (index: number) => void;
    onPollSubmit: () => void;
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
    selectedPollOptions,
    onPollOptionClick,
    onPollSubmit,
    isPollSubmitting
}: PostCardContentProps) {
    console.log(eventData);
    

    return (
        <div className={styles.content}>
            <p>{content}</p>

            {/* Post type: regular post with optional images */}
            {contentType === 'post' && images && images.length > 0 && (
                <div className={styles.imageContainer}>
                    <img
                        src={getS3ImageUrl(images[0].key)}
                        alt={images[0].alt_text || images[0].altText || ''}
                        className={styles.postImage} />
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
                            const isSelected = selectedPollOptions.includes(index);

                            return (
                                <div
                                    key={index}
                                    className={`${styles.pollOption} ${isVoted ? styles.pollOptionVoted : ''} ${isSelected ? styles.pollOptionSelected : ''}`}
                                    onClick={() => onPollOptionClick(index)}
                                    style={{ cursor: userHasVoted ? 'default' : 'pointer' }}>
                                    <div className={styles.pollOptionBar} style={{ width: `${percentage}%` }} />
                                    <div className={styles.pollOptionContent}>
                                        <span className={styles.pollOptionText}>{option.text}</span>
                                        <span className={styles.pollOptionVotes}>
                                            {percentage}% ({option.votes || 0})
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {!userHasVoted && selectedPollOptions.length > 0 && (
                        <button
                            onClick={onPollSubmit}
                            className={styles.pollSubmitButton}
                            disabled={isPollSubmitting}>
                            {isPollSubmitting ? 'Voting...' : 'Submit Vote'}
                        </button>
                    )}
                </div>
            )}

            {/* Post type: event */}
            {contentType === 'event' && eventData && (
                <Link href={`/event/${eventData.id}`} className={styles.eventCard}>
                    <div className={styles.eventTextContainer}>
                        <div className={styles.eventDatenAttendance}>
                            <p className={styles.eventDate}>{formatEventDate(eventData.start_time)}</p>
                            <div className={styles.eventAttendance}>
                                <Icon name="group" size='sm' color='var(--color-event)' />
                                <p>{eventData.current_attendees}</p>
                            </div>
                        </div>
                        <div className={styles.eventTitle}>{eventData.title}</div>
                    </div>

                    <div className={styles.eventImageContainer}>
                        <img
                            src={getS3ImageUrl(eventData.cover_image?.key || IMAGES.pages.communities.placeholder)}
                            alt="Event"
                            className={styles.eventImage} />
                    </div>
                </Link>
            )}
        </div>
    );
}
