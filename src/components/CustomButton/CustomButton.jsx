import React from "react";
import "./CustomButton.css";

const CustomButton = ( props ) => {
    const { screentype, onClick, disabled, children, size } = props;
    const className = screentype === 'desk' ? 'desk' : '';

    if (size === 'form') {
        return (
            <button className={`custom-button ${className} ${size}`} onClick={onClick} disabled={disabled}>
                { children }
            </button>
        );
    } else {
        return (
            <button className={`custom-button ${className} normal`} onClick={onClick} disabled={disabled}>
                { children }
            </button>
        );
    }
};

export default CustomButton
