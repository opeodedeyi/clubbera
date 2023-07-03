import React, { useState, useEffect } from "react";
import axios from "axios";
import searchIcon from '../../assets/svg/search.svg';
import "./FormInput.css";

const MapInput = ( props ) => {
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [inputValue, setInputValue] = useState(props.locationObject?.formattedAddress || '');
    const [suggestions, setSuggestions] = useState([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);

    const handleKeyDown = (event) => {
        switch(event.key) {
            case "ArrowDown":
                setActiveSuggestionIndex((prevIndex) => Math.min(prevIndex + 1, suggestions.length - 1));
                break;
            case "ArrowUp":
                setActiveSuggestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
                break;
            case "Enter":
                handleSuggestionClick(suggestions[activeSuggestionIndex]);
                break;
            default:
                break;
        }
    };    

    const handleInputChange = async (event) => {
        setInputValue(event.target.value);

        try {
            const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    address: inputValue,
                    key: import.meta.env.VITE_APP_GEOCODE_API_KEY,
                },
            });
            setSuggestions(response.data.results);
            console.log(response.data.results);
        } catch (error) {
            console.error('Failed to fetch address data: ', error);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        const { formatted_address, place_id, geometry, plus_code } = suggestion;

        const location = {
            formattedAddress: formatted_address,
            placeId: place_id,
            coordinates: geometry.location
        };

        props.onSelect(location);
        setInputValue(formatted_address);
    };

    return (
        <div className="map-suggestion-container">
            <div className="map-input-normal">
                <img src={searchIcon} alt="search icon" className="map-input-normal-search-icon" />
                <input
                    type={props.type}
                    placeholder={props.placeholder}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setTimeout(() => setIsInputFocused(false), 200)}
                />
            </div>
            {isInputFocused && (
                <ul className="map-suggestions">
                    {suggestions.map((suggestion, index) => (
                        <li className={`map-suggestion ${index === activeSuggestionIndex ? "map-suggestions-active" : ""}`} key={suggestion.place_id} onClick={() => handleSuggestionClick(suggestion)}>
                            {suggestion.formatted_address}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default MapInput
