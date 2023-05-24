import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import './Signup.css';

const Signup = () => {
    useEffect(() => {
        document.title = "Sign up | Clubbera";
    }, []);

    return (
        <>
            <Header />
        </>
    )
}

export default Signup
