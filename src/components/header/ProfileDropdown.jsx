import React, { useState } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';

import "./ProfileDropdown.css";

const ProfileDropdown = ( props ) => {
    const [isOpen, setIsOpen] = useState(false);
    const user = useSelector(state => state.auth.user);
    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className="header-profile-dropdown">
            <div className={`dropdown-button ${isOpen ? 'dropdown-active' : ''}`} onClick={toggleDropdown}>
                {user.profilePhoto.location ? (
                    <img src={user.profilePhoto.location} alt="profile"/>
                ) :
                    <img src="https://via.placeholder.com/50" alt="profile"/>
                }
            </div>
            {isOpen && (
                <ul className="dropdown-menu">
                    <li className="dropdown-item-main">
                        {user.profilePhoto.location ? (
                            <img src={user.profilePhoto.location} alt="profile"/>
                        ) :
                            <img src="https://via.placeholder.com/50" alt="profile"/>
                        }
                        <div className="dropdown-item-main-profile">
                            <p className="dropdown-item-name">{ user.fullname }</p>
                            <NavLink to="/me">Manage your profile</NavLink> 
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
