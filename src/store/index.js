import { configureStore } from '@reduxjs/toolkit';
import createClubReducer from './createClub';
import authReducer from './auth';
import utilityReducer from './utility';

const store = configureStore({
    reducer: { 
        createClub: createClubReducer,
        auth: authReducer,
        utility: utilityReducer
    }
})

export default store