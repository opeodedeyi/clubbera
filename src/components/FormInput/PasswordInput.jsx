import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import "./FormInput.css";

import eyeOpen from '../../assets/svg/eyeOpen.svg';
import eyeClosed from '../../assets/svg/eyeClosed.svg';

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
                    <div className="label-container">
                        <label className="form-label" htmlFor={props.input}>{ props.input }</label>
                        {props.hasForgotPassword && <NavLink to="/forgot-password">Forgot Password</NavLink>}
                    </div>
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
                
                {type==="password" ? 
                    <img src={eyeOpen} alt="eyeOpen" className="eye-icon" onClick={changeView}/>
                :
                    <img src={eyeClosed} alt="eyeClosed" className="eye-icon" onClick={changeView}/>
                }
            </div>
        </>
    );
}

export default FormInput