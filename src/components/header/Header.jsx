import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import CustomButton from "../CustomButton/CustomButton";
import MobileNav from "../MobileNav/MobileNav";
import search from '../../assets/svg/search.svg';
import cancel from '../../assets/svg/cancel.svg';
import bars from '../../assets/svg/bars.svg';
import "./Header.css";
import "./SearchBar.css";


const Header = () => {
    const [navOpen, setNavOpen] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [hasScrolled, setHasScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 100;
            if (isScrolled !== hasScrolled) {
                setHasScrolled(isScrolled);
            }
        };

        document.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            // cleanup
            document.removeEventListener('scroll', handleScroll);
        };
    }, [hasScrolled]);

    const signinButtonClick = () => {
        navigate('/signin');
    };

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(searchTerm);
    };

    const toggleNav = () => {
        setNavOpen(!navOpen);
    };

    const changeHeader = () => {
        setSearchActive(!searchActive);
    };

    return (
        <>
            <header className={`header ${isHomePage && !hasScrolled ? '' : 'header-scrolled'}`}>
                {!searchActive ? (
                    <div className="header-content">
                        <div className="header-together">
                            <button className="nav-toggle" onClick={toggleNav}>
                                <img src={bars} alt="menu" className="bar-icon" />
                            </button>

                            <NavLink to="/" className="header-website-name">Clubbera</NavLink>
                        </div>

                        <form className="search-bar" onSubmit={handleSubmit}>
                            <img src={search} alt="search" className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={handleChange}
                            />
                        </form>

                        <div className="search-icon-button" onClick={changeHeader}>
                            <img src={search} alt="Open search" className="search-icon" />
                        </div>
                        
                        <CustomButton screentype="desk" onClick={signinButtonClick}>Sign In</CustomButton>
                    </div>
                ) : (
                    <div className="header-content">
                        <form className="search-bar-mobile" onSubmit={handleSubmit}>
                            <img src={search} alt="search" className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={handleChange}
                            />
                            <img src={cancel} alt="cancel" className="cancel-icon" onClick={changeHeader}/>
                        </form>
                    </div>
                )}
            </header>
            <MobileNav isOpen={navOpen} onCancel={toggleNav}></MobileNav>
        </>
    )
}

export default Header
