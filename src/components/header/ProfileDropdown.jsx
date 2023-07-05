import React, { useState } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";

import "./ProfileDropdown.css";

const ProfileDropdown = ( props ) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className="header-profile-dropdown">
            <div className={`dropdown-button ${isOpen ? 'dropdown-active' : ''}`} onClick={toggleDropdown}>
                {/* Replace with your image */}
                <img src="https://via.placeholder.com/50" alt="profile"/>
            </div>
            {isOpen && (
                <ul className="dropdown-menu">
                    <li className="dropdown-item-main">
                        {/* Replace with your image */}
                        <img src="https://via.placeholder.com/50" alt="profile"/>
                        <div className="dropdown-item-main-profile">
                            <p className="dropdown-item-name">Opeyemi Odedeyi</p>
                            <NavLink to="/">Manage your profile</NavLink> 
                        </div>
                    </li>
                    {props.dropdownItems.map((item, index) => (
                        <li key={index} className="dropdown-item" onClick={() => {
                            item.action();
                            setIsOpen(false); }}
                        >
                            {item.text}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ProfileDropdown;
