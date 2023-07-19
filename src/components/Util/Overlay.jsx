import React from 'react';
import './Overlay.css';

const Overlay = (props) => {
    const { isOpen, onClick} = props;

    let openStyle = '';

    if (isOpen) {
        openStyle = 'overlay-open';
    }

    return (
        <div className={`overlay ${openStyle}`} onClick={onClick}></div>
    );
};

export default Overlay