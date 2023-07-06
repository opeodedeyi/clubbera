import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { authActions } from "../../store/auth";

import Header from "../../components/header/Header";
import FormInput from "../../components/FormInput/FormInput";
import PasswordInput from "../../components/FormInput/PasswordInput";
import CustomButton from "../../components/CustomButton/CustomButton";

import './Login.css';

const Login = () => {
    useEffect(() => {
        document.title = "Log in | Clubbera";
    }, []);

    const API_URL = import.meta.env.VITE_APP_WEBSITE_API;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
            navigate('/');
        }).catch(err => {
            console.error(err);
            dispatch(authActions.setUser(res.data.user));
        });
    }

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
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
