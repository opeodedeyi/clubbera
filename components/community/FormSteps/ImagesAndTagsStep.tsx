import CommunityCard from '@/components/cards/community/CommunityCard/CommunityCard';
import InterestsSelector from '@/components/Form/InterestsSelector/InterestsSelector';
import ImageUpload from '@/components/Form/ImageUpload/ImageUpload';
import Button from "@/components/ui/Button/Button";
import { getS3ImageUrl } from '@/lib/s3Utils';
import { StepProps } from "@/types/community";
import styles from "./communitySteps.module.css";


const ImagesAndTagsStep: React.FC<StepProps> = ({ nextStep, navigation, formData, updateFormData, handleImageUpload, isUploading, errors }: StepProps) => {
    const handleTagsUpdate = (tag: string[]) => {
        updateFormData({ tags: tag });
    };

    const handleProfileImageUpload = async (file: File) => {
        if (handleImageUpload) {
            return await handleImageUpload(file, 'profile_image');
        }
        return false;
    };

    const handleCoverImageUpload = async (file: File) => {
        if (handleImageUpload) {
            return await handleImageUpload(file, 'cover_image');
        }
        return false;
    };

    const handleProfileImageRemove = () => {
        updateFormData({
            profile_image: {
                provider: undefined,
                key: undefined,
                alt_text: undefined
            }
        });
    };

    const handleCoverImageRemove = () => {
        updateFormData({
            cover_image: {
                provider: undefined,
                key: undefined,
                alt_text: undefined
            }
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                { navigation && <p className={styles.navText}>{navigation}</p>}
    
                <div className={styles.contentMain}>
                    <h1>Make Your <br />Community Shine</h1>
    
                    <div className={styles.form}>
                        <ImageUpload
                            label="Profile Image"
                            description="We recommend an image that&apos;s at least 500px wide by 500 px tall."
                            onImageUpload={handleProfileImageUpload}
                            onImageRemove={handleProfileImageRemove}
                            currentImage={formData.profile_image?.key}
                            isUploading={isUploading}
                            error={errors.profile_image}
                            buttonText="Upload Profile Image" />

                        <ImageUpload
                            label="Cover Image"
                            description="We recommend an image that&apos;s at least 800px wide by 300 px tall."
                            onImageUpload={handleCoverImageUpload}
                            onImageRemove={handleCoverImageRemove}
                            currentImage={formData.cover_image?.key}
                            isUploading={isUploading}
                            error={errors.cover_image}
                            buttonText="Upload Cover Image" />

                        <InterestsSelector
                            overlayTitle='Select Relevant Tags'
                            overlayDescription='Add 3 Tags That Capture Your Community&apos;s Essence'
                            selectedInterests={formData.tags}
                            onInterestsChange={handleTagsUpdate}
                            maxSelections={3}
                            variant='community'
                            label="Tags"
                            placeholder="Select Relevant Tags" />
                    </div>
    
                    <Button variant="community" onClick={nextStep} className="self-start">
                        Continue
                    </Button>
                </div>
            </div>

            <div className={`${styles.side} desktop-only-flex`}>
                <CommunityCard
                    name={formData.name}
                    description={formData.tagline || "you have not set community tagline"}
                    profile={getS3ImageUrl(formData.profile_image?.key)}
                    cover={getS3ImageUrl(formData.cover_image?.key)}
                    member={0}/>
            </div>
        </div>
    )
}

export default ImagesAndTagsStep