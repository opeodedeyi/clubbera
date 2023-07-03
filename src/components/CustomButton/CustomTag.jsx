import React from "react";
import "./CustomButton.css";

const CustomTag = ( props ) => {
    const { tagged, onClick, children } = props;

    return (
        <button type="button" className={`custom-tag ${tagged}`} onClick={onClick}>
            { children }
        </button>
    );
};

export default CustomTag
