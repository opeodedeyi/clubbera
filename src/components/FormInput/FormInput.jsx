import React from "react";
import "./FormInput.css";

const FormInput = ( props ) => {
    if (props.type === 'textarea') {
        return (
            <textarea
                className="form-input form-textarea"
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
            ></textarea>
        )
    } else {
        return (
            <div className="form-input-normal">
                <input
                    type={props.type}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChange}
                />
            </div>
        );
    }
}

export default FormInput
