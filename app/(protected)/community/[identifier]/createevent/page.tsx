'use client';

import { EventFormStep } from "@/types/event";
import { useEventForm } from "@/hooks/useEventForm";
import Button from '@/components/ui/Button/Button';
import Icon from '@/components/ui/Icon/Icon';
import LocationStep from "@/components/event/FormSteps/LocationStep";
import DetailStep from "@/components/event/FormSteps/DetailStep";
import ImagesAndCountStep from "@/components/event/FormSteps/ImagesAndCountStep";
import PreviewStep from "@/components/event/FormSteps/PreviewStep";
import PageWrapper from "@/components/ui/PageWrapper/PageWrapper";
import styles from "@/styles/pages/createcommunity.module.css";


const formSteps: EventFormStep[] = [
    {
        id: 0,
        navigation: 'Step 1 of 3',
        component: LocationStep
    },
    {
        id: 1,
        navigation: 'Step 2 of 3',
        component: DetailStep
    },
    {
        id: 2,
        navigation: 'Step 3 of 3',
        component: ImagesAndCountStep
    },
    {
        id: 3,
        navigation: 'Your event is Live ✨',
        component: PreviewStep
    }
]

export default function CreateEvent() {
    const {
        currentStep,
        formData,
        errors,
        isUploading,
        updateFormData,
        handleImageUpload,
        nextStep,
        previousStep,
        isValid,
        submitForm
    } = useEventForm()

    const CurrentStepComponent = formSteps[currentStep].component

    const stepProps = {
        currentStep,
        formData,
        errors,
        isUploading,
        updateFormData,
        handleImageUpload,
        nextStep,
        previousStep,
        isValid,
        submitForm
    }

    return (
        <PageWrapper showParticles={currentStep === 3 ? true : false} particlesHeight={650}>
            <div className={styles.container}>
                <Button
                    variant='plain'
                    onClick={previousStep}
                    iconLeft={<Icon name='arrowLeft' size='xs' />}
                    aria-label="Go back to previous page">
                    Back
                </Button>

                <div className={`${styles.mainContainer}`}>
                    <CurrentStepComponent
                        navigation={formSteps[currentStep].navigation}
                        { ...stepProps } />
                </div>
            </div>
        </PageWrapper>
    );
}