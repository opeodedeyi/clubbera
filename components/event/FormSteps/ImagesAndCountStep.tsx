import React, { useState, useEffect } from 'react';
import Button from "@/components/ui/Button/Button";
import { EventStepProps } from "@/types/event";
import ImageUpload from '@/components/Form/ImageUpload/ImageUpload';
import TextInput from '@/components/Form/TextInput/TextInput';
import styles from "./eventSteps.module.css";

const ImagesAndCountStep: React.FC<EventStepProps> = ({ 
    formData, 
    updateFormData, 
    errors, 
    isUploading,
    handleImageUpload,
    nextStep, 
    navigation,
    submitForm 
}: EventStepProps) => {
    // Local state to manage the display value of maxAttendees
    const [maxAttendeesDisplay, setMaxAttendeesDisplay] = useState(formData.maxAttendees.toString());
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Update display when formData changes from outside
    useEffect(() => {
        setMaxAttendeesDisplay(formData.maxAttendees.toString());
    }, [formData.maxAttendees]);

    const handleMaxAttendeesChange = (value: string) => {
        // Update display state immediately (allows clearing)
        setMaxAttendeesDisplay(value);
        
        // Only update form data with valid numbers
        if (value === '') {
            // Don't update formData when clearing - wait for onBlur
            return;
        }

        // Parse and validate number
        const numValue = parseInt(value, 10);
        if (!isNaN(numValue) && numValue > 0) {
            updateFormData({ maxAttendees: Math.min(numValue, 10000) }); // Cap at 10,000
        }
    };

    const handleMaxAttendeesBlur = (value: string) => {
        // Set default when user leaves the field if it's empty or invalid
        if (value === '' || value === '0' || isNaN(parseInt(value, 10))) {
            updateFormData({ maxAttendees: 50 }); // Default to 50
            setMaxAttendeesDisplay('50'); // Update display too
        }
    };

    const handleCoverImageRemove = () => {
        updateFormData({ 
            coverImageKey: null,
            coverImageProvider: undefined,
            coverImageUrl: undefined
        });
    };

    const handleSubmit = async () => {
        if (!submitForm) return;
        
        setIsSubmitting(true);
        try {
            const success = await submitForm();
            if (success) {
                // Form submission succeeded, the hook handles navigation
                console.log('Event created successfully');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                { navigation && <p className={styles.navText}>{navigation}</p>}

                <div className={styles.contentMain}>
                    <h1>Let's Add <br />Final Touches</h1>

                    <div className={styles.formSection}>
                        <TextInput
                            name="maxAttendees"
                            label="Maximum Attendees"
                            placeholder="Enter maximum number of attendees (1-10,000)"
                            value={maxAttendeesDisplay}
                            onChange={handleMaxAttendeesChange}
                            onBlur={handleMaxAttendeesBlur}
                            type="number"
                            error={errors.maxAttendees}
                            isRequired />

                        <ImageUpload
                            label="Cover Image"
                            description="We recommend an image that's at least 800px wide by 300 px tall."
                            onImageUpload={handleImageUpload || (() => Promise.resolve(false))}
                            onImageRemove={handleCoverImageRemove}
                            currentImage={formData.coverImageUrl || formData.coverImageKey}
                            isUploading={isUploading}
                            error={errors.coverImageKey}
                            buttonText="Upload Cover Image"
                            changeText="Change Image" />
                    </div>

                    <Button 
                        variant="event" 
                        onClick={handleSubmit} 
                        className="self-start"
                        disabled={isSubmitting || isUploading}>
                        {isSubmitting ? 'Creating Event...' : 'Create Event'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ImagesAndCountStep