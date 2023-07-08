import React from "react";
import "./CustomButton.css";

const SocialLogin = ( props ) => {
    const { imgSrc, style, onClick, disabled, children} = props;

    return (
        <button type="button" className={`social-login-button ${style}`} onClick={onClick} disabled={disabled}>
            <img src={imgSrc} alt="google" className="google-icon"/>
            <span>{ children }</span>
        </button>
    );
};

export default SocialLogin
