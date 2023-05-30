import React from "react";
import "./Footer.css";

const CreateFooter = (props) => {
    const { children } = props;

    return (
        <>
            <footer className="footer">
                <div className="footer-create-content">
                    { children }
                </div>
            </footer>
        </>
    )
}

export default CreateFooter
