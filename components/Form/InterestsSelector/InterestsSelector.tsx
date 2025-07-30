'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon/Icon';
import SearchBar from '@/components/ui/SearchBar/SearchBar';
import Button from '@/components/ui/Button/Button';
import OverlayPortal from '@/components/ui/OverlayPortal/OverlayPortal';
import { interestCategories } from '@/lib/data/interests';
import styles from './InterestsSelector.module.css';


interface InterestsSelectorProps {
    overlayTitle?: string
    overlayDescription?: string
    selectedInterests: string[]
    onInterestsChange: (interests: string[]) => void
    maxSelections?: number
    disabled?: boolean
    label?: string
    variant?: 'default' | 'event' | 'community'
    placeholder?: string
    className?: string
}

export default function InterestsSelector({
    overlayTitle,
    overlayDescription,
    selectedInterests,
    onInterestsChange,
    maxSelections = 3,
    disabled = false,
    variant = 'default',
    label = "Interests",
    placeholder = "Select your interests",
    className = ''
}: InterestsSelectorProps) {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredCategories, setFilteredCategories] = useState(interestCategories)
    const [chipToDelete, setChipToDelete] = useState<string | null>(null)

    useEffect(() => {
        if (!searchTerm.trim()) {
            setFilteredCategories(interestCategories)
            return
        }

        const filtered = interestCategories.map(category => ({
            ...category,
            interests: category.interests.filter(interest =>
                interest.toLowerCase().includes(searchTerm.toLowerCase())
            )
        })).filter(category => category.interests.length > 0)

        setFilteredCategories(filtered)
    }, [searchTerm])

    const isInterestSelected = (interest: string): boolean => {
        return selectedInterests.some(selected => 
            selected.toLowerCase() === interest.toLowerCase()
        )
    }

    const handleInterestToggle = (interest: string) => {
        const isSelected = isInterestSelected(interest)
        
        if (isSelected) {
            onInterestsChange(
                selectedInterests.filter(i => 
                    i.toLowerCase() !== interest.toLowerCase()
                )
            )
        } else {
            if (selectedInterests.length < maxSelections) {
                onInterestsChange([...selectedInterests, interest])
            }
        }
    }

    const handleChipClick = (interest: string) => {
        if (chipToDelete === interest) {
            handleRemoveInterest(interest)
            setChipToDelete(null)
        } else {
            setChipToDelete(interest)
        }
    }

    const handleRemoveInterest = (interestToRemove: string) => {
        onInterestsChange(
            selectedInterests.filter(interest => 
                interest.toLowerCase() !== interestToRemove.toLowerCase()
            )
        )
    }

    const handleOpenOverlay = () => {
        if (!disabled) {
            setIsOverlayOpen(true)
            document.body.style.overflow = 'hidden'
        }
    }

    const handleCloseOverlay = () => {
        setIsOverlayOpen(false)
        setSearchTerm('')
        document.body.style.overflow = 'unset'
    }

    useEffect(() => {
        setChipToDelete(null)
    }, [isOverlayOpen, selectedInterests])

    const isMaxReached = selectedInterests.length >= maxSelections

    return (
        <div className={`${styles.interestsContainer} ${className}`}>
            {label && (
                <label>{label}</label>
            )}

            <div 
                className={`${styles.inputTrigger} ${disabled ? styles.disabled : ''}`}
                onClick={handleOpenOverlay}>
                <span className={styles.placeholder}>
                    {selectedInterests.length > 0 
                        ? `${selectedInterests.length} interest${selectedInterests.length > 1 ? 's' : ''} selected`
                        : placeholder
                    }
                </span>
                <Icon
                    size='xs'
                    name="arrowDown"
                    color='var(--color-text-light)'
                    aria-hidden="true" />
            </div>

            {selectedInterests.length > 0 && (
                <div className={styles.selectedChips}>
                    {selectedInterests.map((interest) => {
                        const isReadyToDelete = chipToDelete === interest
                        return (
                            <div
                                key={interest}
                                className={`${styles.chip} ${
                                    isReadyToDelete ? styles.chipDanger : styles[variant]
                                }`}
                                onClick={() => handleChipClick(interest)}>
                                <span>{interest}</span>
                            </div>
                        )
                    })}
                </div>
            )}

            {isOverlayOpen && (
                <OverlayPortal>
                    <div className={styles.overlay} onClick={handleCloseOverlay}>
                        <div 
                            className={styles.overlayContent} 
                            onClick={(e) => e.stopPropagation()}>

                            <div className={styles.overlayHeader}>
                                <Button
                                    variant='plain'
                                    className='self-start'
                                    onClick={handleCloseOverlay}
                                    iconLeft={<Icon name='arrowLeft' size='xs' />}
                                    aria-label="Close interests selector">
                                    Back
                                </Button>

                                <div className={styles.overlayText}>
                                    <h2>{overlayTitle}</h2>
                                    <p>{overlayDescription}</p>
                                </div>
                            </div>

                            <div className={styles.searchContainer}>
                                <SearchBar
                                    size="small"
                                    className={styles.searchBar}
                                    placeholder="Search for a tag"
                                    value={searchTerm}
                                    onChange={setSearchTerm}/>
                            </div>

                            {isMaxReached && (
                                <div className={styles.maxWarning}>
                                    You&apos;ve reached the maximum of {maxSelections} interests. 
                                    Remove one to select another.
                                </div>
                            )}

                            <div className={styles.categoriesContainer}>
                                {filteredCategories.length === 0 ? (
                                    <div className={styles.noResults}>
                                        No interests found for &quot;{searchTerm}&quot;
                                    </div>
                                ) : (
                                    filteredCategories.map((category) => (
                                        <div key={category.id} className={styles.category}>
                                            <p className={styles.categoryTitle}>
                                                {category.name}
                                            </p>
                                            <div className={styles.categoryTags}>
                                                {category.interests.map((interest) => {
                                                    const isSelected = isInterestSelected(interest)
                                                    const canSelect = !isSelected && !isMaxReached
                                                    return (
                                                        <div
                                                            key={interest}
                                                            className={`${styles.interestButton} ${
                                                                isSelected ? `${styles.selected} ${styles[variant]}` : ''
                                                            } ${!canSelect && !isSelected ? styles.disabledButton : ''}`}
                                                            onClick={() => handleInterestToggle(interest)}>
                                                            {interest}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className={styles.overlayFooter}>
                                <p className={styles.footerText}>
                                    {selectedInterests.length} out of {maxSelections}
                                </p>

                                <Button
                                    variant={variant}
                                    onClick={handleCloseOverlay}>
                                    Continue
                                </Button>
                            </div>
                        </div>
                    </div>
                </OverlayPortal>
            )}
        </div>
    )
}