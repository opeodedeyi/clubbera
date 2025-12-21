import Icon from '@/components/ui/Icon/Icon';
import styles from './CommunityDropdown.module.css';

interface Community {
    id: string;
    name: string;
}

interface CommunityDropdownProps {
    selectedCommunity: Community | null;
    communities: Community[];
    isOpen: boolean;
    onToggle: () => void;
    onSelect: (community: Community) => void;
}

export default function CommunityDropdown({
    selectedCommunity,
    communities,
    isOpen,
    onToggle,
    onSelect
}: CommunityDropdownProps) {
    const truncateText = (text: string, maxLength: number = 18) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength - 3) + '...';
    };

    return (
        <div className={styles.dropdownWrapper}>
            <button className={styles.dropdownButton} onClick={onToggle}>
                <Icon className={styles.dropdownButtonGlobe} name="globe" size='sm' />
                <div className={styles.dropdownText}>
                    <span>{selectedCommunity ? truncateText(selectedCommunity.name) : 'Select community'}</span>
                </div>

                <Icon className={styles.dropdownButtonArrow} name="arrowDown" size='sm' />
            </button>

            {isOpen && (
                <div className={styles.dropdownMenu}>
                    {communities.map((community) => (
                        <button
                            key={community.id}
                            className={`${styles.dropdownItem} ${
                                selectedCommunity?.id === community.id ? styles.selected : ''
                            }`}
                            onClick={() => onSelect(community)}>
                            {community.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
