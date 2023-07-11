import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from "../../store/auth";
import { useGoogleLogin } from "@react-oauth/google";

import Header from "../../components/header/Header";
import FormInput from "../../components/FormInput/FormInput";
import PasswordInput from "../../components/FormInput/PasswordInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import SocialLogin from "../../components/CustomButton/SocialLogin";

import googleBtn from '../../assets/svg/google.svg';

import './Login.css';

const Login = () => {
    const API_URL = import.meta.env.VITE_APP_WEBSITE_API;
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        document.title = "Log in | Clubbera";

        if (user) {
            navigate('/');  // navigate to homepage if user exists
        }
    }, [user, navigate]);

    const isEmailValid = (email) => {
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        return emailRegex.test(email);
    };

    const isPasswordValid = (password) => {
        // At least one, At least one lowercase, At least one uppercase, At least one special, A total of at least 8 characters
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
        return passwordRegex.test(password);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        
        axios.post(`${API_URL}/login`, {
            email: email,
            password: password,
        }).then(res => {
            Cookies.set('authToken', res.data.token, { expires: 60 });
            localStorage.setItem('user', JSON.stringify(res.data.user)); // store user data in local storage
            dispatch(authActions.setUser(res.data.user));
            console.log(res.data.user);
            navigate('/');
        }).catch(err => {
            console.error(err);
            dispatch(authActions.setUser(res.data.user));
        });
    }
    
    const googleLogin = useGoogleLogin({
        onSuccess: codeResponse => {
            console.log(codeResponse.code);

            axios.post(`${API_URL}/google-auth`, {
                code: codeResponse.code,
            }).then(res => {
                Cookies.set('authToken', res.data.token, { expires: 60 });
                localStorage.setItem('user', JSON.stringify(res.data.user)); // store user data in local storage
                dispatch(authActions.setUser(res.data.user));
                console.log(res.data.user);
                navigate('/');
            }).catch(err => {
                console.error(err.response.data); // This will log the response from the server
                console.error(err.message);
                dispatch(authActions.setUser(null));
            });
        },
        flow: 'auth-code',
    });

    const isDisabled = !email || !password || !isEmailValid(email) || !isPasswordValid(password);

    return (
        <>
            <Header />

            <div className="login-container">
                <div className="login-container-content">
                    <form action="" className="login-container-main">
                        <p className="login-container-main-title">Welcome Back</p>
                        <p className="login-container-main-subtitle">Ready for another adventure? Log in and let's find your next one</p>

                        <FormInput
                            type="email"
                            placeholder="Email" 
                            input="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}/>

                        <div className="mb-one"></div>

                        <PasswordInput
                            input="Password"
                            hasForgotPassword={true}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}/>

                        <div className="mb-one"></div>

                        <CustomButton size="form" onClick={handleLogin} disabled={isDisabled}>Log in</CustomButton>

                        <div className="login-container-question">Not a member yet? <NavLink to="/signup">Sign up</NavLink></div>

                        <div className="mb-one"></div>

                        <SocialLogin imgSrc={googleBtn} style="google-style" onClick={googleLogin}>
                            Continue with Google
                        </SocialLogin>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
