import React from "react";
import "./CustomButton.css";

const CustomButton = ( props ) => {
    const { screentype, onClick, disabled, children } = props;
    const className = screentype === 'desk' ? 'desk' : '';

    return (
        <button className={`custom-button ${className}`} onClick={onClick} disabled={disabled}>
            { children }
        </button>
    );
};

export default CustomButton
