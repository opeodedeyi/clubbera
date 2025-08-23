'use client';

import { getS3ImageUrl } from '@/lib/s3Utils';
import EditCommunityTitle from '../EditCommunityTitle/EditCommunityTitle';
import { useEditCommunityActions } from '@/hooks/useEditCommunityActions';
import { CommunityData, CommunityPermissions } from '@/lib/api/communities';
import BackButton from '@/components/ui/BackButton/BackButton';
import TextInput from '@/components/Form/TextInput/TextInput';
import CityInput from '@/components/Form/CityInput/CityInput';
import CommunityImageEdit from '@/components/Form/CommunityImageEdit/CommunityImageEdit';
import ToggleSwitch from "@/components/Form/ToggleSwitch/ToggleSwitch";
import TextAreaInput from '@/components/Form/TextAreaInput/TextAreaInput';
import MarkdownInput from '@/components/Form/MarkdownInput/MarkdownInput';
import InterestsSelector from '@/components/Form/InterestsSelector/InterestsSelector';
import ManageCommunity from '@/components/layout/ManageCommunity/ManageCommunity';
import styles from './EditCommunityClient.module.css';


interface Props {
    community: CommunityData;
    permissions?: CommunityPermissions; 
}

export default function EditCommunityClient({ community: initialCommunity, permissions }: Props) {
    const {
        community,
        formData,
        hasUnsavedChanges,
        uploadingStates,
        isSaving,
        errors,
        isFormValid,
        updateFormData,
        handleImageUpload,
        handleTagsUpdate,
        saveChanges
    } = useEditCommunityActions(initialCommunity);

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>, imageType: 'profile_image' | 'cover_image') => {
        const file = event.target.files?.[0];
        if (file) {
            await handleImageUpload(file, imageType);
        }
    };

    const handleLocationChange = (city: string, lat: number | null, lng: number | null) => {
        updateFormData({
            location: {
                city,
                lat,
                lng
            }
        });
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
        <>
            <BackButton className={`${styles.backBtn} self-start`}/>

            <CommunityImageEdit
                profileImageValue={
                    community.profileImage?.provider === 'aws-s3' ?
                    getS3ImageUrl(community.profileImage?.key) :
                    community.profileImage?.key
                }
                coverImageValue={
                    community.coverImage?.provider === 'aws-s3' ?
                    getS3ImageUrl(community.coverImage?.key) :
                    community.coverImage?.key
                }
                uploadingStates={uploadingStates}
                onImageChange={handleImageChange} />

            <ManageCommunity community={community} permissions={permissions}>
                <div className={styles.mainContent}>
                    <div className={styles.section}>
                        <EditCommunityTitle
                            title="Community Overview"
                            description="Make Edit to your community"
                            buttonText="Save Changes"
                            hasUnsavedChanges={hasUnsavedChanges}
                            disabled={!hasUnsavedChanges || isSaving || !isFormValid}
                            onClick={saveChanges}
                            isSticky/>
                        
                        <div className={styles.sideBySide}>
                            <div className={styles.form}>
                                <TextInput
                                    name='name'
                                    label='Name'
                                    placeholder='Whats your community name'
                                    type='text'
                                    value={formData.name}
                                    onChange={(value) => updateFormData({ name: value })}
                                    error={errors.name}
                                    isRequired />

                                <CityInput
                                    name="location"
                                    label="City"
                                    placeholder="City, Country"
                                    value={formData.location.city}
                                    onChange={handleLocationChange}
                                    isRequired
                                    error={errors['location.city']} />
                                
                                <TextAreaInput
                                    name="tagline"
                                    label="Tagline"
                                    placeholder="A short tagline for your community"
                                    value={formData.tagline}
                                    onChange={(value) => updateFormData({ tagline: value })}
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
                                    onChange={(value) => updateFormData({ description: value })}
                                    minRows={3}
                                    maxRows={8}
                                    error={errors.description}
                                    isRequired />
                            </div>

                            <div className={styles.form}>
                                <InterestsSelector
                                    overlayTitle='Select Relevant Tags'
                                    overlayDescription='Add 3 Tags That Capture Your Community&apos;s Essence'
                                    selectedInterests={formData.tags}
                                    onInterestsChange={handleTagsUpdate}
                                    maxSelections={3}
                                    variant='community'
                                    label="Tags"
                                    placeholder="Select Relevant Tags" />
                                
                                <MarkdownInput
                                    name="guidelines"
                                    label="Community Rules and Guidelines"
                                    placeholder="Set the rules for your community"
                                    value={formData.guidelines}
                                    onChange={(value) => updateFormData({ guidelines: value })}
                                    error={errors.guidelines} />
                            </div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <EditCommunityTitle
                            title="Privacy Settings"
                            description="Make your community safer"/>

                        <div className={styles.form}>
                            <ToggleSwitch
                                variant="community"
                                options={privacyOptions}
                                value={formData.is_private}
                                onChange={(value) => updateFormData({ is_private: value })}
                                error={errors.is_private} />
                        </div>
                    </div>
                </div>
            </ManageCommunity>
        </>
    );
}