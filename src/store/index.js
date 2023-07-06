import { configureStore } from '@reduxjs/toolkit';
import createClubReducer from './createClub';
import authReducer from './auth'

const store = configureStore({
    reducer: { 
        createClub: createClubReducer,
        auth: authReducer
    }
})

export default store