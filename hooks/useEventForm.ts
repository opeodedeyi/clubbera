'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { EventFormData, UploadUrlResponse } from '@/types/event';
import { eventApi } from '@/lib/api/events';
import { processImage, validateImageFile } from '@/lib/imageProcessing';
import { validateNameRestrictions } from '@/lib/data/restrictedNames';
import type { CreateEventRequest } from '@/lib/api/events';


const initialFormData: EventFormData = {
    title: '',
    description: '',
    eventType: 'physical',
    startTime: '',
    endTime: '',
    locationDetails: '',
    location: {
        name: '',
        locationType: '',
        lat: null,
        lng: null,
        address: ''
    },
    coverImageKey: null,
    coverImageProvider: undefined,
    coverImageUrl: undefined,
    maxAttendees: 50,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Auto-detect system timezone
    // Form fields
    eventDate: '',
    startTimeInput: '',
    endTimeInput: ''
}

export function useEventForm() {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(0)
    const [formData, setFormData] = useState<EventFormData>(initialFormData)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isUploading, setIsUploading] = useState(false)

    const updateFormData = (data: Partial<EventFormData>) => {
        setFormData(prev => {
            const updated = { ...prev, ...data }
            
            // Auto-generate local time strings when date/time inputs change
            if (data.eventDate || data.startTimeInput || data.endTimeInput) {
                if (updated.eventDate && updated.startTimeInput) {
                    updated.startTime = createLocalTimeString(updated.eventDate, updated.startTimeInput)
                }
                if (updated.eventDate && updated.endTimeInput) {
                    updated.endTime = createLocalTimeString(updated.eventDate, updated.endTimeInput)
                }
            }
            
            return updated
        })

        // Clear errors for updated fields
        const updatedFields = Object.keys(data)
        setErrors(prev => {
            const newErrors = { ...prev }
            updatedFields.forEach(field => delete newErrors[field])
            return newErrors
        })
    }

    // Helper function to create local datetime string (not UTC)
    const createLocalTimeString = (date: string, time: string): string => {
        // Return local time in YYYY-MM-DDTHH:MM:SS format
        // API expects local time with separate timezone field
        return `${date}T${time}:00`
    }

    // Handle location selection from Google Maps
    const updateLocation = (locationData: {
        name: string
        address: string
        lat: number
        lng: number
        locationType?: string
    }) => {
        updateFormData({
            location: {
                name: locationData.name,
                address: locationData.address,
                lat: locationData.lat,
                lng: locationData.lng,
                locationType: locationData.locationType || 'venue'
            }
        })
    }

    // Image upload functionality using event API
    const handleImageUpload = async (file: File): Promise<boolean> => {
        console.log('Starting image upload for:', file.name)
        setIsUploading(true)
        
        try {
            // Validate image file
            const validationError = validateImageFile(file, 10); // 10MB max for event cover images
            if (validationError) {
                console.log('Image validation failed:', validationError)
                setErrors(prev => ({ ...prev, coverImageKey: validationError }))
                setIsUploading(false)
                return false
            }

            console.log('Image validation passed, processing image...')
            // Process image (compression, WebP conversion, resizing)
            const processedFile = await processImage(file, 'cover')
            console.log('Image processed, requesting upload URL...')
            
            // Get temp upload URL using event API
            const response = await eventApi.getTempUploadUrl({
                fileType: processedFile.type,
                entityType: 'event',
                imageType: 'cover'
            })

            console.log('Upload URL received, uploading file...')
            // Upload processed file to the provided URL
            await eventApi.uploadFile(response.data.uploadUrl, processedFile)
            
            console.log('File uploaded successfully, updating form data...')
            // Store the provider, key, and alt_text for API submission
            updateFormData({ 
                coverImageKey: response.data.key,
                coverImageProvider: response.data.provider || 'aws-s3',
                coverImageUrl: response.data.fileUrl
            })
            
            console.log('Image upload completed successfully')
            setIsUploading(false)
            return true
        } catch (error) {
            console.error('Image upload failed:', error)
            setIsUploading(false)
            const errorMessage = error instanceof Error ? error.message : 'Failed to upload image'
            setErrors(prev => ({ ...prev, coverImageKey: errorMessage }))
            return false
        }
    }


    const nextStep = () => {
        if (validateCurrentStep()) {
            setCurrentStep(prev => prev + 1)
        }
    }

    const previousStep = () => {
        if (currentStep > 0 && currentStep < 3) {
            setCurrentStep(prev => prev - 1)
        } else {
            if (window.history.length > 1) {
                router.back()
            } else {
                router.push('/')
            }
        }
    }

    const validateCurrentStep = (): boolean => {
        const newErrors: Record<string, string> = {}

        switch (currentStep) {
            case 0: // Event Type & Location
                if (!formData.eventType) {
                    newErrors.eventType = 'Event type is required'
                }
                if (!formData.locationDetails.trim()) {
                    newErrors.locationDetails = 'Location details are required'
                }
                if (formData.eventType === 'physical' && !formData.location.name) {
                    newErrors['location.name'] = 'Location is required for physical events'
                }
                break

            case 1: // Date, Time & Details
                if (!formData.title.trim()) {
                    newErrors.title = 'Event title is required'
                } else {
                    // Check for restricted names
                    const restrictionError = validateNameRestrictions(formData.title, 'event')
                    if (restrictionError) {
                        newErrors.title = restrictionError
                    }
                }
                if (!formData.description.trim()) {
                    newErrors.description = 'Event description is required'
                }
                if (!formData.eventDate) {
                    newErrors.eventDate = 'Event date is required'
                }
                if (!formData.startTimeInput) {
                    newErrors.startTimeInput = 'Start time is required'
                }
                if (!formData.endTimeInput) {
                    newErrors.endTimeInput = 'End time is required'
                }
                
                // Validate end time is after start time
                if (formData.startTimeInput && formData.endTimeInput) {
                    const start = new Date(`2000-01-01T${formData.startTimeInput}`)
                    const end = new Date(`2000-01-01T${formData.endTimeInput}`)
                    if (end <= start) {
                        newErrors.endTimeInput = 'End time must be after start time'
                    }
                }
                break

            case 2: // Cover Image & Attendees
                if (formData.maxAttendees < 1) {
                    newErrors.maxAttendees = 'At least 1 attendee is required'
                }
                if (formData.maxAttendees > 10000) {
                    newErrors.maxAttendees = 'Maximum 10,000 attendees allowed'
                }
                break

            case 3: // Preview - always valid
                break
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const submitForm = async (communityId: number): Promise<boolean> => {
        try {
            // Validate final form
            if (!validateForm()) {
                return false
            }

            const submitData: CreateEventRequest = {
                title: formData.title,
                description: formData.description,
                startTime: formData.startTime, // Local time string
                endTime: formData.endTime, // Local time string
                timezone: formData.timezone, // IANA timezone identifier
                location: {
                    city: formData.location.address?.split(',')[1]?.trim() || '',
                    name: formData.location.name,
                    lat: formData.location.lat || 0,
                    lng: formData.location.lng || 0,
                    address: formData.location.address
                },
                eventType: formData.eventType,
                maxAttendees: formData.maxAttendees > 0 ? formData.maxAttendees : undefined,
                content: formData.locationDetails
            }

            // Add cover image if uploaded
            if (formData.coverImageKey && formData.coverImageProvider) {
                submitData.cover_image = {
                    provider: formData.coverImageProvider,
                    key: formData.coverImageKey,
                    alt_text: `Cover image for ${formData.title}`
                }
            }

            console.log('Submitting event to API:', submitData)
            
            const response = await eventApi.createEvent(communityId, submitData)
            
            if (response.status === 'success') {
                router.push(`/event/${response.data.event.id}`)
                return true
            }
            
            return false
        } catch (error) {
            console.error('Error creating event:', error)
            setErrors(prev => ({ ...prev, submit: 'Failed to create event. Please try again.' }))
            return false
        }
    }

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {}

        if (!formData.title.trim()) {
            newErrors.title = 'Event title is required'
        } else {
            // Check for restricted names
            const restrictionError = validateNameRestrictions(formData.title, 'event')
            if (restrictionError) {
                newErrors.title = restrictionError
            }
        }
        
        if (!formData.description.trim()) newErrors.description = 'Event description is required'
        if (!formData.startTime) newErrors.startTime = 'Start time is required'
        if (!formData.endTime) newErrors.endTime = 'End time is required'
        if (!formData.timezone) newErrors.timezone = 'Timezone is required'
        if (!formData.location.name && formData.eventType === 'physical') {
            newErrors.location = 'Location is required for physical events'
        }

        // Validate timezone format (IANA identifier)
        try {
            Intl.DateTimeFormat(undefined, { timeZone: formData.timezone })
        } catch {
            newErrors.timezone = 'Invalid timezone format'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    return {
        currentStep,
        formData,
        errors,
        isUploading,
        updateFormData,
        updateLocation,
        handleImageUpload,
        nextStep,
        previousStep,
        validateCurrentStep,
        submitForm,
        isValid: Object.keys(errors).length === 0
    }
}