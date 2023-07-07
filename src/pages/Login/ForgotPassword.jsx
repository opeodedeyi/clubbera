import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from 'axios';

import Header from "../../components/header/Header";
import FormInput from "../../components/FormInput/FormInput";
import CustomButton from "../../components/CustomButton/CustomButton";

import './Login.css';

const ForgotPassword = () => {
    const API_URL = import.meta.env.VITE_APP_WEBSITE_API;
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    useEffect(() => {
        document.title = "Forgot Password | Clubbera";

        if (user) {
            navigate('/');  // navigate to homepage if user exists
        }
    }, [user, navigate]);


    const isEmailValid = (email) => {
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        return emailRegex.test(email);
    };
    
    const isDisabled = !email || !isEmailValid(email);

    const resetPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/password-reset`, { 
                email 
            });
            navigate('/login');
            console.log(response.data); // this is the success message from server
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Error data:', error.response.data);
                console.error('Error status:', error.response.status);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received:', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Request error:', error.message);
            }
        }
    };
    
    return (
        <>
            <Header />

            <div className="login-container">
                <div className="login-container-content">
                    <form action="" className="login-container-main">
                        <p className="login-container-main-title">Find your Clubbera account</p>
                        <p className="login-container-main-subtitle login-link-in-signup">Enter the email associated with your account to change your password.</p>

                        <FormInput
                            type="email"
                            placeholder="example@email.com" 
                            input="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}/>

                        <div className="mb-one"></div>

                        <CustomButton size="form" onClick={resetPassword} disabled={isDisabled}>Next</CustomButton>

                        <div className="login-container-question">Go back to <NavLink to="/login">Log in</NavLink></div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword
