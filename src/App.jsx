import { useLocation, BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { GoogleOAuthProvider } from '@react-oauth/google';
import NProgress from 'nprogress';

import Home from './pages/Home';
import Signup from './pages/Login/Signup';
import Login from './pages/Login/Login';
import ForgotPassword from './pages/Login/ForgotPassword';
import CreateClub from './pages/CreateClub/CreateClub';

import { useDispatch } from 'react-redux';
import { authActions } from './store/auth';

import 'nprogress/nprogress.css';
import './reset.css';
import './App.css';


NProgress.configure({ showSpinner: false });


function RouterComponent() {
    const location = useLocation();
    const [currentPath, setCurrentPath] = useState(location.pathname);

    useEffect(() => {
        if (currentPath !== location.pathname) {
            NProgress.start();
        }

        NProgress.done();

        setCurrentPath(location.pathname);
    }, [location, currentPath]);

    return (
        <Routes>
            <Route path="/">
                <Route path="" element={<Home />}/>
                <Route path="/createclub" element={<CreateClub />}/>
                <Route path="/signup" element={<Signup />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/forgot-password" element={<ForgotPassword />}/>
            </Route>
        </Routes>
    );
}

function App() {
    /* This website was built by Opeyemi Odedeyi, July 2023 */

    // Use Redux hooks to get dispatch function and the current user
    const dispatch = useDispatch();
    const API_URL = import.meta.env.VITE_APP_WEBSITE_API;

    // Use an effect to fetch the current user from the server when the app loads
    useEffect(() => {
        // Fetch auth token from cookies
        const token = Cookies.get('authToken');
        const user = JSON.parse(localStorage.getItem('user'));

        // If a token is found, make a request to the server for the current user
        if (token && user) {
            dispatch(authActions.setUser(user));
        } else if (token) {
            axios.get(`${API_URL}/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }).then(res => {
                // Upon receiving the user data, dispatch an action to set the current user
                dispatch(authActions.setUser(res.data));
            }).catch(err => {
                console.error(err);
            });
        }
        // Passing an empty dependency array so that the effect runs once on component mount
    }, [dispatch]);

    return (
        <>
            <GoogleOAuthProvider clientId={ import.meta.env.VITE_APP_GOOGLE_CLIENT_ID }>
                <BrowserRouter>
                    <RouterComponent />
                </BrowserRouter>
            </GoogleOAuthProvider>
        </>
    )
}

export default App;
