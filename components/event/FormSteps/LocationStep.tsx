import Button from "@/components/ui/Button/Button";
import styles from "./eventSteps.module.css";
import { EventStepProps } from "@/types/event";


const LocationStep: React.FC<EventStepProps> = ({ nextStep, navigation }: EventStepProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                { navigation && <p className={styles.navText}>{navigation}</p>}
    
                <div className={styles.contentMain}>
                    <h1>Where is your <br />Event Happening?</h1>
    
                    {/* <div className={styles.ul}>
                        form goes here
                    </div> */}
    
                    <Button variant="event" onClick={nextStep} className="self-start">
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default LocationStep