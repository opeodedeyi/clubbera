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
        <>
            {props.input && 
                <>
                    <label className="form-label" htmlFor={props.input}>{ props.input }</label>
                    <div className="mb-1"></div>
                </>
            }
            <div className="form-input-password">
                <input
                    name={props.input}
                    type={type}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChange}
                />
                <img src={eye} alt="eye" className="eye-icon" onClick={changeView}/>
            </div>
        </>
    );
}

export default FormInput