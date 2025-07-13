import Button from "@/components/ui/Button/Button";
import styles from "./communitySteps.module.css";
import { StepProps } from "@/types/community";


const PrivacyStep: React.FC<StepProps> = ({ nextStep, navigation }: StepProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                { navigation && <p className={styles.navText}>{navigation}</p>}
    
                <div className={styles.contentMain}>
                    <h1>Final Touches, <br />almost ready to go</h1>
    
                    {/* <div className={styles.ul}>
                        form goes here
                    </div> */}
    
                    <Button variant="community" onClick={nextStep} className="self-start">
                        Finish
                    </Button>
                </div>

                <p>By Clicking finish, you agree to our community guidelines and have read our terms of service and privacy policy</p>
            </div>
        </div>
    )
}

export default PrivacyStep