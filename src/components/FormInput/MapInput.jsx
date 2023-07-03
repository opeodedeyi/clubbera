import React, { useState, useCallback } from "react";
import axios from "axios";
import _ from 'lodash';

import { useSelector, useDispatch } from "react-redux";
import { createClubActions } from "../../store/createClub";

import searchIcon from '../../assets/svg/search.svg';
import "./FormInput.css";

const MapInput = ( props ) => {
    const dispatch = useDispatch();
    const inputValue = useSelector((state) => state.createClub.inputValue);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

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

    const handleInputChange = (event) => {
        dispatch(createClubActions.setInputValue(event.target.value));
        setIsLoading(true);
        debouncedInput(event.target.value);
    };

    const debouncedInput = useCallback(_.debounce(async (inputValue) => {
        try {
            const requestUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
            const requestParams = {
                params: {
                    address: inputValue,
                    key: import.meta.env.VITE_APP_GEOCODE_API_KEY,
                },
            };
            const response = await axios.get(requestUrl, requestParams);
            setSuggestions(response.data.results);
            setIsLoading(false);
            console.log(response.data.results);
        } catch (error) {
            console.error('Failed to fetch address data: ', error);
            console.log('Error details:', error);
            setIsLoading(false);
        }
    }, 400), []);

    const handleSuggestionClick = (suggestion) => {
        const { formatted_address, place_id, geometry } = suggestion;

        
        dispatch(createClubActions.setPlaceId(place_id));
        dispatch(createClubActions.setFormattedAddress(formatted_address));
        dispatch(createClubActions.setCoordinates(geometry.location));

        dispatch(createClubActions.setInputValue(formatted_address));
    };

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                        params: {
                            latlng: `${latitude},${longitude}`,
                            key: import.meta.env.VITE_APP_GEOCODE_API_KEY,
                        },
                    });
                    const [result] = response.data.results;
                    if (result) {
                        console.log(result);
                        dispatch(createClubActions.setPlaceId(result.place_id));
                        dispatch(createClubActions.setFormattedAddress(result.formatted_address));
                        dispatch(createClubActions.setCoordinates(result.geometry.location));

                        dispatch(createClubActions.setInputValue(result.formatted_address));
                    } else {
                        console.error('Failed to get address data: ', response.data);
                    }
                } catch (error) {
                    console.error('Failed to fetch address data: ', error);
                }
            }, (error) => {
                console.error('Failed to get current location: ', error);
            });
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
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
                    {suggestions.length === 0 ? (
                        <li className="map-suggestion" onClick={getCurrentLocation}>
                            Use current location
                        </li>
                    ) : (
                        suggestions.map((suggestion, index) => (
                            <li className={`map-suggestion ${index === activeSuggestionIndex ? "map-suggestions-active" : ""}`} key={suggestion.place_id} onClick={() => handleSuggestionClick(suggestion)}>
                                {suggestion.formatted_address}
                            </li>
                        ))
                    )}
                    {isLoading && (
                        <li className="map-suggestion">
                            Loading<span className="dot dot1">.</span><span className="dot dot2">.</span><span className="dot dot3">.</span>
                        </li>
                    )}
                </ul>
            )}
        </div>
    );
}

export default MapInput
