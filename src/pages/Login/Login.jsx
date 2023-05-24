import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import './Login.css';

const Login = () => {
    useEffect(() => {
        document.title = "Log in | Clubbera";
    }, []);

    return (
        <>
            <Header />
        </>
    )
}

export default Login
