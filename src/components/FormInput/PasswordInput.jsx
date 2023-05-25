import React, { useState } from "react";
import "./FormInput.css";
import eye from '../../assets/svg/eye.svg';

const FormInput = ( props ) => {
    const [type, setType] = useState('password');

    const changeView = () => {
        if (type=="password") {
            setType("text");
        } else {
            setType("password");
        }
    };

    return (
        <div className="form-input-password">
            <input
                type={type}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
            />
            <img src={eye} alt="eye" className="eye-icon" onClick={changeView}/>
        </div>
    );
}

export default FormInput