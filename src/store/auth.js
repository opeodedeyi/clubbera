import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_APP_WEBSITE_API;

const initialAuthState = {
    user: null,
}

// Action to log out the user
export const logout = () => {
    return async function (dispatch) {
        // get the current auth token
        const token = Cookies.get('authToken');
    
        if (token) {
            // invalidate the token on the server
            axios.post(`${API_URL}/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }).then(() => {
                // if successful, remove the token from the cookie
                Cookies.remove('authToken');
                localStorage.removeItem('user');
                // Remove the user from the Redux store
                dispatch(authActions.removeUser());
                toast.success('🦄 successfully logged out!')
            }).catch(err => {
                console.error(err);
            });
        }
    };
}

const authSlice = createSlice({ 
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload; // new reducer for setting the user
        },
        removeUser: (state) => {
            state.user = null; // clears the user
        },
    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;