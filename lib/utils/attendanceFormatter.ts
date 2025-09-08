// lib/utils/attendanceFormatter.ts

export type AttendanceStatus = 'attending' | 'not_attending' | 'waitlisted' | 'maybe' | 'pending' | null;

/**
 * Formats attendance status for display with proper capitalization and wording
 * @param status - The raw attendance status from the API
 * @returns Formatted status string for display
 */
export function formatAttendanceStatus(status: AttendanceStatus): string {
    if (!status) {
        return 'Reservation Status';
    }

    switch (status) {
        case 'attending':
            return 'Attending';
        case 'not_attending':
            return 'Not Attending';
        case 'waitlisted':
            return 'Waitlisted';
        case 'maybe':
            return 'Maybe';
        case 'pending':
            return 'Pending';
        default:
            return 'Reservation Status';
    }
}

/**
 * Gets the appropriate button text based on attendance status
 * @param status - The raw attendance status from the API
 * @returns Button text for RSVP updates
 */
export function getAttendanceButtonText(status: AttendanceStatus): string {
    if (!status || status === 'pending') {
        return 'RSVP';
    }

    switch (status) {
        case 'attending':
            return 'Change RSVP';
        case 'not_attending':
            return 'Join Event';
        case 'waitlisted':
            return 'Update RSVP';
        case 'maybe':
            return 'Confirm RSVP';
        default:
            return 'Update RSVP';
    }
}