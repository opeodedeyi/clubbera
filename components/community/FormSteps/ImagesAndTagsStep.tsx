import Button from "@/components/ui/Button/Button";
import styles from "./communitySteps.module.css";
import { StepProps } from "@/types/community";


const ImagesAndTagsStep: React.FC<StepProps> = ({ nextStep, navigation, ...otherProps }: StepProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                { navigation && <p className={styles.navText}>{navigation}</p>}
    
                <div className={styles.contentMain}>
                    <h1>Make Your <br />Community Shine</h1>
    
                    {/* <div className={styles.ul}>
                        form goes here
                    </div> */}
    
                    <Button variant="community" onClick={nextStep} className="self-start">
                        Continue
                    </Button>
                </div>
            </div>

            <div className={`${styles.side} desktop-only-flex`}>
                {/* card goes here */}
            </div>
        </div>
    )
}

export default ImagesAndTagsStep