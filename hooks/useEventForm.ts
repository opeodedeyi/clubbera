'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { EventFormData, UploadUrlResponse } from '@/types/event';


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
            
            // Auto-generate ISO strings when date/time inputs change
            if (data.eventDate || data.startTimeInput || data.endTimeInput) {
                if (updated.eventDate && updated.startTimeInput) {
                    updated.startTime = createISOString(updated.eventDate, updated.startTimeInput, updated.timezone)
                }
                if (updated.eventDate && updated.endTimeInput) {
                    updated.endTime = createISOString(updated.eventDate, updated.endTimeInput, updated.timezone)
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

    // Helper function to create ISO 8601 string
    const createISOString = (date: string, time: string, timezone: string): string => {
        const dateTimeString = `${date}T${time}:00`
        const dateObj = new Date(dateTimeString)
        return dateObj.toISOString()
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

    // Image upload functionality
    const getUploadUrl = async (fileName: string, fileType: string): Promise<UploadUrlResponse> => {
        try {
            const response = await fetch('/api/upload/get-url', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fileName, fileType })
            })
            
            if (!response.ok) throw new Error('Failed to get upload URL')
            
            return await response.json()
        } catch (error) {
            console.error('Error getting upload URL:', error)
            throw error
        }
    }

    const uploadFileToUrl = async (file: File, uploadUrl: string): Promise<void> => {
        try {
            const response = await fetch(uploadUrl, {
                method: 'PUT',
                body: file,
                headers: { 'Content-Type': file.type }
            })
            
            if (!response.ok) throw new Error('Failed to upload file')
        } catch (error) {
            console.error('Error uploading file:', error)
            throw error
        }
    }

    const handleImageUpload = async (file: File): Promise<boolean> => {
        setIsUploading(true)
        
        try {
            const { uploadUrl, fileUrl } = await getUploadUrl(file.name, file.type)
            await uploadFileToUrl(file, uploadUrl)
            
            updateFormData({ coverImageKey: fileUrl })
            
            setIsUploading(false)
            return true
        } catch (error) {
            setIsUploading(false)
            setErrors(prev => ({ ...prev, coverImageKey: 'Failed to upload image' }))
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

    const submitForm = async (): Promise<boolean> => {
        try {
            const submitData = {
                title: formData.title,
                description: formData.description,
                eventType: formData.eventType,
                startTime: formData.startTime,
                endTime: formData.endTime,
                locationDetails: formData.locationDetails,
                location: formData.location,
                coverImageKey: formData.coverImageKey || '',
                maxAttendees: formData.maxAttendees,
                timezone: formData.timezone
            }

            console.log('Submitting event:', submitData)
            
            // TODO: Replace with actual API call
            // const response = await api.post('/events', submitData)
            
            return true
        } catch (error) {
            console.error('Error creating event:', error)
            return false
        }
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