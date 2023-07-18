import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import cancel from '../../assets/svg/cancel.svg';

import "./MobileNav.css";

const MobileNav = (props) => {
    const { isOpen, onCancel, logoutClick } = props;
    const user = useSelector(state => state.auth.user);

    return (
        <div className={`mobile-nav ${isOpen ? "open" : ""}`}>
            <div className="mobile-nav-header">
                <button className="mobile-nav-toggle" onClick={onCancel}>
                    <img src={cancel} alt="cancel" className="mobile-nav-cancel-icon"/>
                </button>

                <p className="mobile-nav-header-text">Hi there,</p>
            </div>

            {user ? 
                    <NavLink to={`/pr/${user.uniqueURL}`} className="mobile-nav-profile-container">
                        {user?.profilePhoto?.location ? (
                            <img src={user.profilePhoto.location} alt="profile"/>
                        ) :
                            <img src="https://via.placeholder.com/50" alt="profile"/>
                        }

                        <p className="mobile-nav-profile-name">{user.fullname}</p>
                    </NavLink>
            :
                null
            }
            
            <nav className="mobile-nav-menu">

                <ul className="mobile-nav-menu-list">
                    {user ? 
                        <>
                            <li>
                                <NavLink to="/createclub" onClick={onCancel}>Create a { import.meta.env.VITE_APP_THEME }</NavLink>
                            </li>
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
                     <li>
                        <NavLink to="/hellp" onClick={onCancel}>Help</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" onClick={onCancel}>About</NavLink>
                    </li>
                    {user ? 
                        <>
                            <li>
                                <p onClick={logoutClick}>Log Out</p>
                            </li>
                        </>
                    :
                        null
                    }
                </ul>
            </nav>
        </div>
    );
};

export default MobileNav;
