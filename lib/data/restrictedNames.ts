/**
 * Comprehensive list of restricted names for usernames and community names
 * These names are considered inappropriate, offensive, or reserved for system use
 */

// Administrative and reserved terms
const ADMINISTRATIVE_TERMS = [
    'admin', 'administrator', 'moderator', 'mod', 'support', 'help',
    'api', 'root', 'system', 'service', 'bot', 'official', 'staff',
    'null', 'undefined', 'reserved'
];

// Common offensive terms and slurs
const OFFENSIVE_TERMS = [
    // Profanity
    'fuck', 'fucking', 'shit', 'damn', 'hell', 'ass', 'bitch', 'bastard',
    'piss', 'crap', 'cock', 'dick', 'pussy', 'whore', 'slut',
    
    // Hate speech and slurs (abbreviated/coded versions)
    'nazi', 'hitler', 'terrorist', 'jihad', 'isis', 'alqaeda',
    
    // Sexual content
    'porn', 'sex', 'nude', 'naked', 'xxx', 'adult', 'escort',
    'hookup', 'nsfw', 'fetish', 'kink'
];

// Hate groups and extremist organizations
const HATE_GROUPS = [
    'kkk', 'aryan', 'whitesupremacy', 'neonazi', 'proudboys',
    'altright', 'qanon', 'antifa', 'blackpower', 'whitepower',
    'supremacist', 'extremist', 'radical', 'militant'
];

// Harmful/dangerous content
const HARMFUL_CONTENT = [
    'suicide', 'kill', 'murder', 'death', 'violence', 'bomb',
    'gun', 'weapon', 'drug', 'cocaine', 'heroin', 'meth',
    'abuse', 'rape', 'assault', 'threat', 'harm', 'hurt',
    'scam', 'fraud', 'fake', 'spam', 'phishing', 'virus'
];

// Combine all restricted terms
export const RESTRICTED_NAMES: string[] = [
    ...ADMINISTRATIVE_TERMS,
    ...OFFENSIVE_TERMS,
    ...HATE_GROUPS,
    ...HARMFUL_CONTENT
];

// Common variations and patterns to check
export const RESTRICTED_PATTERNS: RegExp[] = [
    // Numbers replacing letters (leetspeak)
    /adm1n/i,
    /m0d3rator/i,
    /h1tl3r/i,
    /n4z1/i,
    
    // Special characters
    /a[d@]min/i,
    /m[o0]d[e3]rat[o0]r/i,
    /[f@]uck/i,
    /[s$]h[i1]t/i,
    /b[i1]tch/i,
    
    // Repeated characters
    /a+d+m+i+n+/i,
    /f+u+c+k+/i,
    /s+h+i+t+/i,
    
    // Common bypasses
    /admin\d+/i,
    /moderator\d+/i,
    /\d+admin/i,
    /\d+mod/i
];

/**
 * Check if a name contains restricted content
 */
export function isRestrictedName(name: string): boolean {
    if (!name || typeof name !== 'string') return false;
    
    const normalizedName = name.toLowerCase().trim();
    
    // Check exact matches
    if (RESTRICTED_NAMES.includes(normalizedName)) {
        return true;
    }
    
    // Check if any restricted term is contained in the name
    for (const restrictedTerm of RESTRICTED_NAMES) {
        if (normalizedName.includes(restrictedTerm)) {
            return true;
        }
    }
    
    // Check against patterns
    for (const pattern of RESTRICTED_PATTERNS) {
        if (pattern.test(normalizedName)) {
            return true;
        }
    }
    
    return false;
}

/**
 * Get a descriptive error message for restricted names
 */
export function getRestrictedNameError(name: string, type: 'username' | 'community' | 'event' = 'username'): string {
    let entityType: string;
    switch (type) {
        case 'username':
            entityType = 'Username';
            break;
        case 'community':
            entityType = 'Community name';
            break;
        case 'event':
            entityType = 'Event title';
            break;
        default:
            entityType = 'Name';
    }
    return `${entityType} "${name}" is not allowed. Please choose a different name.`;
}

/**
 * Validate name and return error if restricted
 */
export function validateNameRestrictions(name: string, type: 'username' | 'community' | 'event' = 'username'): string | null {
    if (isRestrictedName(name)) {
        return getRestrictedNameError(name, type);
    }
    return null;
}