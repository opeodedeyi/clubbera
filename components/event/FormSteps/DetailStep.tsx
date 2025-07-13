import Button from "@/components/ui/Button/Button";
import { EventStepProps } from "@/types/event";
import styles from "./eventSteps.module.css";


const DetailStep: React.FC<EventStepProps> = ({ nextStep, navigation, ...otherProps }: EventStepProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                { navigation && <p className={styles.navText}>{navigation}</p>}
    
                <div className={styles.contentMain}>
                    <h1>Tells Us <br />About Your Event</h1>

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

export default DetailStep