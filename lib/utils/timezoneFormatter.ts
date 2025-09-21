// lib/utils/timezoneFormatter.ts
import { 
    format, 
    parseISO, 
    isValid, 
    differenceInDays,
    differenceInHours,
    differenceInMinutes,
    isToday,
    isYesterday,
    isThisYear
} from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

export interface TimezoneFormatterOptions {
    includeTimezone?: boolean;
    shortTimezone?: boolean;
}

/**
 * Formats a date string with timezone awareness
 * @param dateString - ISO date string (e.g., '2025-09-12T12:41:00.000Z')
 * @param timezone - IANA timezone identifier (e.g., 'Europe/London', 'America/New_York')
 * @param formatPattern - date-fns format pattern
 * @param options - additional formatting options
 */
export function formatDateWithTimezone(
    dateString: string | null | undefined,
    timezone: string | undefined,
    formatPattern: string,
    options: TimezoneFormatterOptions = {}
): string {
    if (!dateString) return '';

    const date = parseISO(dateString);
    if (!isValid(date)) return 'Invalid date';

    const { includeTimezone = false, shortTimezone = true } = options;

    // If no timezone provided, use regular format
    if (!timezone) {
        return format(date, formatPattern);
    }

    try {
        const formattedDate = formatInTimeZone(date, timezone, formatPattern);
        
        if (includeTimezone) {
            const timezoneAbbr = getTimezoneAbbreviation(timezone, date, shortTimezone);
            return `${formattedDate} ${timezoneAbbr}`;
        }

        return formattedDate;
    } catch {
        // Fallback to regular format if timezone is invalid
        return format(date, formatPattern);
    }
}

/**
 * Gets timezone abbreviation (e.g., 'GMT', 'EST', 'WAT')
 */
function getTimezoneAbbreviation(timezone: string, date: Date, short: boolean = true): string {
    try {
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            timeZoneName: short ? 'short' : 'long'
        });
        
        const parts = formatter.formatToParts(date);
        const timeZonePart = parts.find(part => part.type === 'timeZoneName');
        return timeZonePart?.value || timezone;
    } catch {
        return timezone;
    }
}

/**
 * Formats event time with timezone (e.g., "12:41 PM WAT")
 */
export function formatEventTime(
    startTime: string | null | undefined,
    timezone: string | undefined
): string {
    return formatDateWithTimezone(startTime, timezone, 'h:mm a', { 
        includeTimezone: !!timezone, 
        shortTimezone: true 
    });
}

/**
 * Formats calendar day (e.g., "12")
 */
export function formatCalendarDay(
    startTime: string | null | undefined,
    timezone: string | undefined
): string {
    return formatDateWithTimezone(startTime, timezone, 'd');
}

/**
 * Formats calendar month (e.g., "Sep")
 */
export function formatCalendarMonth(
    startTime: string | null | undefined,
    timezone: string | undefined
): string {
    return formatDateWithTimezone(startTime, timezone, 'MMM');
}

/**
 * Smart formatting with timezone awareness
 * Combines the smart timing logic from dateFormatter with timezone support
 */
export function formatSmartDateWithTimezone(
    dateString: string | null | undefined,
    timezone: string | undefined,
    options: TimezoneFormatterOptions = {}
): string {
    if (!dateString) return '';

    const date = parseISO(dateString);
    if (!isValid(date)) return 'Invalid date';

    const { includeTimezone = true, shortTimezone = true } = options;

    // Convert to target timezone for comparison
    const targetDate = timezone ? 
        new Date(formatInTimeZone(date, timezone, "yyyy-MM-dd'T'HH:mm:ssxxx")) : 
        date;
    
    const now = new Date();
    const minutesDiff = differenceInMinutes(targetDate, now);
    const hoursDiff = differenceInHours(targetDate, now);
    const daysDiff = differenceInDays(targetDate, now);

    let smartFormat: string;

    // For future events (positive differences)
    if (minutesDiff > 0) {
        // Less than 60 minutes away
        if (minutesDiff < 60) {
            smartFormat = `In ${minutesDiff}m`;
        }
        // Less than 24 hours away
        else if (hoursDiff < 24) {
            smartFormat = `In ${hoursDiff}h`;
        }
        // Today
        else if (isToday(targetDate)) {
            smartFormat = formatDateWithTimezone(dateString, timezone, "'Today at' HH:mm");
        }
        // Tomorrow (1 day away)
        else if (daysDiff === 1) {
            smartFormat = formatDateWithTimezone(dateString, timezone, "'Tomorrow at' HH:mm");
        }
        // Less than 7 days away
        else if (daysDiff < 7) {
            smartFormat = formatDateWithTimezone(dateString, timezone, "EEE 'at' HH:mm");
        }
        // This year
        else if (isThisYear(targetDate)) {
            smartFormat = formatDateWithTimezone(dateString, timezone, "MMM d 'at' HH:mm");
        }
        // Different year
        else {
            smartFormat = formatDateWithTimezone(dateString, timezone, "MMM d, yyyy 'at' HH:mm");
        }
    }
    // For past events (negative differences)
    else {
        const pastMinutes = Math.abs(minutesDiff);
        const pastHours = Math.abs(hoursDiff);
        const pastDays = Math.abs(daysDiff);

        // Less than 1 minute ago
        if (pastMinutes < 1) {
            smartFormat = 'Just now';
        }
        // Less than 60 minutes ago
        else if (pastMinutes < 60) {
            smartFormat = `${pastMinutes}m ago`;
        }
        // Less than 24 hours ago
        else if (pastHours < 24) {
            smartFormat = `${pastHours}h ago`;
        }
        // Today
        else if (isToday(targetDate)) {
            smartFormat = formatDateWithTimezone(dateString, timezone, "'Today at' HH:mm");
        }
        // Yesterday
        else if (isYesterday(targetDate)) {
            smartFormat = formatDateWithTimezone(dateString, timezone, "'Yesterday at' HH:mm");
        }
        // Less than 7 days ago
        else if (pastDays < 7) {
            smartFormat = formatDateWithTimezone(dateString, timezone, "EEE 'at' HH:mm");
        }
        // This year
        else if (isThisYear(targetDate)) {
            smartFormat = formatDateWithTimezone(dateString, timezone, "MMM d 'at' HH:mm");
        }
        // Different year
        else {
            smartFormat = formatDateWithTimezone(dateString, timezone, "MMM d, yyyy 'at' HH:mm");
        }
    }

    // Add timezone abbreviation if requested and not already included
    if (includeTimezone && timezone && !smartFormat.includes('Just now') && !smartFormat.includes('ago') && !smartFormat.includes('In ')) {
        const timezoneAbbr = getTimezoneAbbreviation(timezone, date, shortTimezone);
        // Only add if not already included in the format
        if (!smartFormat.includes(timezoneAbbr)) {
            smartFormat = `${smartFormat} ${timezoneAbbr}`;
        }
    }

    return smartFormat;
}