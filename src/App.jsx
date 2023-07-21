import { useLocation, BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { GoogleOAuthProvider } from '@react-oauth/google';
import NProgress from 'nprogress';
import { ToastContainer } from 'react-toastify';

import Home from './pages/Home';
import Signup from './pages/Login/Signup';
import Login from './pages/Login/Login';
import ForgotPassword from './pages/Login/ForgotPassword';
import CreateClub from './pages/CreateClub/CreateClub';
import CommunityPage from './pages/Community/CommunityPage';
import Pr from './pages/Profile/Pr';
import UserProfile from './pages/Profile/UserProfile';
import CookiePolicy from './pages/Legal/CookiePolicy';
import PrivacyPolicy from './pages/Legal/PrivacyPolicy';
import TermsOfService from './pages/Legal/TermsOfService';

import { useDispatch } from 'react-redux';
import { authActions } from './store/auth';

import 'react-toastify/dist/ReactToastify.css';
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
                <Route path="/community/:id" element={<CommunityPage />} />
                <Route path="/pr" element={<Pr />} />
                <Route path="/pr/:uniqueURL" element={<UserProfile />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
            </Route>
        </Routes>
    );
}

function App() {
    const dispatch = useDispatch();
    const API_URL = import.meta.env.VITE_APP_WEBSITE_API;

    useEffect(() => {
        // Fetch auth token from cookies
        const token = Cookies.get('authToken');
        const user = JSON.parse(localStorage.getItem('user'));

        if (token && user) {
            dispatch(authActions.setUser(user));
        } else if (token) {
            axios.get(`${API_URL}/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }).then(res => {
                dispatch(authActions.setUser(res.data));
            }).catch(err => {
                console.error(err);
                dispatch(authActions.removeUser());
                Cookies.remove('authToken');
                localStorage.removeItem('user');
            });
        }
    }, [dispatch]);

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark" />
            <GoogleOAuthProvider clientId={ import.meta.env.VITE_APP_GOOGLE_CLIENT_ID }>
                <BrowserRouter>
                    <RouterComponent />
                </BrowserRouter>
            </GoogleOAuthProvider>
        </>
    )
}

export default App;
