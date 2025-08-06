import CommunityCard from '@/components/cards/community/CommunityCard/CommunityCard';
import styles from './DiscoverCommunities.module.css';


export default function DiscoverCommunities() {
    return (
        <div className={styles.container}>
            <h2>Discover Communities</h2>

            <div className={styles.containerCards}>
                <CommunityCard
                    url='200'
                    name='Action Bulls'
                    description='Join the Fight! Welcome to the ultimate Invincible community. Connect with heroes'
                    member={200}/>
            </div>

        </div>
    )
} 