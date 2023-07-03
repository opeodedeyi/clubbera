import React from "react";
import "./CustomButton.css";

const CheckButton = ( props ) => {
    const {style, onClick, children, size, checked } = props;
    const checkedClass = checked ? 'is-checked' : 'not-checked';

    return (
        <button type="button" className={`${size} ${style} ${checkedClass}`} onClick={onClick}>
            { children }
        </button>
    );
};

export default CheckButton
