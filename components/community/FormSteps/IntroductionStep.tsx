import Icon from "@/components/ui/Icon/Icon";
import Button from "@/components/ui/Button/Button";
import styles from "./communitySteps.module.css";
import { StepProps } from "@/types/community";


export interface introductionContentProps {
    id: number
    title: string
    description: string
}

const introductionContent: introductionContentProps[] = [
    {
        id: 0,
        title: 'Set the Foundation',
        description: 'Choose a name, add a description, and pick a category that defines your community’s purpose.'
    },
    {
        id: 1,
        title: 'Customize Your Space',
        description: 'Add a profile image, cover photo, and details to make it uniquely yours.'
    },
    {
        id: 2,
        title: 'Invite Your Crew',
        description: 'Share your community with friends, followers, or anyone who’d love to join.'
    },
]

const IntroductionStep: React.FC<StepProps> = ({ nextStep, navigation }) => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                { navigation && <p className={styles.navText}>{navigation}</p>}

                <div className={styles.contentMain}>
                    <h1>Create a <br />New Community</h1>

                    <div className={styles.ul}>
                        {introductionContent.map((item) => (
                            <div key={item.id} className={styles.li}>
                                <Icon
                                    name="tickStylish"
                                    size="xs"
                                    color="var(--color-community)"/>

                                <div className={styles.liText}>
                                    <h3 className={styles.liTitle}>{item.title}</h3>

                                    <p className={styles.liDescription}>{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Button variant="community" onClick={nextStep} className="self-start">
                        Create Community
                    </Button>
                </div>
            </div>

            <div className={`${styles.side} desktop-only-flex`}>
                {/* card goes here */}
            </div>
        </div>
    )
}

export default IntroductionStep