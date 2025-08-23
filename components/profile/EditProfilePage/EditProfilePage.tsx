'use client';

import { useAccountManager } from '@/hooks/useAccountManager';
import { UserProfileByUrlResponse } from '@/lib/api/users';
import TextInput from '@/components/Form/TextInput/TextInput';
import Button from '@/components/ui/Button/Button';
import SelectInput from '@/components/Form/SelectInput/SelectInput';
import TextAreaInput from '@/components/Form/TextAreaInput/TextAreaInput';
import InterestsSelector from '@/components/Form/InterestsSelector/InterestsSelector';
import ProfileImageUpload from '@/components/Form/ProfileImageUpload/ProfileImageUpload';
import styles from './EditProfilePage.module.css';


interface ProfilePageClientProps {
    initialProfile: UserProfileByUrlResponse['data']
}

export default function EditProfilePage({ initialProfile }: ProfilePageClientProps) {
    const {
        formData,
        isLoading,
        // error,
        getFieldError,
        // success,
        profileImage,
        hasPersonalDetailsChanged,
        handleInputChange,
        handleSubmit,
        handleInterestsUpdate,
        handleImageUpload,
        // handleDeactivateAccount,
    } = useAccountManager(initialProfile);

    const genderOptions = [
        { value: 'prefer not to say', label: 'Prefer not to say' },
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' },
    ]

    return(
        <div className={styles.container}>
            <div className={styles.containerMain}>
                <ProfileImageUpload
                    currentImage={profileImage}
                    onUpload={(file) => {
                        console.log('ProfileImageUpload onUpload called');
                        handleImageUpload(file, 'profile');
                    }}
                    disabled={isLoading} />

                <div className={styles.profileDetailsTitle}>
                    <h2>Personal Details</h2>

                    {hasPersonalDetailsChanged && (
                        <Button
                            variant="default"
                            onClick={handleSubmit}
                            loading={isLoading}
                            disabled={isLoading}>
                            {isLoading ? 'Saving...' : 'Save Changes'}
                        </Button>
                    )}
                </div>

                <div className={styles.formInputs}>
                    <TextInput
                        name='name'
                        label='Name'
                        placeholder='Enter your fullname'
                        type='text'
                        value={formData.fullName}
                        onChange={(value) => handleInputChange('fullName', value)}
                        disabled={isLoading}
                        error={getFieldError('fullName')}
                        isRequired />

                    <SelectInput
                        label="Gender"
                        name="gender"
                        options={genderOptions}
                        value={formData.gender}
                        onChange={(value) => handleInputChange('gender', value)}
                        placeholder="Select your gender"
                        disabled={isLoading}
                        isRequired />

                    <TextAreaInput
                        name="bio"
                        label="Bio"
                        placeholder="Tell us about yourself..."
                        value={formData.bio}
                        onChange={(value) => handleInputChange('bio', value)}
                        maxLength={300}
                        minRows={3}
                        maxRows={8}
                        disabled={isLoading} />

                    <InterestsSelector
                        overlayTitle='Select Relevant Tags'
                        overlayDescription='Add 7 Tags That Capture Your Interests'
                        selectedInterests={formData.interests}
                        onInterestsChange={handleInterestsUpdate}
                        maxSelections={7}
                        variant='default'
                        disabled={isLoading}
                        label="Your Interests"
                        placeholder="Tap to select your interests" />
                </div>
            </div>

            {/* <div className={styles.manageAccount}>
                <h2>Manage Account</h2>

                {/* delete account button 
            </div> */}
        </div>
    )
}