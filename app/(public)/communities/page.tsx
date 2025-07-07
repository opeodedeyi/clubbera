'use client'

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import DiscoverCommunities from '@/components/community/DiscoverCommunities/DiscoverCommunities';
import FeaturedCommunities from '@/components/community/FeaturedCommunities/FeaturedCommunities';
import PageWrapper from "@/components/ui/PageWrapper/PageWrapper";
import ToggleButtonGroup from '@/components/ui/ToggleButtonGroup/ToggleButtonGroup';
import styles from '@/styles/pages/communities.module.css';


type CommunityView = 'discover' | 'featured'

const VIEW_OPTIONS = [
    { value: 'discover', label: 'Discover' },
    { value: 'featured', label: 'Featured' }
]

export default function Communities() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [currentView, setCurrentView] = useState<CommunityView>('discover');

    useEffect(() => {
        const view = searchParams.get('view')
        if (view === 'featured') {
            setCurrentView('featured')
        } else {
            setCurrentView('discover')
        }
    }, [searchParams])

    const handleViewChange = (view: string) => {
        const newView = view as CommunityView
        setCurrentView(newView)

        if (newView === 'featured') {
            router.push('/communities?view=featured')
        } else {
            router.push('/communities')
        }
    }

    return (
        <PageWrapper showParticles={true} particleCount={6} particlesHeight={300}>
            <div className={styles.container}>
                <ToggleButtonGroup
                    options={VIEW_OPTIONS}
                    activeValue={currentView}
                    onChange={handleViewChange}
                    activeColor="--color-community"/>
            </div>

            <main className={styles.contentContainer}>
                {currentView === 'discover' ? (
                    <DiscoverCommunities />
                ) : (
                    <FeaturedCommunities />
                )}
            </main>
        </PageWrapper>
    )
}