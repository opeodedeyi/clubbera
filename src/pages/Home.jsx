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
                    <h2 className="home-intro-header">Connect <br /> Engage & Thrive <br /> With <span className="home-intro-header-special">Clubbera</span></h2>
                    <p className="home-intro-subtitle">Welcome to Clubbera - Where Connections Come Alive! Clubbera is a modern online platform that brings people together for engaging social experiences.</p>
                    <CustomButton screentype="none" onClick={signupButtonClick}>Join Clubbera</CustomButton>
                </div>

                {/* image might be here */}
            </div>

            {/* <div className="home-">we need a CTA to create a group</div> */}

            <div className="home-easyuse">
                <h2 className="home-easyuse-title">Easy to <span className="home-intro-header-special">Use</span></h2>
                <p className="home-easyuse-subtext">Form new connections with individuals who have common interests through a wide range of physical clubs. Joining our platform is easy to use and absolutely free.</p>
            </div>

        </>
    )
}

export default Home
