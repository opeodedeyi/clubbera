import React from "react";
import "./CustomButton.css";

const CustomButton = ( props ) => {
    const { screentype, style, onClick, disabled, children, size } = props;
    let scrtyp = '';
    const btnsize = size || 'normal';
    const btnstyle = style || 'default-style'

    if (screentype === 'desk') {
        scrtyp = 'desk';
    } else if (screentype === 'mob') {
        scrtyp = 'mob';
    }

    return (
        <button className={`custom-button ${scrtyp} ${btnsize} ${btnstyle}`} onClick={onClick} disabled={disabled}>
            { children }
        </button>
    );
};

export default CustomButton
