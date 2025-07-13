'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { EventDetails } from "@/types/event";
// import { updateRSVP } from '@/lib/api/events';
import EventImage from '../EventImage/EventImage';
import NextEventCard from '../NextEventCard/NextEventCard';
import ReservationStatusCard from '../ReservationStatusCard/ReservationStatusCard';
import EventButtons from '../EventButtons/EventButtons';
import EventTitleDescription from '../EventTitleDescription/EventTitleDescription';
import TimingInfo from '../TimingInfo/TimingInfo';
import EventHostInfo from '../EventHostInfo/EventHostInfo';
import BackButton from '@/components/ui/BackButton/BackButton';
import styles from "./EventDetailsContent.module.css";


interface EventDetailsContentProps {
    initialEvent: EventDetails
}

const EventDetailsContent: React.FC<EventDetailsContentProps> = ({ initialEvent }: EventDetailsContentProps) => {
    const [
        event,
        // setEvent
    ] = useState<EventDetails>(initialEvent)
    const [isUpdatingRSVP,
        // setIsUpdatingRSVP
    ] = useState(false)
    const [userIsAttending,
        // setUserIsAttending
    ] = useState(false) // You'll need to get this from user data
    const router = useRouter()

    console.log(isUpdatingRSVP, userIsAttending, router)

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

    const manageURL = `/event/${event.uniqueUrl}/manage`
    // const canUpdateRSVP = !event.isPastEvent
    // const canEdit = event.canManage && !event.isPastEvent

    return (
        <div className={styles.container}>
            <BackButton />

            <div className={styles.content}>
                <div className={styles.contentTop}>
                    {/* (src) will be passed in here */}
                    <EventImage />

                    <div className={styles.contentTopRight}>
                        {/* (status, title, imageSrc)next event card */}
                        <NextEventCard />

                        {/* (title, onUpdateRSVP, isLoading) reservation status card desktop only */}
                        <ReservationStatusCard className='desktop-only-flex'/>
                    </div>
                </div>

                <div className={styles.contentBottom}>
                    <div className={styles.contentBottomLeft}>
                        {/* (onShare, manageURL, supportURL, showManage, showGetSupport) buttons */}
                        <EventButtons manageURL={manageURL} className='desktop-only-flex' />

                        {/* event title and description */}
                        <EventTitleDescription title={initialEvent.title} description={initialEvent.description}/>

                        <TimingInfo
                            time='12PM W.A.T'
                            attendees={3}
                            address='Maryland, Lagos'
                            calendarMonth='Jan'
                            calendarDay='22'
                            className='tablet-mobile-flex' />

                        {/* Host info */}
                        <EventHostInfo title={initialEvent.communityName} url={`community/${initialEvent.uniqueUrl}`}/>

                        {/* (title, onUpdateRSVP, isLoading) reservation status card tablet, mobile only */}
                        <ReservationStatusCard className='tablet-mobile-flex'/>

                        {/* (onShare, manageURL, supportURL, showManage, showGetSupport) buttons */}
                        <EventButtons manageURL={manageURL} className='tablet-mobile-flex' />
                    </div>

                    <div className={styles.contentBottomRight}>
                        <TimingInfo
                            time='12PM W.A.T'
                            attendees={3}
                            address='Maryland, Lagos'
                            calendarMonth='Jan'
                            calendarDay='22'
                            className='desktop-only-flex' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventDetailsContent