'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getS3ImageUrl } from '@/lib/s3Utils';
import { EventDetails, MembershipShort } from "@/types/event";
import EventImage from '../EventImage/EventImage';
import NextEventCard from '../NextEventCard/NextEventCard';
import ReservationStatusCard from '../ReservationStatusCard/ReservationStatusCard';
import EventButtons from '../EventButtons/EventButtons';
import EventTitleDescription from '../EventTitleDescription/EventTitleDescription';
import TimingInfo from '../TimingInfo/TimingInfo';
import EventHostInfo from '../EventHostInfo/EventHostInfo';
import BackButton from '@/components/ui/BackButton/BackButton';
import ShareModal from '@/components/ui/ShareModal/ShareModal';
import RSVPModal from '../RSVPModal/RSVPModal';
import { formatEventTime, formatCalendarDay, formatCalendarMonth } from '@/lib/utils/timezoneFormatter';
import { formatAttendanceStatus, getAttendanceButtonText, type AttendanceStatus } from '@/lib/utils/attendanceFormatter';
import styles from "./EventDetailsContent.module.css";


interface EventDetailsContentProps {
    initialEvent: EventDetails
    attendanceStatus: AttendanceStatus
    membership: MembershipShort
}

const EventDetailsContent: React.FC<EventDetailsContentProps> = ({ initialEvent, attendanceStatus, membership }: EventDetailsContentProps) => {
    const [showShareModal, setShowShareModal] = useState(false);
    const [showRSVPModal, setShowRSVPModal] = useState(false);
    const router = useRouter();

    const handleRSVPUpdate = (newStatus: 'attending' | 'not attending' | 'maybe') => {
        console.log('RSVP updated to:', newStatus);
        // Refresh the server component data to get updated attendance status
        router.refresh();
    };

    const manageURL = `/event/${initialEvent.id}/manage`;
    const showManage = membership.role === "owner" || membership.role === "organiser"
    const canUpdateRSVP = !initialEvent.hasPassed && !initialEvent.isOngoing;

    return (
        <>
            <div className={styles.container}>
                <BackButton />

                <div className={styles.content}>
                    <div className={styles.contentTop}>
                        <EventImage src={initialEvent.coverImage && getS3ImageUrl(initialEvent.coverImage.key)} />

                        <div className={styles.contentTopRight}>
                            {/* (status, title, imageSrc)next event card */}
                            <NextEventCard />

                            <ReservationStatusCard 
                                title={formatAttendanceStatus(attendanceStatus)} 
                                buttonText={canUpdateRSVP ? getAttendanceButtonText(attendanceStatus) : (initialEvent.hasPassed ? "Past Event" : "Is Ongoing")}
                                onUpdateRSVP={canUpdateRSVP ? () => setShowRSVPModal(true) : undefined}
                                isLoading={false}
                                className='desktop-only-flex' />
                        </div>
                    </div>

                    <div className={styles.contentBottom}>
                        <div className={styles.contentBottomLeft}>
                            {/* (supportURL, showGetSupport) buttons */}
                            <EventButtons manageURL={manageURL} onShare={() => setShowShareModal(true)} showManage={showManage} className='desktop-only-flex' />

                            <EventTitleDescription title={initialEvent.title} description={initialEvent.description}/>

                            <TimingInfo
                                time={formatEventTime(initialEvent.startTime, initialEvent.timezone)}
                                attendees={initialEvent.currentAttendees}
                                address={initialEvent.eventType === "physical" ? initialEvent.location.name || initialEvent.location.address : initialEvent.eventType }
                                calendarMonth={formatCalendarMonth(initialEvent.startTime, initialEvent.timezone)}
                                calendarDay={formatCalendarDay(initialEvent.startTime, initialEvent.timezone)}
                                className='tablet-mobile-flex' />

                            <EventHostInfo title={initialEvent.community.name} url={`/community/${initialEvent.community.uniqueUrl}`}/>

                            <ReservationStatusCard 
                                title={formatAttendanceStatus(attendanceStatus)} 
                                buttonText={canUpdateRSVP ? getAttendanceButtonText(attendanceStatus) : (initialEvent.hasPassed ? "Past Event" : "Is Ongoing")}
                                onUpdateRSVP={canUpdateRSVP ? () => setShowRSVPModal(true) : undefined}
                                isLoading={false}
                                className='tablet-mobile-flex' />

                            {/* (supportURL, showGetSupport) buttons */}
                            <EventButtons manageURL={manageURL} onShare={() => setShowShareModal(true)} showManage={showManage} className='tablet-mobile-flex' />
                        </div>

                        <div className={styles.contentBottomRight}>
                            <TimingInfo
                                time={formatEventTime(initialEvent.startTime, initialEvent.timezone)}
                                attendees={initialEvent.currentAttendees}
                                address={initialEvent.eventType === "physical" ? initialEvent.location?.name || initialEvent.location.address : initialEvent.eventType }
                                calendarMonth={formatCalendarMonth(initialEvent.startTime, initialEvent.timezone)}
                                calendarDay={formatCalendarDay(initialEvent.startTime, initialEvent.timezone)}
                                className='desktop-only-flex' />
                        </div>
                    </div>
                </div>
            </div>

            <ShareModal
                type="event"
                url={typeof window !== 'undefined' ? window.location.href : ''}
                isOpen={showShareModal}
                onClose={() => setShowShareModal(false)} />

            <RSVPModal
                isOpen={showRSVPModal}
                onClose={() => setShowRSVPModal(false)}
                eventId={initialEvent.id}
                currentStatus={attendanceStatus as 'attending' | 'not attending' | 'maybe'}
                onUpdateRSVP={handleRSVPUpdate} />
        </>
    )
}

export default EventDetailsContent