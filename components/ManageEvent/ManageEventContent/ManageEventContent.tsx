'use client';

import { EventDetails } from "@/types/event";
import ManageEventTitle from '../ManageEventTitle copy/ManageEventTitle';
import ManageEventLayout from '@/components/layout/ManageEventLayout/ManageEventLayout';
import EventImageEdit from '@/components/Form/EventImageEdit/EventImageEdit';
import TextInput from '@/components/Form/TextInput/TextInput';
import TextAreaInput from '@/components/Form/TextAreaInput/TextAreaInput';
import AddressInput from '@/components/Form/AddressInput/AddressInput';
import NumberInput from '@/components/Form/NumberInput/NumberInput';
import DateInput from '@/components/Form/DateInput/DateInput';
import TimeInput from '@/components/Form/TimeInput/TimeInput';
import SelectInput from '@/components/Form/SelectInput/SelectInput';
import { useEditEvent } from '@/hooks/useEditEvent';
import styles from "./ManageEventContent.module.css";


interface ManageEventContentProps {
    initialEvent: EventDetails
}

const ManageEventContent: React.FC<ManageEventContentProps> = ({ initialEvent }: ManageEventContentProps) => {
    const {
        formData,
        errors,
        isUploading,
        isSaving,
        isOngoing,
        isPastEvent,
        hasUnsavedChanges,
        isFormValid,
        updateFormData,
        updateLocation,
        handleImageUpload,
        saveForm
    } = useEditEvent(initialEvent);

    console.log("initialEvent: ", initialEvent)

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            await handleImageUpload(file);
        }
    };

    const handleLocationSelect = (address: string, lat: number | unknown, lng: number | unknown, placeName?: string) => {
        updateLocation({
            name: placeName || address,
            address: address,
            lat: typeof lat === 'number' ? lat : 0,
            lng: typeof lng === 'number' ? lng : 0
        });
    };

    const handleSave = async () => {
        await saveForm();
    };

    return (
        <ManageEventLayout event={initialEvent}>
            <>
                <ManageEventTitle
                    title='Manage Event'
                    buttonText="Update Event"
                    hasUnsavedChanges={hasUnsavedChanges}
                    disabled={!hasUnsavedChanges || isSaving || !isFormValid || isPastEvent}
                    onClick={handleSave}
                    isSticky={true} />

                <div className={styles.form}>
                    <EventImageEdit
                        coverImageValue={formData.coverImageUrl}
                        uploadingState={isUploading}
                        onImageChange={handleImageChange}
                        disabled={isPastEvent || isOngoing} />

                    <TextInput
                        label="Event Title"
                        name="title"
                        placeholder="Enter event title"
                        value={formData.title}
                        onChange={(value) => updateFormData({ title: value })}
                        error={errors.title}
                        disabled={isPastEvent || isOngoing}
                        isRequired />

                    <TextAreaInput
                        label="Event Description"
                        name="description"
                        placeholder="Describe your event"
                        value={formData.description}
                        onChange={(value) => updateFormData({ description: value })}
                        error={errors.description}
                        disabled={isPastEvent || isOngoing}
                        isRequired />
                    
                    <NumberInput
                        label="Maximum Attendees"
                        name="maxAttendees"
                        placeholder="Enter maximum number of attendees"
                        value={formData.maxAttendees || ''}
                        onChange={(value) => updateFormData({ maxAttendees: typeof value === 'number' ? value : 0 })}
                        error={errors.maxAttendees}
                        disabled={isPastEvent || isOngoing}
                        min={1}
                        max={10000}
                        isRequired />
                </div>

                <div className={styles.form}>
                    <ManageEventTitle
                        title='Timing' />

                    <DateInput
                        label="Event Date"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={(value) => updateFormData({ eventDate: value })}
                        error={errors.eventDate}
                        disabled={isPastEvent || isOngoing}
                        isRequired />
                    
                    <TimeInput
                        label="Start Time"
                        name="startTimeInput"
                        value={formData.startTimeInput}
                        onChange={(value) => updateFormData({ startTimeInput: value })}
                        error={errors.startTimeInput}
                        disabled={isPastEvent || isOngoing}
                        isRequired />
                    
                    <TimeInput
                        label="End Time"
                        name="endTimeInput"
                        value={formData.endTimeInput}
                        onChange={(value) => updateFormData({ endTimeInput: value })}
                        error={errors.endTimeInput}
                        disabled={isPastEvent || isOngoing}
                        isRequired />
                </div>

                <div className={styles.form}>
                    <ManageEventTitle
                        title='Location' />

                    <SelectInput
                        label="Event Type"
                        name="eventType"
                        value={formData.eventType}
                        options={[
                            { value: 'physical', label: 'Physical Event' },
                            { value: 'online', label: 'Online Event' }
                        ]}
                        onChange={(value) => updateFormData({ eventType: value as "physical" | "online" })}
                        error={errors.eventType}
                        disabled={isPastEvent || isOngoing}
                        isRequired />

                    {/* Only show address input for physical events */}
                    {formData.eventType === "physical" && (
                        <AddressInput
                            label="Event Location"
                            name="location"
                            placeholder="Search for a location"
                            value={formData.location.address}
                            onChange={handleLocationSelect}
                            error={errors.location}
                            disabled={isPastEvent || isOngoing}
                            isRequired />
                    )}

                    <TextAreaInput
                        label={formData.eventType === "physical" ? "Access Instructions" : "How to join"}
                        name="locationDetails"
                        placeholder={formData.eventType === "physical" 
                            ? "Parking information, building access, room directions, etc." 
                            : "Meeting link, access codes, dial-in numbers, etc."}
                        value={formData.locationDetails}
                        onChange={(value) => updateFormData({ locationDetails: value })}
                        error={errors.locationDetails}
                        disabled={isPastEvent} />
                </div>
            </>
        </ManageEventLayout>
    )
}

export default ManageEventContent