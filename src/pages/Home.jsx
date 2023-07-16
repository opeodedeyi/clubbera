import React, { useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";

import { useSelector } from "react-redux";

import Header from "../components/header/Header";
import CustomButton from "../components/CustomButton/CustomButton";
import ETUCards from "../components/Cards/ETUCards";

import connect from '../assets/images/connect.png';
import customize from '../assets/images/customize.png';
import explore from '../assets/images/explore.png';
import HangingOut from '../assets/images/hangingout.png';

import './Home.css';

const NotLoggedIn = () => {
    const navigate = useNavigate();

    const signupButtonClick = () => {
        navigate('/signup');
    };

    const ETUCardsContent = [
        {
            image: explore,
            title: 'Adventure Awaits',
            content: 'Discover vibrant clubs that tickle your fancy. Dive into your favorite activities with a click'
        },
        {
            image: connect,
            title: 'Connect & Create',
            content: 'Find your tribe in our buzzing Communities. Share, laugh, and bond over shared interests'
        },
        {
            image: customize,
            title: 'Be the Maestro',
            content: "Launch your Community on Clubbera, shape its vibe, rally your crew. Witness the magic as your community grows"
        }
    ];

    return (
        <>
            <div className="home-intro">
                <div className="home-intro-text">
                    <h2 className="home-intro-header">Discover <br />Your Tribe with<br /> <span className="home-intro-header-special">Clubbera</span></h2>
                    <p className="home-intro-subtitle">Where Interest Meets Community</p>
                    <CustomButton screentype="none" onClick={signupButtonClick}>Join Clubbera</CustomButton>
                </div>

                <div className="homepage-background-image">
                    <img src={HangingOut} alt="homepage"/>
                </div>
            </div>

            <div className="home-easyuse">
                <h2 className="home-easyuse-title">Join the Fun!</h2>
                <p className="home-easyuse-subtext">Connect with fellow fanatics in a myriad of Communities. Free and super easy to use.</p>
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
    );
}

const LoggedIn = () => {
    return (
        <>
            <div className="home-intro">
                <div className="home-intro-text">
                    <h2 className="home-intro-header">Discover <br />Your Tribe with<br /> <span className="home-intro-header-special">Clubbera</span></h2>
                    <p className="home-intro-subtitle">Where Interest Meets Community</p>
                </div>

                <div className="homepage-background-image">
                    <img src={HangingOut} alt="homepage"/>
                </div>
            </div>
        </>
    );
}

const Home = () => {
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        document.title = "Home | Clubera";
    }, []);

    return (
        <>
            <Header />

            {user ?
                <LoggedIn />
            :
                <NotLoggedIn />
            }
        </>
    )
}

export default Home
