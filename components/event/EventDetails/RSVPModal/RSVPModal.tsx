'use client';

import React, { useState } from 'react';
import OverlayPortal from '@/components/ui/OverlayPortal/OverlayPortal';
import SelectInput from '@/components/Form/SelectInput/SelectInput';
import Button from '@/components/ui/Button/Button';
import Icon from '@/components/ui/Icon/Icon';
import { eventApi } from '@/lib/api/events';
import styles from './RSVPModal.module.css';

type RSVPStatus = 'attending' | 'not attending' | 'maybe';

interface RSVPModalProps {
    isOpen: boolean;
    onClose: () => void;
    eventId: number;
    currentStatus?: RSVPStatus;
    onUpdateRSVP?: (status: RSVPStatus) => void;
}

const rsvpOptions = [
    { value: 'attending', label: 'Attending' },
    { value: 'not attending', label: 'Not Attending' },
    { value: 'maybe', label: 'Maybe' }
];

const RSVPModal: React.FC<RSVPModalProps> = ({ 
    isOpen, 
    onClose, 
    eventId,
    currentStatus = 'maybe',
    onUpdateRSVP
}) => {
    const [selectedStatus, setSelectedStatus] = useState<RSVPStatus>(currentStatus);
    const [isLoading, setIsLoading] = useState(false);

    const handleStatusChange = (value: string | null) => {
        if (value && (value === 'attending' || value === 'not attending' || value === 'maybe')) {
            setSelectedStatus(value as RSVPStatus);
        }
    };

    const handleUpdateStatus = async () => {
        setIsLoading(true);
        try {
            const apiStatus = selectedStatus === 'not attending' ? 'not_attending' : selectedStatus;
            await eventApi.manageRSVP(eventId, { status: apiStatus as 'attending' | 'not_attending' | 'maybe' });
            
            if (onUpdateRSVP) {
                onUpdateRSVP(selectedStatus);
            }
            
            onClose();
        } catch (error) {
            console.error('Failed to update RSVP:', error);
            // Handle error (show toast, etc.)
        } finally {
            setIsLoading(false);
        }
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <OverlayPortal>
            <div className={styles.overlay} onClick={handleOverlayClick}>
                <div className={styles.modal}>
                    <div className={styles.content}>
                        <div className={styles.header}>
                            <div className={styles.icon}>
                                <Icon
                                    name="calendar"
                                    size="lg"
                                    color="var(--color-event)" />
                            </div>
                            
                            <h3 className={styles.title}>Manage RSVP</h3>
                        </div>

                        <p className={styles.text}>
                            We need you to Confirm Your RSVP for the Event
                        </p>

                        <SelectInput
                            label="Status"
                            value={selectedStatus}
                            options={rsvpOptions}
                            onChange={handleStatusChange}
                            className={styles.select} />

                        <Button
                            variant="event"
                            size="large"
                            onClick={handleUpdateStatus}
                            disabled={isLoading}
                            loading={isLoading}
                            className={styles.updateButton}>
                            Update Status
                        </Button>
                    </div>
                </div>
            </div>
        </OverlayPortal>
    );
};

export default RSVPModal;