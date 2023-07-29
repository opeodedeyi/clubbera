import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = import.meta.env.VITE_APP_WEBSITE_API;

const initialCreateClubState = {
    clubName: '',
    clubDescription: '',
    selectedTags: [],
    permissionRequired: null,
    inputValue: '',
    placeId: '',
    formattedAddress: '',
    coordinates: { lat: null, lng: null },
    rawPhoto: null,
    bannerFileName: null,
    loading: false
}

// Action to create community
export const createCommunity = () => {
    return async function (dispatch, getState) {
        // get the current auth token
        const token = Cookies.get('authToken');
        const { clubName, clubDescription, rawPhoto, bannerFileName, selectedTags, placeId, formattedAddress, coordinates, permissionRequired } = getState().createClub;

        if (token) {
            try {
                const response = await axios.post(`${API_URL}/group`, {
                    name: clubName,
                    description: clubDescription,
                    location: { 
                        place_id: placeId, 
                        formatted_address: formattedAddress, 
                        geo: { 
                            type: 'Point', 
                            coordinates: {
                                lat: coordinates.lat,
                                lng: coordinates.lng
                            } 
                        } 
                    },
                    category: selectedTags,
                    permissionRequired,
                    base64data: rawPhoto,
                    fileName: bannerFileName,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                console.log(rawPhoto, bannerFileName);
                dispatch(createClubActions.resetState());
                
                console.log(response);
                return response;
            } catch (err) {
                dispatch(createClubActions.setLoadingFalse());
                console.error(err);
                throw err; // This will allow error to be caught in the handleSubmit function
            }
        }
    };
}

const createClubSlice = createSlice({ 
    name: 'createClub',
    initialState: initialCreateClubState,
    reducers: {
        setClubName(state, action) {
            state.clubName = action.payload;
        },
        setClubDescription(state, action) {
            state.clubDescription = action.payload;
        },
        toggleTagSelection: (state, action) => {
            const tag = action.payload;
            if(state.selectedTags.includes(tag)) {
                state.selectedTags = state.selectedTags.filter(t => t !== tag);
            } else {
                state.selectedTags.push(tag);
            }
        },
        setPermissionTrue(state) {
            state.permissionRequired = true;
        },
        setPermissionFalse(state) {
            state.permissionRequired = false;
        },
        setInputValue(state, action) {
            state.inputValue = action.payload;
        },
        setPlaceId(state, action) {
            state.placeId = action.payload;
        },
        setFormattedAddress(state, action) {
            state.formattedAddress = action.payload;
        },
        setCoordinates(state, action) {
            state.coordinates = action.payload;
        },
        setRawPhoto(state, action) {
            state.rawPhoto = action.payload;
        },
        setBannerFileName(state, action) {
            state.bannerFileName = action.payload;
        },
        setLoadingTrue(state) {
            state.loading = true;
        },
        setLoadingFalse(state) {
            state.loading = false;
        },
        resetState(state) {
            state.clubName = '';
            state.clubDescription = '';
            state.selectedTags = [];
            state.permissionRequired = null;
            state.inputValue = '';
            state.placeId = '';
            state.formattedAddress = '';
            state.coordinates = { lat: null, lng: null };
            state.rawPhoto = null;
            state.bannerFileName = null;
            state.loading = false
        },
    }
});

export const createClubActions = createClubSlice.actions;
export default createClubSlice.reducer;