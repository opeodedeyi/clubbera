import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import FormInput from "../../components/FormInput/FormInput";
import './Signup.css';

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

            <div className="signup-container">
                <div className="signup-container-content">
                    <form action=""  className="signup-container-main">
                        <p className="signup-container-main-title">Create an Account</p>
                        <p className="signup-container-main-subtitle">Events are happening every day — sign up to join the fun</p>
                        
                        <FormInput
                            type="text"
                            placeholder="Full name" 
                            input="Your name"
                            value={fullname}
                            onChange={(e) => setFullName(e.target.value)}/>

                        <FormInput
                            type="email"
                            placeholder="Email" 
                            input="Your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}/>

                        
                    </form>
                </div>
            </div>

            <div className="signup-toolkit">

            </div>
        </>
    )
}

export default Signup
