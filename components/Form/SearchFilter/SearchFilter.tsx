'use client'

import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/Icon/Icon';
import styles from './SearchFilter.module.css';

export interface SearchFilterOption {
    value: string | null
    label: string
}

interface SearchFilterProps {
    options: SearchFilterOption[]
    value?: string | null
    placeholder?: string
    onChange: (value: string | null) => void
    className?: string
}

export default function SearchFilter({
    options,
    value,
    placeholder = "Filter",
    onChange,
    className = ''
}: SearchFilterProps) {
    const [isOpen, setIsOpen] = useState(false)

    const findOptionByValue = (searchValue: string | null | undefined): SearchFilterOption | null => {
        return options.find(option => {
            if (searchValue === null && option.value === null) return true
            if (searchValue === undefined && option.value === null) return true
            return option.value === searchValue
        }) || null
    }

    const [selectedOption, setSelectedOption] = useState<SearchFilterOption | null>(
        findOptionByValue(value)
    )

    const selectRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    useEffect(() => {
        const newSelectedOption = findOptionByValue(value)
        setSelectedOption(newSelectedOption)
    }, [value, options])

    const handleToggle = () => {
        setIsOpen(!isOpen)
    }

    const handleOptionSelect = (option: SearchFilterOption) => {
        setSelectedOption(option)
        setIsOpen(false)
        onChange(option.value)
    }

    const isOptionSelected = (option: SearchFilterOption): boolean => {
        if (selectedOption === null) return false
        if (option.value === null && selectedOption.value === null) return true
        return option.value === selectedOption.value
    }

    const selectClasses = [
        styles.select,
        isOpen && styles.open,
        className
    ].filter(Boolean).join(' ')

    const triggerClasses = [
        styles.trigger,
        isOpen && styles.open,
        !selectedOption && styles.placeholder
    ].filter(Boolean).join(' ')

    return (
        <div ref={selectRef} className={selectClasses}>
            <div
                className={triggerClasses}
                onClick={handleToggle}
                aria-haspopup="listbox"
                aria-expanded={isOpen}>

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
                <div className={styles.dropdown} role="listbox">
                    {options.map((option, index) => (
                        <button
                            key={option.value ?? `null-option-${index}`}
                            type="button"
                            className={`${styles.option} ${
                                isOptionSelected(option) ? styles.selected : ''
                            }`}
                            onClick={() => handleOptionSelect(option)}
                            role="option"
                            aria-selected={isOptionSelected(option)}>
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
