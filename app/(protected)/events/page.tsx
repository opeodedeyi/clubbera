'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import UpcomingEvents from '@/components/event/UpcomingEvents/UpcomingEvents';
import PreviousEvents from '@/components/event/PreviousEvents/PreviousEvents';
import PageWrapper from "@/components/ui/PageWrapper/PageWrapper";
import ToggleButtonGroup from '@/components/ui/ToggleButtonGroup/ToggleButtonGroup';
import styles from '@/styles/pages/events.module.css';


type CommunityView = 'upcoming' | 'previous'

const VIEW_OPTIONS = [
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'previous', label: 'Previous' }
]

export default function Communities() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [currentView, setCurrentView] = useState<CommunityView>('upcoming');

    useEffect(() => {
        const view = searchParams.get('view')
        if (view === 'previous') {
            setCurrentView('previous')
        } else {
            setCurrentView('upcoming')
        }
    }, [searchParams])

    const handleViewChange = (view: string) => {
        const newView = view as CommunityView
        setCurrentView(newView)

        if (newView === 'previous') {
            router.push('/events?view=previous')
        } else {
            router.push('/events')
        }
    }

    return (
        <PageWrapper showParticles={false}>
            <div className={styles.navigation}>
                <h1>Events</h1>

                <ToggleButtonGroup
                    options={VIEW_OPTIONS}
                    activeValue={currentView}
                    onChange={handleViewChange}
                    activeColor="--color-event"/>
            </div>

            <main className={styles.contentContainer}>
                {currentView === 'upcoming' ? (
                    <UpcomingEvents />
                ) : (
                    <PreviousEvents />
                )}
            </main>
        </PageWrapper>
    )
}