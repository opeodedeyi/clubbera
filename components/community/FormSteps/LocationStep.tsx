import Button from "@/components/ui/Button/Button";
import CityInput from "@/components/Form/CityInput/CityInput";
import styles from "./communitySteps.module.css";
import { StepProps } from "@/types/community";


const LocationStep: React.FC<StepProps> = ({ nextStep, navigation, formData, updateFormData, errors }: StepProps) => {
    const handleLocationChange = (city: string, lat: number | null, lng: number | null) => {
        updateFormData({
            location: {
                city,
                lat,
                lng
            }
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                { navigation && <p className={styles.navText}>{navigation}</p>}
    
                <div className={styles.contentMain}>
                    <h1>Set Your <br />Community Location</h1>
    
                    <div className={styles.form}>
                        <CityInput
                            name="location"
                            label="City"
                            placeholder="Search for your city..."
                            value={formData.location.city}
                            onChange={handleLocationChange}
                            isRequired
                            error={errors['location.city']} />
                    </div>
    
                    <Button variant="community" onClick={nextStep} className="self-start">
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default LocationStep