import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { authActions } from "../../store/auth";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from 'react-toastify';

import Header from "../../components/header/Header";
import FormInput from "../../components/FormInput/FormInput";
import PasswordInput from "../../components/FormInput/PasswordInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import SocialLogin from "../../components/CustomButton/SocialLogin";

import googleBtn from '../../assets/svg/google.svg';

import './Login.css';

const Signup = () => {
    const API_URL = import.meta.env.VITE_APP_WEBSITE_API;
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        document.title = "Sign up | Clubbera";

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

    const handleSignup = async (e) => {
        e.preventDefault();
        
        axios.post(`${API_URL}/signup`, {
            fullname,
            email,
            password,
        }).then(res => {
            Cookies.set('authToken', res.data.token, { expires: 60 });
            localStorage.setItem('user', JSON.stringify(res.data.newUser)); // store user data in local storage
            dispatch(authActions.setUser(res.data.newUser));
            console.log(res.data.newUser);
            navigate('/');
            toast('🦄 Log in successful!')
        }).catch(err => {
            console.error(err);
            // dispatch(authActions.setUser(res.data.user));
            console.error(err);
            // dispatch(authActions.setUser(res.data.user));
            if (err.response) {
                if (err.response.status === 401) {
                    toast("💔 user with mail already exist");
                } else {
                    // Other errors
                    toast("💔 something went wrong");
                }
            } else {
                // Something happened in setting up the request that triggered an err
                toast("💔 error in setting up the request");
            }
        });
        console.log(fullname, email, password);
    };
    
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
                toast('🦄 Log in successful!')
            }).catch(err => {
                console.error(err.response.data); // This will log the response from the server
                toast("💔 Something went wrong");
                dispatch(authActions.setUser(null));
            });
        },
        flow: 'auth-code',
    });

    const isDisabled = !fullname || !email || !password || !isEmailValid(email) || !isPasswordValid(password);
    
    return (
        <>
            <Header />

            <div className="login-container">
                <div className="login-container-content">
                    <form action="" className="login-container-main">
                        <p className="login-container-main-title">Sign up</p>
                        <p className="login-container-main-subtitle login-link-in-signup">Already a member? <NavLink to="/login">Log in</NavLink></p>

                        <SocialLogin imgSrc={googleBtn} style="google-style" onClick={googleLogin}>
                            Continue with Google
                        </SocialLogin>

                        <div className="mb-one"></div>

                        <p className="login-or-subtitle">OR</p>
                        
                        <FormInput
                            type="text"
                            placeholder="John Doe" 
                            input="Your name"
                            value={fullname}
                            onChange={(e) => setFullName(e.target.value)}/>

                        <div className="mb-one"></div>

                        <FormInput
                            type="email"
                            placeholder="example@email.com" 
                            input="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}/>

                        <div className="mb-one"></div>

                        <PasswordInput
                            input="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}/>

                        <div className="mb-one"></div>

                        <CustomButton size="form" onClick={handleSignup} disabled={isDisabled}>Sign up</CustomButton>

                        <div className="mb-one"></div>

                        <p className="login-container-main-subtitle login-link-in-signup">By signing up, you agree to <NavLink to="/terms-of-service">Terms of Service</NavLink>, <NavLink to="/privacy-policy">Privacy Policy</NavLink>, and <NavLink to="/cookie-policy">Cookie Policy</NavLink>, and that you are over 18 years</p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup
