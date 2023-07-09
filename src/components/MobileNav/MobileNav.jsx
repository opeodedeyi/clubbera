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
            <button className="mobile-nav-toggle" onClick={onCancel}>
                <img src={cancel} alt="cancel" className="mobile-nav-cancel-icon"/>
            </button>
            <nav className="mobile-nav-menu">
                <ul className="mobile-nav-menu-list">
                    {user ? 
                        <>
                            <li>
                                <NavLink to="/createclub" onClick={onCancel}>Create { import.meta.env.VITE_APP_THEME }</NavLink>
                            </li>
                            <li>
                                <p onClick={logoutClick}>Log Out</p>
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
                </ul>
            </nav>
        </div>
    );
};

export default MobileNav;
