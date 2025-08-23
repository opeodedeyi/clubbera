import { isRestrictedName, validateNameRestrictions } from '@/lib/data/restrictedNames';

interface NameValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Comprehensive name validation for usernames and community names
 */
export class NameValidator {
  /**
   * Validate a username with all applicable rules
   */
  static validateUsername(username: string): NameValidationResult {
    // Basic validation
    if (!username || typeof username !== 'string') {
      return { isValid: false, error: 'Username is required' };
    }

    const trimmedName = username.trim();

    // Length validation
    if (trimmedName.length < 2) {
      return { isValid: false, error: 'Username must be at least 2 characters long' };
    }

    if (trimmedName.length > 30) {
      return { isValid: false, error: 'Username must be less than 30 characters long' };
    }

    // Character validation - only alphanumeric, underscore, hyphen, and period
    const validCharacterPattern = /^[a-zA-Z0-9._-]+$/;
    if (!validCharacterPattern.test(trimmedName)) {
      return { 
        isValid: false, 
        error: 'Username can only contain letters, numbers, periods, underscores, and hyphens' 
      };
    }

    // Must start and end with alphanumeric character
    const startsEndsAlphanumeric = /^[a-zA-Z0-9].*[a-zA-Z0-9]$|^[a-zA-Z0-9]$/;
    if (!startsEndsAlphanumeric.test(trimmedName)) {
      return { 
        isValid: false, 
        error: 'Username must start and end with a letter or number' 
      };
    }

    // Must contain at least one letter (not just numbers)
    const containsLetter = /[a-zA-Z]/;
    if (!containsLetter.test(trimmedName)) {
      return { 
        isValid: false, 
        error: 'Username must contain at least one letter' 
      };
    }

    // No consecutive special characters
    const noConsecutiveSpecial = /^(?!.*[._-]{2})/;
    if (!noConsecutiveSpecial.test(trimmedName)) {
      return { 
        isValid: false, 
        error: 'Username cannot contain consecutive special characters' 
      };
    }

    // Check against restricted names
    const restrictionError = validateNameRestrictions(trimmedName, 'username');
    if (restrictionError) {
      return { isValid: false, error: restrictionError };
    }

    return { isValid: true };
  }

  /**
   * Validate a community name with all applicable rules
   */
  static validateCommunityName(name: string): NameValidationResult {
    // Basic validation
    if (!name || typeof name !== 'string') {
      return { isValid: false, error: 'Community name is required' };
    }

    const trimmedName = name.trim();

    // Length validation
    if (trimmedName.length < 3) {
      return { isValid: false, error: 'Community name must be at least 3 characters long' };
    }

    if (trimmedName.length > 50) {
      return { isValid: false, error: 'Community name must be less than 50 characters long' };
    }

    // Character validation - more permissive than usernames
    const validCharacterPattern = /^[a-zA-Z0-9\s._-]+$/;
    if (!validCharacterPattern.test(trimmedName)) {
      return { 
        isValid: false, 
        error: 'Community name can only contain letters, numbers, spaces, periods, underscores, and hyphens' 
      };
    }

    // Must start and end with alphanumeric character
    const startsEndsAlphanumeric = /^[a-zA-Z0-9].*[a-zA-Z0-9]$|^[a-zA-Z0-9]$/;
    if (!startsEndsAlphanumeric.test(trimmedName)) {
      return { 
        isValid: false, 
        error: 'Community name must start and end with a letter or number' 
      };
    }

    // Must contain at least one letter (not just numbers and spaces)
    const containsLetter = /[a-zA-Z]/;
    if (!containsLetter.test(trimmedName)) {
      return { 
        isValid: false, 
        error: 'Community name must contain at least one letter' 
      };
    }

    // No excessive whitespace
    const noExcessiveWhitespace = /^(?!.*\s{2,})/;
    if (!noExcessiveWhitespace.test(trimmedName)) {
      return { 
        isValid: false, 
        error: 'Community name cannot contain multiple consecutive spaces' 
      };
    }

    // Check against restricted names
    const restrictionError = validateNameRestrictions(trimmedName, 'community');
    if (restrictionError) {
      return { isValid: false, error: restrictionError };
    }

    return { isValid: true };
  }

  /**
   * Quick check if a name is restricted (without full validation)
   */
  static isNameRestricted(name: string): boolean {
    return isRestrictedName(name);
  }

  /**
   * Validate a display name (full name for users)
   */
  static validateDisplayName(displayName: string): NameValidationResult {
    if (!displayName || typeof displayName !== 'string') {
      return { isValid: false, error: 'Display name is required' };
    }

    const trimmedName = displayName.trim();

    // Length validation
    if (trimmedName.length < 1) {
      return { isValid: false, error: 'Display name is required' };
    }

    if (trimmedName.length > 100) {
      return { isValid: false, error: 'Display name must be less than 100 characters long' };
    }

    // Character validation - allow most characters for display names
    const validCharacterPattern = /^[a-zA-Z0-9\s.''-]+$/;
    if (!validCharacterPattern.test(trimmedName)) {
      return { 
        isValid: false, 
        error: 'Display name contains invalid characters' 
      };
    }

    // Must start and end with alphanumeric character
    const startsEndsAlphanumeric = /^[a-zA-Z0-9].*[a-zA-Z0-9]$|^[a-zA-Z0-9]$/;
    if (!startsEndsAlphanumeric.test(trimmedName)) {
      return { 
        isValid: false, 
        error: 'Display name must start and end with a letter or number' 
      };
    }

    // Must contain at least one letter (not just numbers and spaces)
    const containsLetter = /[a-zA-Z]/;
    if (!containsLetter.test(trimmedName)) {
      return { 
        isValid: false, 
        error: 'Display name must contain at least one letter' 
      };
    }

    // Check against restricted names (less strict for display names)
    if (isRestrictedName(trimmedName)) {
      return { 
        isValid: false, 
        error: 'This display name is not allowed. Please choose a different name.' 
      };
    }

    return { isValid: true };
  }

  /**
   * Sanitize a name by removing/replacing invalid characters
   */
  static sanitizeName(name: string, type: 'username' | 'community' | 'display' = 'username'): string {
    if (!name || typeof name !== 'string') return '';
    
    let sanitized = name.trim();
    
    if (type === 'username') {
      // Remove invalid characters for usernames
      sanitized = sanitized.replace(/[^a-zA-Z0-9._-]/g, '');
      // Remove consecutive special characters
      sanitized = sanitized.replace(/[._-]{2,}/g, '_');
    } else if (type === 'community') {
      // Remove invalid characters for community names
      sanitized = sanitized.replace(/[^a-zA-Z0-9\s._-]/g, '');
      // Replace multiple spaces with single space
      sanitized = sanitized.replace(/\s{2,}/g, ' ');
    } else {
      // For display names, just clean up whitespace
      sanitized = sanitized.replace(/\s{2,}/g, ' ');
    }
    
    return sanitized;
  }
}

// Export convenience functions
export const validateUsername = NameValidator.validateUsername;
export const validateCommunityName = NameValidator.validateCommunityName;
export const validateDisplayName = NameValidator.validateDisplayName;
export const isNameRestricted = NameValidator.isNameRestricted;
export const sanitizeName = NameValidator.sanitizeName;