import Button from "@/components/ui/Button/Button";
import SelectInput from "@/components/Form/SelectInput/SelectInput";
import AddressInput from "@/components/Form/AddressInput/AddressInput";
import TextAreaInput from "@/components/Form/TextAreaInput/TextAreaInput";
import styles from "./eventSteps.module.css";
import { EventStepProps } from "@/types/event";

const eventTypeOptions = [
    { value: 'physical', label: 'Physical Event' },
    { value: 'online', label: 'Online Event' }
];

const LocationStep: React.FC<EventStepProps> = ({ 
    formData, 
    updateFormData, 
    errors, 
    nextStep, 
    navigation 
}: EventStepProps) => {

    const handleEventTypeChange = (value: string | null) => {
        updateFormData({ eventType: value as 'physical' | 'online' });
    };

    const handleAddressChange = (address: string, lat: number | unknown, lng: number | unknown, placeName?: string) => {
        updateFormData({
            location: {
                ...formData.location,
                address: address,
                name: placeName || address, // Use place name if available, fallback to address
                lat: typeof lat === 'number' ? lat : null,
                lng: typeof lng === 'number' ? lng : null
            }
        });
    };

    const handleLocationDetailsChange = (value: string) => {
        updateFormData({ locationDetails: value });
    };

    const getLocationDetailsPlaceholder = () => {
        if (formData.eventType === 'physical') {
            return "Provide details on how to access the building/location (e.g., parking instructions, entrance details, floor/room number)";
        } else {
            return "Provide details on how to join the event (e.g., meeting link, access codes, technical requirements)";
        }
    };

    const getLocationDetailsLabel = () => {
        if (formData.eventType === 'physical') {
            return "Access Instructions";
        } else {
            return "How to Join";
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                { navigation && <p className={styles.navText}>{navigation}</p>}
    
                <div className={styles.contentMain}>
                    <h1>Where is your <br />Event Happening?</h1>
    
                    <div className={styles.formSection}>
                        <SelectInput
                            name="eventType"
                            label="Event Type"
                            placeholder="Select event type"
                            options={eventTypeOptions}
                            value={formData.eventType}
                            onChange={handleEventTypeChange}
                            error={errors.eventType}
                            isRequired />

                        {formData.eventType === 'physical' && (
                            <AddressInput
                                name="eventAddress"
                                label="Event Location"
                                placeholder="Search for venues, businesses, or enter an address"
                                value={formData.location.address || ''}
                                onChange={handleAddressChange}
                                error={errors['location.name']}
                                isRequired />
                        )}

                        <TextAreaInput
                            name="locationDetails"
                            label={getLocationDetailsLabel()}
                            placeholder={getLocationDetailsPlaceholder()}
                            value={formData.locationDetails}
                            onChange={handleLocationDetailsChange}
                            error={errors.locationDetails}
                            maxLength={500}
                            minRows={3}
                            maxRows={6}
                            isRequired />
                    </div>
    
                    <Button variant="event" onClick={nextStep} className="self-start">
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default LocationStep