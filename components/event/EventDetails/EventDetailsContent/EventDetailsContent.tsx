'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { EventDetails, MembershipShort } from "@/types/event";
// import { updateRSVP } from '@/lib/api/events';
import EventImage from '../EventImage/EventImage';
import NextEventCard from '../NextEventCard/NextEventCard';
import ReservationStatusCard from '../ReservationStatusCard/ReservationStatusCard';
import EventButtons from '../EventButtons/EventButtons';
import EventTitleDescription from '../EventTitleDescription/EventTitleDescription';
import TimingInfo from '../TimingInfo/TimingInfo';
import EventHostInfo from '../EventHostInfo/EventHostInfo';
import BackButton from '@/components/ui/BackButton/BackButton';
import { formatEventTime, formatCalendarDay, formatCalendarMonth } from '@/lib/utils/timezoneFormatter';
import { formatAttendanceStatus, getAttendanceButtonText, type AttendanceStatus } from '@/lib/utils/attendanceFormatter';
import styles from "./EventDetailsContent.module.css";


interface EventDetailsContentProps {
    initialEvent: EventDetails
    attendanceStatus: AttendanceStatus
    membership: MembershipShort
}

const EventDetailsContent: React.FC<EventDetailsContentProps> = ({ initialEvent, attendanceStatus, membership }: EventDetailsContentProps) => {
    const [isUpdatingRSVP, setIsUpdatingRSVP] = useState(false)
    const [userIsAttending, setUserIsAttending] = useState(attendanceStatus === 'attending') // Initialize from API data
    const router = useRouter()

    console.log('EventDetailsContent - attendanceStatus:', attendanceStatus)
    console.log('EventDetailsContent - userIsAttending:', userIsAttending)

    // const handleRSVPUpdate = async () => {
    //     setIsUpdatingRSVP(true)
    //     try {
    //         const response = await updateRSVP(event.id)
    //         setUserIsAttending(response.isAttending)
    //         setEvent(prev => ({
    //             ...prev,
    //             currentAttendees: response.attendeeCount,
    //             attendeeCount: response.attendeeCount
    //         }))
    //     } catch (error) {
    //         console.error('Failed to update RSVP:', error)
    //         // Handle error (show toast, etc.)
    //     } finally {
    //         setIsUpdatingRSVP(false)
    //     }
    // }

    const manageURL = `/event/${initialEvent.id}/manage`;
    const canUpdateRSVP = !initialEvent.hasPassed && membership.role === "owner" || "organiser";
    // const canEdit = false // TODO: Determine user permissions from userContext

    return (
        <div className={styles.container}>
            <BackButton />

            <div className={styles.content}>
                <div className={styles.contentTop}>
                    <EventImage />

                    <div className={styles.contentTopRight}>
                        {/* (status, title, imageSrc)next event card */}
                        <NextEventCard />

                        <ReservationStatusCard 
                            title={formatAttendanceStatus(attendanceStatus)} 
                            buttonText={getAttendanceButtonText(attendanceStatus)}
                            className='desktop-only-flex' />
                    </div>
                </div>

                <div className={styles.contentBottom}>
                    <div className={styles.contentBottomLeft}>
                        {/* (onShare, supportURL, showGetSupport) buttons */}
                        <EventButtons manageURL={manageURL} showManage={canUpdateRSVP} className='desktop-only-flex' />

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
                            buttonText={getAttendanceButtonText(attendanceStatus)}
                            className='tablet-mobile-flex' />

                        {/* (onShare, supportURL, showGetSupport) buttons */}
                        <EventButtons manageURL={manageURL} showManage={canUpdateRSVP} className='tablet-mobile-flex' />
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
    )
}

export default EventDetailsContent