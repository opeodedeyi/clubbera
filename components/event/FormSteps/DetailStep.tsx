import Button from "@/components/ui/Button/Button";
import TextInput from "@/components/Form/TextInput/TextInput";
import TextAreaInput from "@/components/Form/TextAreaInput/TextAreaInput";
import DateInput from "@/components/Form/DateInput/DateInput";
import TimeInput from "@/components/Form/TimeInput/TimeInput";
import { EventStepProps } from "@/types/event";
import styles from "./eventSteps.module.css";

const DetailStep: React.FC<EventStepProps> = ({ 
    formData, 
    updateFormData, 
    errors, 
    nextStep, 
    navigation 
}: EventStepProps) => {

    const handleTitleChange = (value: string) => {
        updateFormData({ title: value });
    };

    const handleDescriptionChange = (value: string) => {
        updateFormData({ description: value });
    };

    const handleEventDateChange = (value: string) => {
        updateFormData({ eventDate: value });
    };

    const handleStartTimeChange = (value: string) => {
        updateFormData({ startTimeInput: value });
    };

    const handleEndTimeChange = (value: string) => {
        updateFormData({ endTimeInput: value });
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                { navigation && <p className={styles.navText}>{navigation}</p>}
    
                <div className={styles.contentMain}>
                    <h1>Tell Us <br />About Your Event</h1>

                    <div className={styles.formSection}>
                        <TextInput
                            name="eventTitle"
                            label="Event Title"
                            placeholder="Give your event a catchy title"
                            value={formData.title}
                            onChange={handleTitleChange}
                            error={errors.title}
                            maxLength={100}
                            isRequired />

                        <TextAreaInput
                            name="eventDescription"
                            label="Event Description"
                            placeholder="Describe what your event is about, who should attend, and what attendees can expect"
                            value={formData.description}
                            onChange={handleDescriptionChange}
                            error={errors.description}
                            maxLength={1000}
                            minRows={4}
                            maxRows={8}
                            isRequired />

                        <DateInput
                            name="eventDate"
                            label="Event Date"
                            value={formData.eventDate}
                            onChange={handleEventDateChange}
                            error={errors.eventDate}
                            isRequired />

                        <div className={styles.timeInputsRow}>
                            <TimeInput
                                name="startTime"
                                label="Start Time"
                                value={formData.startTimeInput}
                                onChange={handleStartTimeChange}
                                error={errors.startTimeInput}
                                isRequired />

                            <TimeInput
                                name="endTime"
                                label="End Time"
                                value={formData.endTimeInput}
                                onChange={handleEndTimeChange}
                                error={errors.endTimeInput}
                                isRequired />
                        </div>
                    </div>

                    <Button variant="event" onClick={nextStep} className="self-start">
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default DetailStep