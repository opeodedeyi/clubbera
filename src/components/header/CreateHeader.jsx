import React, { useState} from "react";
import { useNavigate, NavLink } from "react-router-dom";
import CustomButton from "../CustomButton/CustomButton";
import "./Header.css";

const CreateHeader = () => {
    const navigate = useNavigate();

    const tipButtonClick = () => {
        console.log("Question button clicked");
    };

    return (
        <>
            <header className="create-header-content header-scrolled">
                <div className="header-content">
                    <NavLink to="/" className="header-website-name">Clubbera</NavLink>
                
                    <div className="header-btns mob-only">
                        <CustomButton style="inverted-style" size="small" onClick={tipButtonClick}>Tips?</CustomButton>
                    </div>
                </div>
            </header>
        </>
    )
}

export default CreateHeader
