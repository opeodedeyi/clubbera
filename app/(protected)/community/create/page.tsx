'use client';

import { FormStep } from "@/types/community";
import { useCommunityForm } from "@/hooks/useCommunityForm";
import Button from '@/components/ui/Button/Button'
import Icon from '@/components/ui/Icon/Icon'
import IntroductionStep from "@/components/community/FormSteps/IntroductionStep";
import LocationStep from "@/components/community/FormSteps/LocationStep";
import NameDescriptionStep from "@/components/community/FormSteps/NameDescriptionStep";
import ImagesAndTagsStep from "@/components/community/FormSteps/ImagesAndTagsStep";
import PrivacyStep from "@/components/community/FormSteps/PrivacyStep";
import PageWrapper from "@/components/ui/PageWrapper/PageWrapper";
import styles from "@/styles/pages/createcommunity.module.css";


const formSteps: FormStep[] = [
    {
        id: 0,
        navigation: 'Bring Your Vision to Life',
        component: IntroductionStep,
    },
    {
        id: 1,
        navigation: 'Step 1 of 3',
        component: LocationStep
    },
    {
        id: 2,
        navigation: 'Step 2 of 3',
        component: NameDescriptionStep
    },
    {
        id: 3,
        navigation: 'Step 3 of 3',
        component: ImagesAndTagsStep
    },
    {
        id: 4,
        navigation: null,
        component: PrivacyStep
    }
]

export default function CreateCommunity() {
    const {
        currentStep,
        formData,
        errors,
        isUploading,
        isSubmitting,
        updateFormData,
        handleImageUpload,
        nextStep,
        previousStep,
        goToStep,
        isValid,
        submitForm
    } = useCommunityForm()

    const CurrentStepComponent = formSteps[currentStep].component

    const stepProps = {
        currentStep,
        formData,
        errors,
        isUploading,
        isSubmitting,
        updateFormData,
        handleImageUpload,
        nextStep,
        previousStep,
        goToStep,
        isValid,
        submitForm
    }

    return (
        <PageWrapper showParticles={false}>
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