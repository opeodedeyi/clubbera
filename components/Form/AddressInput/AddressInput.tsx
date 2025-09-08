// components/Form/AddressInput/AddressInput.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import Icon from '@/components/ui/Icon/Icon';
import styles from './AddressInput.module.css';

interface AddressInputProps {
    name: string;
    label: string;
    placeholder: string;
    value: string;
    onChange: (address: string, lat: number | unknown, lng: number | unknown, placeName?: string) => void;
    isRequired?: boolean;
    disabled?: boolean;
    error?: string;
}

const libraries: ("places")[] = ["places"];

const AddressInput: React.FC<AddressInputProps> = (props) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_PLACES_API_KEY!,
        libraries,
    });

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading...</div>;

    return <AddressInputInner {...props} />;
};

const AddressInputInner: React.FC<AddressInputProps> = ({
    name,
    label,
    placeholder,
    value,
    onChange,
    isRequired = false,
    disabled = false,
    error
}) => {
    const [inputValue, setInputValue] = useState(value || '');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLUListElement>(null);

    const {
        ready,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            types: ['establishment', 'geocode'], // Search for businesses, venues, and addresses
        },
        debounce: 300,
    });

    // Update input value when prop value changes
    useEffect(() => {
        if (value !== inputValue) {
            setInputValue(value || '');
        }
    }, [value]);

    // Close suggestions when clicking outside
    const ref = useOnclickOutside(() => {
        setShowSuggestions(false);
        clearSuggestions();
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        setValue(newValue);
        setShowSuggestions(true);
    };

    const handleSuggestionSelect = async (suggestion: google.maps.places.AutocompletePrediction) => {
        const address = suggestion.description;
        
        try {
            setInputValue(address);
            setValue(address, false);
            setShowSuggestions(false);
            clearSuggestions();

            // Get coordinates and detailed place information
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            
            // Extract place name (business name or main component)
            const placeName = suggestion.structured_formatting?.main_text || 
                            suggestion.terms?.[0]?.value || 
                            address;
            
            onChange(address, lat, lng, placeName);
        } catch (error) {
            console.error('Error getting coordinates:', error);
            onChange(address, undefined, undefined, address);
        }
    };

    const handleInputFocus = () => {
        if (data.length > 0) {
            setShowSuggestions(true);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
            setShowSuggestions(false);
            clearSuggestions();
            inputRef.current?.blur();
        }
    };

    const hasSuggestions = ready && status === "OK" && data.length > 0;

    return (
        <div className={styles.inputContainer} ref={ref}>
            <label 
                className={styles.formLabel} 
                htmlFor={name}>
                {label}
            </label>

            <div className={styles.inputWrapper}>
                <div className={styles.inputWithIcon}>
                    <Icon name="locationMark" size="sm" className={styles.locationIcon} />
                    <input
                        ref={inputRef}
                        id={name}
                        name={name}
                        type="text"
                        className={`${styles.formInput} ${error ? styles.error : ''}`}
                        placeholder={placeholder}
                        value={inputValue}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        onKeyDown={handleKeyDown}
                        disabled={disabled || !ready}
                        required={isRequired}
                        autoComplete="off"
                    />
                </div>

                {showSuggestions && hasSuggestions && (
                    <ul 
                        ref={suggestionsRef}
                        className={styles.suggestions}
                        role="listbox" >
                        {data.map((suggestion) => (
                            <li
                                key={suggestion.place_id}
                                className={styles.suggestionItem}
                                onClick={() => handleSuggestionSelect(suggestion)}
                                role="option" >
                                <Icon name="locationMark" size="xs" className={styles.suggestionIcon} />
                                <span className={styles.suggestionText}>
                                    {suggestion.description}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {error && <span className={styles.errorText}>{error}</span>}
        </div>
    );
};

export default AddressInput;