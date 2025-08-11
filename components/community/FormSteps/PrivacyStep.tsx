import Button from "@/components/ui/Button/Button";
import ToggleSwitch from "@/components/Form/ToggleSwitch/ToggleSwitch";
import styles from "./communitySteps.module.css";
import { StepProps } from "@/types/community";


const PrivacyStep: React.FC<StepProps> = ({ submitForm, navigation, formData, updateFormData, errors }: StepProps) => {
    const handlePrivacyChange = (isPrivate: boolean) => {
        updateFormData({ is_private: isPrivate });
    };

    const privacyOptions = [
        {
            icon: 'group',
            value: true,
            label: "Private Community",
            description: "Only invited members can join and see content"
        },
        {
            icon: 'lock',
            value: false,
            label: "Public Community", 
            description: "Anyone can join and participate in discussions"
        }
    ] as const;

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                { navigation && <p className={styles.navText}>{navigation}</p>}
    
                <div className={styles.contentMain}>
                    <h1>Final Touches, <br />almost ready to go</h1>
    
                    <div className={styles.form}>
                        <ToggleSwitch
                            variant="community"
                            options={privacyOptions}
                            value={formData.is_private}
                            onChange={handlePrivacyChange}
                            error={errors.is_private} />
                    </div>
    
                    <Button variant="community" onClick={submitForm} className="self-start">
                        Finish
                    </Button>
                </div>

                <p>By Clicking finish, you agree to our community guidelines and have read our terms of service and privacy policy</p>
            </div>
        </div>
    )
}

export default PrivacyStep