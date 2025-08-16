import TextInput from '@/components/Form/TextInput/TextInput';
import TextAreaInput from '@/components/Form/TextAreaInput/TextAreaInput';
import Button from "@/components/ui/Button/Button";
import styles from "./communitySteps.module.css";
import { StepProps } from "@/types/community";


const NameDescriptionStep: React.FC<StepProps> = ({ nextStep, navigation, formData, updateFormData, errors }: StepProps) => {
    const handleNameChange = (value: string) => {
        updateFormData({ name: value });
    };

    const handleDescriptionChange = (value: string) => {
        updateFormData({ description: value });
    };

    const handleTaglineChange = (value: string) => {
        updateFormData({ tagline: value });
    };
    
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                { navigation && <p className={styles.navText}>{navigation}</p>}
    
                <div className={styles.contentMain}>
                    <h1>Shape Your <br />Community&apos;s Identity</h1>
    
                    <div className={styles.form}>
                        <TextInput
                            name='name'
                            label='Name'
                            placeholder='Whats your community name'
                            type='text'
                            value={formData.name}
                            onChange={handleNameChange}
                            error={errors.name}
                            isRequired />
                        
                        <TextAreaInput
                            name="tagline"
                            label="Tagline"
                            placeholder="A short tagline for your community"
                            value={formData.tagline}
                            onChange={handleTaglineChange}
                            maxLength={150}
                            minRows={3}
                            maxRows={4}
                            error={errors.tagline}
                            isRequired />

                        <TextAreaInput
                            name="description"
                            label="Description"
                            placeholder="Describe your community"
                            value={formData.description}
                            onChange={handleDescriptionChange}
                            minRows={3}
                            maxRows={8}
                            error={errors.description}
                            isRequired />
                    </div>
    
                    <Button variant="community" onClick={nextStep} className="self-start">
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default NameDescriptionStep