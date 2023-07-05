import React from "react";
import "./FormInput.css";

const FormInput = ( props ) => {
    if (props.type === 'textarea') {
        return (
            <div className="form-input-textarea">
                <textarea
                    className="form-input form-textarea"
                    placeholder={props.placeholder}
                    value={props.value}
                    onFocus={props.onFocus}
                    onChange={props.onChange}
                ></textarea>
            </div>
        )
    } else {
        return (
            <>
                {props.input && 
                    <>
                        <label className="form-label" htmlFor={props.input}>{ props.input }</label>
                        <div className="mb-1"></div>
                    </>
                }
                <div className="form-input-normal">
                    <input
                        type={props.type}
                        placeholder={props.placeholder}
                        value={props.value}
                        onFocus={props.onFocus}
                        onChange={props.onChange}
                    />
                </div>
            </>
        );
    }
}

export default FormInput
