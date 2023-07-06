import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import Header from "../../components/header/Header";
import FormInput from "../../components/FormInput/FormInput";
import PasswordInput from "../../components/FormInput/PasswordInput";
import CustomButton from "../../components/CustomButton/CustomButton";

import './Login.css';

const Signup = () => {
    useEffect(() => {
        document.title = "Sign up | Clubbera";
    }, []);

    const [fullname, setFullName] = useState('');
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

    const handleSubmit = async (e) => {
        e.preventDefault();
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
                        <p className="login-container-main-subtitle login-link-in-signup">Already a member? <NavLink to="/signin">Log in</NavLink></p>
                        
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

                        <CustomButton size="form" onClick={handleSubmit} disabled={isDisabled}>Sign up</CustomButton>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup
