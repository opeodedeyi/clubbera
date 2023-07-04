import React, { useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Header from "../components/header/Header";
import CustomButton from "../components/CustomButton/CustomButton";
import ETUCards from "../components/Cards/ETUCards";
import connect from '../assets/images/connect.png';
import customize from '../assets/images/customize.png';
import explore from '../assets/images/explore.png';
import HangingOut from '../assets/images/hangingout.png';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Home | Clubera";
    }, []);

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
            content: 'Find your tribe in our buzzing clubs. Share, laugh, and bond over shared interests'
        },
        {
            image: customize,
            title: 'Be the Maestro',
            content: "Launch your club on Clubbera, shape its vibe, rally your crew. Witness the magic as your community grows"
        }
    ];

    return (
        <>
            <Header />

            <div className="home-intro">
                <div className="home-intro-text">
                    <h2 className="home-intro-header">Discover <br />  Connect & Thrive <br /> <span className="home-intro-header-special">Clubbera</span></h2>
                    <p className="home-intro-subtitle">We connect individuals with local communities and clubs</p>
                    <CustomButton screentype="none" onClick={signupButtonClick}>Join Clubbera</CustomButton>
                </div>

                <div className="homepage-background-image">
                    <img src={HangingOut} alt="homepage"/>
                </div>
            </div>

            <div className="home-easyuse">
                <h2 className="home-easyuse-title">Join the <span className="home-intro-header-special">Fun</span>!</h2>
                <p className="home-easyuse-subtext">Connect with fellow fanatics in a myriad of clubs. Free and super easy to use.</p>
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
