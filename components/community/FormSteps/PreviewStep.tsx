import CommunityCard from '@/components/cards/community/CommunityCard/CommunityCard';
import { StepProps } from "@/types/community";
import { getS3ImageUrl } from '@/lib/s3Utils';
import styles from "./communitySteps.module.css";

const PreviewStep: React.FC<StepProps> = ({ formData }: StepProps) => {
    return (
        <div className={styles.containerCenter}>
            <CommunityCard
                name={formData.name}
                description={formData.tagline || "you have not set community tagline"}
                profile={getS3ImageUrl(formData.profile_image?.key)}
                cover={getS3ImageUrl(formData.cover_image?.key)}
                member={0}/>
        </div>
    )
}

export default PreviewStep