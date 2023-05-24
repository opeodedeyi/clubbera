import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import cancel from '../../assets/svg/cancel.svg';
import "./MobileNav.css";

const MobileNav = (props) => {
    const { isOpen, onCancel } = props;

    return (
        <div className={`mobile-nav ${isOpen ? "open" : ""}`}>
            <button className="mobile-nav-toggle" onClick={onCancel}>
                <img src={cancel} alt="cancel" className="mobile-nav-cancel-icon"/>
            </button>
            <nav className="mobile-nav-menu">
                <ul className="mobile-nav-menu-list">
                    <li>
                        <NavLink to="/signup" onClick={onCancel}>Create Account</NavLink>
                    </li>
                    <li>
                        <NavLink to="/signin" onClick={onCancel}>Log In</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default MobileNav;
