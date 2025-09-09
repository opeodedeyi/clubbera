'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { EventDetails } from '@/types/event';
import { eventApi } from '@/lib/api/events';
import { processImage, validateImageFile } from '@/lib/imageProcessing';
import { getS3ImageUrl } from '@/lib/s3Utils';
import type { UpdateEventRequest } from '@/lib/api/events';

interface EditEventFormData {
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    timezone: string;
    eventType: "physical" | "online";
    location: {
        city: string;
        name: string;
        lat: number;
        lng: number;
        address: string;
    };
    maxAttendees: number;
    locationDetails: string;
    coverImageKey: string | null;
    coverImageProvider: string | undefined;
    coverImageUrl: string | undefined;
    // Form helper fields
    eventDate: string;
    startTimeInput: string;
    endTimeInput: string;
}

export function useEditEvent(initialEvent: EventDetails) {
    const router = useRouter();
    
    // Create initial form data
    const createInitialFormData = (): EditEventFormData => {
        // Parse times directly from stored strings (they're already in local time format)
        // Format: "YYYY-MM-DDTHH:mm:ss" - we need to extract date and time parts
        const startTimeParts = initialEvent.startTime.split('T');
        const endTimeParts = initialEvent.endTime.split('T');
        
        const startDateStr = startTimeParts[0]; // YYYY-MM-DD
        const endDateStr = endTimeParts[0];     // YYYY-MM-DD
        const startTimeInput = startTimeParts[1]?.slice(0, 5) || '09:00'; // HH:mm
        const endTimeInput = endTimeParts[1]?.slice(0, 5) || '10:00';     // HH:mm
        
        return {
            title: initialEvent.title,
            description: initialEvent.description,
            startTime: `${startDateStr}T${startTimeInput}:00`, // Ensure local time format
            endTime: `${endDateStr}T${endTimeInput}:00`,       // Ensure local time format
            timezone: initialEvent.timezone, // Keep original event timezone
            eventType: initialEvent.eventType as "physical" | "online",
            location: {
                city: initialEvent.location.city,
                name: initialEvent.location.name,
                lat: initialEvent.location.lat,
                lng: initialEvent.location.lng,
                address: initialEvent.location.address
            },
            maxAttendees: initialEvent.maxAttendees || 50,
            locationDetails: initialEvent.locationDetails || '',
            coverImageKey: initialEvent.coverImage?.key || null,
            coverImageProvider: initialEvent.coverImage?.provider || undefined,
            coverImageUrl: initialEvent.coverImage ? getS3ImageUrl(initialEvent.coverImage.key) : undefined,
            // Form helpers
            eventDate: startDateStr,
            startTimeInput: startTimeInput,
            endTimeInput: endTimeInput
        };
    };

    const [initialFormData] = useState<EditEventFormData>(createInitialFormData);
    const [formData, setFormData] = useState<EditEventFormData>(createInitialFormData);
    
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isUploading, setIsUploading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    // Function to check if form data has changed from initial values
    const checkForChanges = (currentData: EditEventFormData): boolean => {
        // Compare key fields that matter for saving (excluding form helpers and computed fields)
        return (
            currentData.title !== initialFormData.title ||
            currentData.description !== initialFormData.description ||
            currentData.startTime !== initialFormData.startTime ||
            currentData.endTime !== initialFormData.endTime ||
            currentData.timezone !== initialFormData.timezone ||
            currentData.eventType !== initialFormData.eventType ||
            currentData.location.name !== initialFormData.location.name ||
            currentData.location.address !== initialFormData.location.address ||
            currentData.location.lat !== initialFormData.location.lat ||
            currentData.location.lng !== initialFormData.location.lng ||
            currentData.maxAttendees !== initialFormData.maxAttendees ||
            currentData.locationDetails !== initialFormData.locationDetails
            // Note: coverImage changes are saved immediately, so we don't check those for unsaved changes
        );
    };

    const updateFormData = (data: Partial<EditEventFormData>) => {
        setFormData(prev => {
            const updated = { ...prev, ...data };
            
            // Auto-generate local time strings when date/time inputs change
            if (data.eventDate || data.startTimeInput || data.endTimeInput) {
                if (updated.eventDate && updated.startTimeInput) {
                    updated.startTime = createLocalTimeString(updated.eventDate, updated.startTimeInput);
                }
                if (updated.eventDate && updated.endTimeInput) {
                    updated.endTime = createLocalTimeString(updated.eventDate, updated.endTimeInput);
                }
            }
            
            // Check for changes after updating
            setHasUnsavedChanges(checkForChanges(updated));
            
            return updated;
        });

        // Clear errors for updated fields
        const updatedFields = Object.keys(data);
        setErrors(prev => {
            const newErrors = { ...prev };
            updatedFields.forEach(field => delete newErrors[field]);
            return newErrors;
        });
    };

    // Helper function to create local datetime string
    const createLocalTimeString = (date: string, time: string): string => {
        // Ensure we return exactly YYYY-MM-DDTHH:mm:ss format (no timezone offset)
        return `${date}T${time}:00`;
    };

    // Handle location selection
    const updateLocation = (locationData: {
        name: string;
        address: string;
        lat: number;
        lng: number;
    }) => {
        updateFormData({
            location: {
                city: locationData.address?.split(',')[1]?.trim() || '',
                name: locationData.name,
                address: locationData.address,
                lat: locationData.lat,
                lng: locationData.lng
            }
        });
    };

    // Image upload functionality - saves immediately
    const handleImageUpload = async (file: File): Promise<boolean> => {
        console.log('Starting cover image upload for:', file.name);
        setIsUploading(true);
        
        try {
            // Validate image file
            const validationError = validateImageFile(file, 10); // 10MB max
            if (validationError) {
                console.log('Image validation failed:', validationError);
                setErrors(prev => ({ ...prev, coverImage: validationError }));
                setIsUploading(false);
                return false;
            }

            console.log('Image validation passed, processing image...');
            // Process image
            const processedFile = await processImage(file, 'cover');
            console.log('Image processed, requesting upload URL...');
            
            // Get temp upload URL
            const response = await eventApi.getTempUploadUrl({
                fileType: processedFile.type,
                entityType: 'event',
                imageType: 'cover'
            });

            console.log('Upload URL received, uploading file...');
            // Upload file
            await eventApi.uploadFile(response.data.uploadUrl, processedFile);
            
            console.log('File uploaded successfully, updating cover image...');
            
            // Immediately save the cover image to the event
            await eventApi.updateCoverImage(initialEvent.id, {
                provider: response.data.provider,
                key: response.data.key,
                alt_text: `Cover image for ${formData.title}`
            });
            
            // Update form data with new image
            updateFormData({ 
                coverImageKey: response.data.key,
                coverImageProvider: response.data.provider || 'aws-s3',
                coverImageUrl: getS3ImageUrl(response.data.key)
            });
            
            console.log('Cover image updated successfully');
            setIsUploading(false);
            
            // Refresh the page to show updated image
            router.refresh();
            
            return true;
        } catch (error) {
            console.error('Cover image upload failed:', error);
            setIsUploading(false);
            const errorMessage = error instanceof Error ? error.message : 'Failed to upload image';
            setErrors(prev => ({ ...prev, coverImage: errorMessage }));
            return false;
        }
    };

    // Validate form data
    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Event title is required';
        }
        
        if (!formData.description.trim()) {
            newErrors.description = 'Event description is required';
        }
        
        if (!formData.eventDate) {
            newErrors.eventDate = 'Event date is required';
        }
        
        if (!formData.startTimeInput) {
            newErrors.startTimeInput = 'Start time is required';
        }
        
        if (!formData.endTimeInput) {
            newErrors.endTimeInput = 'End time is required';
        }
        
        // Validate end time is after start time
        if (formData.startTimeInput && formData.endTimeInput) {
            const start = new Date(`2000-01-01T${formData.startTimeInput}`);
            const end = new Date(`2000-01-01T${formData.endTimeInput}`);
            if (end <= start) {
                newErrors.endTimeInput = 'End time must be after start time';
            }
        }
        
        if (formData.eventType === 'physical' && !formData.location.name) {
            newErrors.location = 'Location is required for physical events';
        }
        
        if (formData.maxAttendees < 1) {
            newErrors.maxAttendees = 'At least 1 attendee is required';
        }
        
        if (formData.maxAttendees > 10000) {
            newErrors.maxAttendees = 'Maximum 10,000 attendees allowed';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Save form data
    const saveForm = async (): Promise<boolean> => {
        if (!validateForm()) {
            return false;
        }

        setIsSaving(true);
        
        try {
            const updateData: UpdateEventRequest = {
                title: formData.title,
                description: formData.description,
                startTime: formData.startTime,
                endTime: formData.endTime,
                timezone: formData.timezone,
                eventType: formData.eventType,
                maxAttendees: formData.maxAttendees > 0 ? formData.maxAttendees : undefined,
                locationDetails: formData.locationDetails // Include location details for both physical and online events
            };

            // Only include location for physical events
            if (formData.eventType === 'physical') {
                updateData.location = {
                    city: formData.location.address?.split(',')[1]?.trim() || '',
                    name: formData.location.name,
                    lat: formData.location.lat,
                    lng: formData.location.lng,
                    address: formData.location.address
                };
            }

            console.log('Updating event:', updateData);
            
            const response = await eventApi.updateEvent(initialEvent.id, updateData);
            
            if (response.status === 'success') {
                console.log('Event updated successfully');
                
                // Reset unsaved changes state
                setHasUnsavedChanges(false);
                
                setIsSaving(false);
                
                // Refresh the page to show updated data
                router.refresh();
                
                return true;
            }
            
            setIsSaving(false);
            return false;
        } catch (error) {
            console.error('Error updating event:', error);
            setIsSaving(false);
            setErrors(prev => ({ ...prev, submit: 'Failed to update event. Please try again.' }));
            return false;
        }
    };

    // Check if event has passed (read-only mode)
    const isOngoing = initialEvent.isOngoing
    const isPastEvent = initialEvent.hasPassed;

    // Check form validity without side effects
    const isFormValid = () => {
        return formData.title.trim() !== '' &&
               formData.description.trim() !== '' &&
               formData.eventDate !== '' &&
               formData.startTimeInput !== '' &&
               formData.endTimeInput !== '' &&
               (formData.eventType !== 'physical' || formData.location.name !== '') &&
               formData.maxAttendees >= 1 &&
               formData.maxAttendees <= 10000;
    };

    return {
        formData,
        errors,
        isUploading,
        isSaving,
        isOngoing,
        isPastEvent,
        hasUnsavedChanges,
        updateFormData,
        updateLocation,
        handleImageUpload,
        validateForm,
        saveForm,
        isValid: Object.keys(errors).length === 0,
        isFormValid: isFormValid()
    };
}