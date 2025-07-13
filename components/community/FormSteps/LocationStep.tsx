import Button from "@/components/ui/Button/Button";
import styles from "./communitySteps.module.css";
import { StepProps } from "@/types/community";


const LocationStep: React.FC<StepProps> = ({ nextStep, navigation }: StepProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                { navigation && <p className={styles.navText}>{navigation}</p>}
    
                <div className={styles.contentMain}>
                    <h1>Set Your <br />Community Location</h1>
    
                    {/* <div className={styles.ul}>
                        form goes here
                    </div> */}
    
                    <Button variant="community" onClick={nextStep} className="self-start">
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default LocationStep