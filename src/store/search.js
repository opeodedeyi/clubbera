import { createSlice } from '@reduxjs/toolkit';

const initialSearchState = {
    query: '',
    searchResult: null,
}

const searchSlice = createSlice({ 
    name: 'search',
    initialState: initialSearchState,
    reducers: {
        setQuery(state, action) {
            state.query = action.payload;
        },
        setSearchResult: (state, action) => {
            state.searchResult = action.payload;
        },
        resetState(state) {
            state.searchResult = null;
        },
    }
});

export const searchActions = searchSlice.actions;
export default searchSlice.reducer;