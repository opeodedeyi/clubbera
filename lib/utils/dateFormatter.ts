// lib/utils/dateFormatter.ts
import { 
  format, 
  formatDistanceToNow, 
  isValid, 
  parseISO,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  isToday,
  isYesterday,
  isThisYear
} from 'date-fns';

export type DateFormatType = 
    | 'relative'           // "2 days ago", "3 hours ago"
    | 'short'             // "Jan 8"
    | 'medium'            // "Jan 8, 2020"
    | 'long'              // "January 8th, 2020"
    | 'full'              // "Monday, January 8th, 2020"
    | 'numeric'           // "01/08/2020"
    | 'time'              // "2:30 PM"
    | 'datetime'          // "Jan 8, 2020 at 2:30 PM"
    | 'dayOfWeek'         // "Monday"
    | 'monthYear'         // "January 2020"
    | 'smart';            // Automatically choose based on recency

interface DateFormatterOptions {
    includeTime?: boolean;
    includeYear?: boolean;
    short?: boolean;
}

export function formatDate(
    dateInput: string | Date | null | undefined,
    formatType: DateFormatType = 'medium',
    options: DateFormatterOptions = {}
): string {
    if (!dateInput) return '';

    let date: Date;
    
    // Handle string dates (like your ISO format)
    if (typeof dateInput === 'string') {
        date = parseISO(dateInput);
    } else {
        date = dateInput;
    }

    // Check if date is valid
    if (!isValid(date)) return 'Invalid date';

    const { includeTime = false, includeYear, short = false } = options;

    switch (formatType) {
        case 'relative':
            return formatDistanceToNow(date, { addSuffix: true });

        case 'short':
            return includeYear !== false && !isThisYear(date) 
                ? format(date, 'MMM d, yyyy')
                : format(date, 'MMM d');

        case 'medium':
            const mediumFormat = includeYear !== false && !isThisYear(date) 
                ? 'MMM d, yyyy' 
                : 'MMM d';
            return includeTime 
                ? format(date, `${mediumFormat} 'at' h:mm a`)
                : format(date, mediumFormat);

        case 'long':
            const longFormat = includeYear !== false && !isThisYear(date)
                ? 'MMMM do, yyyy'
                : 'MMMM do';
            return includeTime
                ? format(date, `${longFormat} 'at' h:mm a`)
                : format(date, longFormat);

        case 'full':
            const fullFormat = includeYear !== false && !isThisYear(date)
                ? 'EEEE, MMMM do, yyyy'
                : 'EEEE, MMMM do';
            return includeTime
                ? format(date, `${fullFormat} 'at' h:mm a`)
                : format(date, fullFormat);

        case 'numeric':
            return format(date, 'MM/dd/yyyy');

        case 'time':
            return format(date, 'h:mm a');

        case 'datetime':
            const dtFormat = includeYear !== false && !isThisYear(date)
                ? 'MMM d, yyyy'
                : 'MMM d';
            return format(date, `${dtFormat} 'at' h:mm a`);

        case 'dayOfWeek':
            return format(date, short ? 'EEE' : 'EEEE');

        case 'monthYear':
            return format(date, short ? 'MMM yyyy' : 'MMMM yyyy');

        case 'smart':
            return getSmartFormat(date, includeTime);

        default:
            return format(date, 'MMM d, yyyy');
    }
}

// Smart formatting based on how recent the date is
function getSmartFormat(date: Date, includeTime: boolean = false): string {
    const now = new Date();
    const minutesDiff = differenceInMinutes(now, date);
    const hoursDiff = differenceInHours(now, date);
    const daysDiff = differenceInDays(now, date);

    // Less than 1 minute
    if (minutesDiff < 1) {
        return 'Just now';
    }

    // Less than 60 minutes
    if (minutesDiff < 60) {
        return `${minutesDiff}m ago`;
    }

    // Less than 24 hours
    if (hoursDiff < 24) {
        return `${hoursDiff}h ago`;
    }

    // Less than 30 days
    if (daysDiff < 30) {
        return `${daysDiff}d ago`;
    }

    // Less than 365 days (show months)
    if (daysDiff < 365) {
        const months = Math.floor(daysDiff / 30);
        return months === 1 ? '1mo ago' : `${months}mo ago`;
    }

    // More than 365 days (show years)
    const years = Math.floor(daysDiff / 365);
    return years === 1 ? '1yr ago' : `${years}yr ago`;
}

// Smart formatting for future dates (events)
function getEventDateFormat(date: Date): string {
    const now = new Date();
    const daysDiff = differenceInDays(date, now);

    if (isToday(date)) {
        return 'Today';
    }

    if (daysDiff === 1) {
        return 'Tomorrow';
    }

    if (daysDiff >= 2 && daysDiff <= 6) {
        return `In ${daysDiff} days`;
    }

    if (daysDiff >= 7 && daysDiff < 14) {
        return 'In 1 week';
    }

    if (daysDiff >= 14 && daysDiff < 30) {
        const weeks = Math.floor(daysDiff / 7);
        return `In ${weeks} weeks`;
    }

    if (daysDiff >= 30 && daysDiff < 60) {
        return 'In 1 month';
    }

    if (daysDiff >= 60 && daysDiff < 365) {
        const months = Math.floor(daysDiff / 30);
        return `In ${months} months`;
    }

    if (daysDiff >= 365 && daysDiff < 730) {
        return 'In 1 year';
    }

    const years = Math.floor(daysDiff / 365);
    return `In ${years} years`;
}

export function formatEventDate(dateInput: string | Date | null | undefined): string {
    if (!dateInput) return '';

    let date: Date;

    if (typeof dateInput === 'string') {
        date = parseISO(dateInput);
    } else {
        date = dateInput;
    }

    if (!isValid(date)) return 'Invalid date';

    return getEventDateFormat(date);
}

// Convenience functions for common formats
export const formatRelativeTime = (date: string | Date) => formatDate(date, 'relative');
export const formatShortDate = (date: string | Date) => formatDate(date, 'short');
export const formatLongDate = (date: string | Date) => formatDate(date, 'long');
export const formatSmartDate = (date: string | Date) => formatDate(date, 'smart');