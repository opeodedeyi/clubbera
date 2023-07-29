import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import noProfileImg from '../../assets/images/noProfileImg.png';
import cancel from '../../assets/svg/cancel.svg';

import Overlay from '../Util/Overlay';
import "./MobileNav.css";

const MobileNav = (props) => {
    const { isOpen, onCancel, logoutClick } = props;
    const user = useSelector(state => state.auth.user);
    let profileImgSrc = noProfileImg;
    if (user) {
        profileImgSrc = user.profilePhoto?.location ? user.profilePhoto.location : noProfileImg;
    }

    return (
        <>
            <Overlay isOpen={isOpen} onClick={onCancel}/>

            <div className={`mobile-nav ${isOpen ? "open" : ""}`}>
                <div className="mobile-nav-header">
                    <button className="mobile-nav-toggle" onClick={onCancel}>
                        <img src={cancel} alt="cancel" className="mobile-nav-cancel-icon"/>
                    </button>

                    <p className="mobile-nav-header-text">Hi there,</p>
                </div>

                {user ? 
                        <NavLink to={`/pr/${user.uniqueURL}`} className="mobile-nav-profile-container">
                            <img src={profileImgSrc} alt="profile"/>

                            <div className="mobile-nav-profile-text">
                                <p className="mobile-nav-profile-name">{user.fullname}</p>
                                <p className="mobile-nav-profile-link">Manage your profile</p>
                            </div>
                            
                        </NavLink>
                :
                    null
                }
                
                <nav className="mobile-nav-menu">

                    <ul className="mobile-nav-menu-list">
                        <li>
                            <NavLink to="/createclub" onClick={onCancel}>Create a { import.meta.env.VITE_APP_THEME }</NavLink>
                        </li>
                        {user ? 
                            <>
                                <li>
                                    <NavLink to="/managecommunity" onClick={onCancel}>Manage your { import.meta.env.VITE_APP_THEME }</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/seecommunity" onClick={onCancel}>See created Communities</NavLink>
                                </li>
                            </>
                        :
                            <>
                                <li>
                                    <NavLink to="/signup" onClick={onCancel}>Sign up</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/login" onClick={onCancel}>Log In</NavLink>
                                </li>
                            </>
                        }
                        <div className="nav-hor-line"></div>
                        <li>
                            <NavLink to="/hellp" onClick={onCancel}>Help</NavLink>
                        </li>
                        <li>
                            <NavLink to="/about" onClick={onCancel}>About</NavLink>
                        </li>
                        {user ? 
                            <>
                                <div className="nav-hor-line"></div>
                                <li className="nav-cur-poin">
                                    <p onClick={logoutClick}>Log Out</p>
                                </li>
                            </>
                        :
                            null
                        }
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default MobileNav;
