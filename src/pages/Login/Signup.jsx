import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { authActions } from "../../store/auth";

import Header from "../../components/header/Header";
import FormInput from "../../components/FormInput/FormInput";
import PasswordInput from "../../components/FormInput/PasswordInput";
import CustomButton from "../../components/CustomButton/CustomButton";

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
        }).catch(err => {
            console.error(err);
            dispatch(authActions.setUser(res.data.user));
        });
        console.log(fullname, email, password);
    };

    const isDisabled = !fullname || !email || !password || !isEmailValid(email) || !isPasswordValid(password);
    
    return (
        <>
            <Header />

            <div className="login-container">
                <div className="login-container-content">
                    <form action="" className="login-container-main">
                        <p className="login-container-main-title">Sign up</p>
                        <p className="login-container-main-subtitle login-link-in-signup">Already a member? <NavLink to="/login">Log in</NavLink></p>
                        
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

                        <p className="login-container-main-subtitle login-link-in-signup">By signing up, you agree to <NavLink to="/terms-of-service">Terms of Service</NavLink>, <NavLink to="/privacy-policy">Privacy Policy</NavLink>, and <NavLink to="/cookie-policy">Cookie Policy</NavLink>.</p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup
