import { createSlice } from '@reduxjs/toolkit';

const initialUtilityState = {
    tags: []
}

const utilitySlice = createSlice({ 
    name: 'utility',
    initialState: initialUtilityState,
    reducers: {
        setTags(state, action) {
            state.tags = action.payload;
        }
    }
});

export const utilityActions = utilitySlice.actions;
export default utilitySlice.reducer;