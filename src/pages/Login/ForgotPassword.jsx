import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';

import Header from "../../components/header/Header";
import FormInput from "../../components/FormInput/FormInput";
import CustomButton from "../../components/CustomButton/CustomButton";

import './Login.css';

const Signup = () => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email);
    };

    const isDisabled = !email || !isEmailValid(email);
    
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

                        <CustomButton size="form" onClick={handleSubmit} disabled={isDisabled}>Next</CustomButton>

                        <div className="login-container-question">Go back to <NavLink to="/login">Log in</NavLink></div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup
