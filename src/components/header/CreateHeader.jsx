import React, { useState} from "react";
import { useNavigate, NavLink } from "react-router-dom";
import CustomButton from "../CustomButton/CustomButton";
import "./Header.css";

const CreateHeader = () => {
    const navigate = useNavigate();

    const questionButtonClick = () => {
        console.log("Question button clicked");
    };

    const exitButtonClick = () => {
        navigate('/');
    };

    return (
        <>
            <header className="create-header-content header-scrolled">
                <div className="header-content">
                    <NavLink to="/" className="header-website-name name-desk">Clubbera</NavLink>
                
                    <div className="header-btns">
                        <CustomButton style="inverted-style" size="small" onClick={questionButtonClick}>Questions?</CustomButton>
                        <CustomButton style="inverted-style" size="small" onClick={exitButtonClick}>Exit</CustomButton>
                    </div>
                </div>
            </header>
        </>
    )
}

export default CreateHeader
