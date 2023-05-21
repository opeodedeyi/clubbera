import React, { useEffect } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import Header from "../components/header/Header";
import CustomButton from "../components/CustomButton/CustomButton";
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Welcome";
    }, []);

    const signupButtonClick = () => {
        navigate('/signup');
    };

    return (
        <>
            <Header />

            {/* <div className="background-image"></div> */}

            <div className="home-intro">
                <div className="home-intro-text">
                    <h1 className="home-intro-header">Connect <br /> Engage & Thrive <br /> With <span className="home-intro-header-special">Clubbera</span></h1>
                    <p className="home-intro-subtitle">Welcome to Clubbera - Where Connections Come Alive! Clubbera is a modern online platform that brings people together for engaging social experiences.</p>
                    <CustomButton screentype="none" onClick={signupButtonClick}>Join Clubbera</CustomButton>
                </div>
                
            </div>

            <div className="home-"></div>

        </>
    )
}

export default Home
