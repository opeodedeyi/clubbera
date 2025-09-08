// lib/utils/timezoneFormatter.ts
import { format, parseISO, isValid } from 'date-fns';
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