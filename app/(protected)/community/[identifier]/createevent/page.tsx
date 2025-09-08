'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { EventFormStep } from "@/types/event";
import { useEventForm } from "@/hooks/useEventForm";
import { communityApi } from '@/lib/api/communities';
import type { CommunityPermissions } from '@/lib/api/communities';
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
    const params = useParams();
    const router = useRouter();
    const [isLoadingPermissions, setIsLoadingPermissions] = useState(true);
    const [hasPermission, setHasPermission] = useState(false);
    const [permissionError, setPermissionError] = useState<string | null>(null);
    const [communityId, setCommunityId] = useState<number | null>(null);

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

    useEffect(() => {
        const checkPermissions = async () => {
            try {
                setIsLoadingPermissions(true);
                setPermissionError(null);

                const identifier = params.identifier as string;
                if (!identifier) {
                    setPermissionError('Community not found');
                    return;
                }

                // Convert identifier to number if it's a community ID
                const id = parseInt(identifier);
                if (isNaN(id)) {
                    setPermissionError('Invalid community identifier');
                    return;
                }

                setCommunityId(id);

                // Check user permissions for this community
                const response = await communityApi.getCommunityPermissions(id);
                const permissions: CommunityPermissions = response.data;

                console.log('User permissions:', permissions);

                if (permissions.canCreateEvents) {
                    setHasPermission(true);
                } else {
                    setPermissionError('You do not have permission to create events in this community');
                }
            } catch (error) {
                console.error('Error checking permissions:', error);
                setPermissionError('Failed to check permissions. Please try again.');
            } finally {
                setIsLoadingPermissions(false);
            }
        };

        checkPermissions();
    }, [params.identifier]);

    const handleSubmit = async () => {
        if (communityId && hasPermission) {
            return await submitForm(communityId);
        }
        return false;
    };

    const handleGoBack = () => {
        if (currentStep === 0) {
            // Go back to community page
            router.push(`/community/${params.identifier}`);
        } else {
            previousStep();
        }
    };

    // Loading state
    if (isLoadingPermissions) {
        return (
            <PageWrapper>
                <div className={styles.container}>
                    <div className={styles.mainContainer}>
                        <div style={{ textAlign: 'center', padding: '2rem' }}>
                            <p>Checking permissions...</p>
                        </div>
                    </div>
                </div>
            </PageWrapper>
        );
    }

    // Permission error state
    if (permissionError || !hasPermission) {
        return (
            <PageWrapper>
                <div className={styles.container}>
                    <Button
                        variant='plain'
                        onClick={() => router.push(`/community/${params.identifier}`)}
                        iconLeft={<Icon name='arrowLeft' size='xs' />}
                        aria-label="Go back to community">
                        Back to Community
                    </Button>

                    <div className={styles.mainContainer}>
                        <div style={{ textAlign: 'center', padding: '2rem' }}>
                            <h2>Access Denied</h2>
                            <p>{permissionError || 'You do not have permission to create events in this community'}</p>
                            <Button
                                variant='default'
                                onClick={() => router.push(`/community/${params.identifier}`)}>
                                Back to Community
                            </Button>
                        </div>
                    </div>
                </div>
            </PageWrapper>
        );
    }

    // Main form (user has permission)
    const CurrentStepComponent = formSteps[currentStep].component;

    const stepProps = {
        currentStep,
        formData,
        errors,
        isUploading,
        updateFormData,
        handleImageUpload,
        nextStep,
        previousStep: handleGoBack,
        isValid,
        submitForm: handleSubmit
    };

    return (
        <PageWrapper showParticles={currentStep === 3 ? true : false} particlesHeight={650}>
            <div className={styles.container}>
                <Button
                    variant='plain'
                    onClick={handleGoBack}
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