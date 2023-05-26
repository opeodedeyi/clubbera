import React, { useState, useEffect } from "react";
import AuthHeader from "../../components/header/AuthHeader";
import FormInput from "../../components/FormInput/FormInput";
import PasswordInput from "../../components/FormInput/PasswordInput";
import './Login.css';

const Login = () => {
    useEffect(() => {
        document.title = "Log in | Clubbera";
    }, []);

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

    const isDisabled = !email || !password || !isEmailValid(email) || !isPasswordValid(password);

    return (
        <>
            <AuthHeader />

            <div className="login-container">
                <div className="login-container-content">
                    <form action=""  className="login-container-main">
                        <p className="login-container-main-title">Welcome Back</p>
                        <p className="login-container-main-subtitle">Ready for another adventure? Log in and let's find your next event</p>

                        <FormInput
                            type="email"
                            placeholder="Email" 
                            input="Your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}/>

                        <PasswordInput
                            placeholder="Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
