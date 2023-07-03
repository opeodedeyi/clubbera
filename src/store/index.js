import { configureStore } from '@reduxjs/toolkit';
import createClubReducer from './createClub';

const store = configureStore({
    reducer: { createClub: createClubReducer }
})

export default store