import React, { useEffect } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import Header from "../components/header/Header";
import CustomButton from "../components/CustomButton/CustomButton";
import ETUCards from "../components/Cards/ETUCards";
import connect from '../assets/images/connect.png';
import customize from '../assets/images/customize.png';
import explore from '../assets/images/explore.png';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Welcome";
    }, []);

    const signupButtonClick = () => {
        navigate('/signup');
    };

    const ETUCardsContent = [
        {
            image: explore,
            title: 'Explore and Discover',
            content: 'Discover engaging social experiences on Soclo. Sign up to explore diverse non-profit clubs matching your interests, find activities and hobbies you love, and foster a vibrant community spirit.'
        },
        {
            image: connect,
            title: 'Connect and Engage',
            content: 'Connect with like-minded individuals by joining resonating clubs. Share experiences, ideas, and passions in a user-friendly space. Engage in meaningful conversations, collaborate, and build genuine connections based on shared interests.'
        },
        {
            image: customize,
            title: 'Customize and Grow',
            content: "Bring your vision to life as a club creator on Soclo. Customize your club's dynamics, add moderators, and shape the environment to match your vision. Foster ownership and enhance user satisfaction as your community grows and thrives."
        }
    ];

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
                <div className="home-easyuse-cards">
                    {ETUCardsContent.map((card, index) => (
                        <ETUCards
                            key={index}
                            image={card.image}
                            title={card.title}
                            content={card.content}
                        />
                    ))}
                </div>
            </div>

        </>
    )
}

export default Home
