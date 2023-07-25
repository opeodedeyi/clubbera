import { configureStore } from '@reduxjs/toolkit';
import createClubReducer from './createClub';
import authReducer from './auth';
import utilityReducer from './utility';
import searchReducer from './search';

const store = configureStore({
    reducer: { 
        createClub: createClubReducer,
        auth: authReducer,
        utility: utilityReducer,
        search: searchReducer
    }
})

export default store