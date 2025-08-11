import imageCompression from 'browser-image-compression';

export interface ImageProcessingOptions {
    maxWidth: number;
    maxHeight: number;
    quality: number;
    convertToWebP?: boolean;
    maintainAspectRatio?: boolean;
}

export const IMAGE_CONFIGS = {
    profile: {
        maxWidth: 400,
        maxHeight: 400,
        quality: 0.85,
        convertToWebP: true,
        maintainAspectRatio: true
    },
    cover: {
        maxWidth: 1200,
        maxHeight: 600,
        quality: 0.85,
        convertToWebP: true,
        maintainAspectRatio: true
    }
} as const;

export async function processImage(
    file: File, 
    type: 'profile' | 'cover'
): Promise<File> {
    const config = IMAGE_CONFIGS[type];
    
    // Keep GIFs as-is to preserve animation
    if (file.type === 'image/gif') {
        return file;
    }
    
    const options = {
        maxSizeMB: type === 'profile' ? 2 : 5, // Max file size in MB
        maxWidthOrHeight: Math.max(config.maxWidth, config.maxHeight),
        useWebWorker: true,
        fileType: config.convertToWebP ? 'image/webp' : file.type,
        initialQuality: config.quality
    };
    
    try {
        const compressedFile = await imageCompression(file, options);
        
        // If we converted to WebP, update the filename
        if (config.convertToWebP && file.type !== 'image/gif') {
            const newName = file.name.replace(/\.[^/.]+$/, '.webp');
            return new File([compressedFile], newName, { 
                type: 'image/webp',
                lastModified: Date.now()
            });
        }
        
        return compressedFile;
    } catch (error) {
        console.error('Image processing failed:', error);
        // Fallback to original file if processing fails
        return file;
    }
}

export function validateImageFile(file: File, maxSizeMB: number = 10): string | null {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    
    if (!allowedTypes.includes(file.type)) {
        return 'Please select a valid image file (JPEG, PNG, GIF, or WebP)';
    }
    
    if (file.size > maxSizeMB * 1024 * 1024) {
        return `File size must be less than ${maxSizeMB}MB`;
    }
    
    return null;
}