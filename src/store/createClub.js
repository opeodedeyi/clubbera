import { createSlice } from '@reduxjs/toolkit';

const initialCreateClubState = {
    clubName: '',
    clubDescription: '',
    selectedTags: [],
    permissionRequired: null,
    inputValue: '',
    placeId: '',
    formattedAddress: '',
    coordinates: [],
    rawPhoto: null,
    bannerURL: null
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
        setBannerURL(state, action) {
            state.bannerURL = action.payload;
        },
    }
});

export const createClubActions = createClubSlice.actions;
export default createClubSlice.reducer;