'use client';

import { EventDetails } from "@/types/event";
import ManageEventLayout from '@/components/layout/ManageEventLayout/ManageEventLayout';


interface EventAnalyticsProps {
    initialEvent: EventDetails
}

const EventAnalytics: React.FC<EventAnalyticsProps> = ({ initialEvent }: EventAnalyticsProps) => {
    return (
        <ManageEventLayout event={initialEvent}>
            <>
                <h2>Analytics Coming Soon</h2>
            </>
        </ManageEventLayout>
    )
}

export default EventAnalytics