// components/ui/Select/Select.tsx
'use client'

import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/Icon/Icon';
import styles from './SelectInput.module.css';

export interface SelectOption {
    value: string | null // Update type to allow null
    label: string
    disabled?: boolean
}

interface SelectProps {
    options: SelectOption[]
    value?: string | null // Update type to allow null
    placeholder?: string
    label?: string
    name?: string
    disabled?: boolean
    isRequired?: boolean
    error?: string
    onChange: (value: string | null) => void // Update type to allow null
    className?: string
}

export default function SelectInput({
    options,
    value,
    placeholder = "Select an option",
    label,
    name,
    disabled = false,
    error,
    onChange,
    className = ''
}: SelectProps) {
    const [isOpen, setIsOpen] = useState(false)
    
    // Helper function to find option by value, handling null properly
    const findOptionByValue = (searchValue: string | null | undefined): SelectOption | null => {
        return options.find(option => {
            // Handle null values specifically
            if (searchValue === null && option.value === null) return true
            if (searchValue === undefined && option.value === null) return true
            return option.value === searchValue
        }) || null
    }
    
    const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
        findOptionByValue(value)
    )
    
    const selectRef = useRef<HTMLDivElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!isOpen) return

            switch (event.key) {
                case 'Escape':
                    setIsOpen(false)
                    break
                case 'ArrowDown':
                    event.preventDefault()
                    break
                case 'ArrowUp':
                    event.preventDefault()
                    break
                case 'Enter':
                    event.preventDefault()
                    break
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown)
            return () => document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen])

    // Update selected option when value prop changes - using the helper function
    useEffect(() => {
        const newSelectedOption = findOptionByValue(value)
        setSelectedOption(newSelectedOption)
    }, [value, options])

    const handleToggle = () => {
        if (!disabled) {
            setIsOpen(!isOpen)
        }
    }

    const handleOptionSelect = (option: SelectOption) => {
        if (option.disabled) return
        
        setSelectedOption(option)
        setIsOpen(false)
        onChange(option.value) // This will now correctly pass null if option.value is null
    }

    // Helper function to check if an option is selected
    const isOptionSelected = (option: SelectOption): boolean => {
        if (selectedOption === null) return false
        
        // Handle null values specifically
        if (option.value === null && selectedOption.value === null) return true
        return option.value === selectedOption.value
    }

    const selectClasses = [
        styles.select,
        disabled && styles.disabled,
        error && styles.error,
        isOpen && styles.open,
        className
    ].filter(Boolean).join(' ')

    const triggerClasses = [
        styles.trigger,
        isOpen && styles.open,
        !selectedOption && styles.placeholder
    ].filter(Boolean).join(' ')

    return (
        <div className={styles.inputContainer}>
            {label && (
                <label htmlFor={name}>{label}</label>
            )}
            
            <div ref={selectRef} className={selectClasses}>
                <div
                    id={name}
                    className={triggerClasses}
                    onClick={handleToggle}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    aria-describedby={error ? `${name}-error` : undefined}>
                    
                    <span className={styles.value}>
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                    
                    <Icon
                        size='xs'
                        name="arrowDown"
                        color='var(--color-text-light)'
                        className={styles.chevron}
                        aria-hidden="true" />
                </div>

                {isOpen && (
                    <div
                        ref={dropdownRef}
                        className={styles.dropdown}
                        role="listbox">
                        {options.map((option, index) => (
                            <button
                                key={option.value ?? `null-option-${index}`} // Handle null keys
                                type="button"
                                className={`${styles.option} ${
                                    isOptionSelected(option) ? styles.selected : ''
                                } ${option.disabled ? styles.optionDisabled : ''}`}
                                onClick={() => handleOptionSelect(option)}
                                disabled={option.disabled}
                                role="option"
                                aria-selected={isOptionSelected(option)}>
                                {option.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {error && (
                <span id={`${name}-error`} className={styles.errorMessage}>
                    {error}
                </span>
            )}
        </div>
    )
}