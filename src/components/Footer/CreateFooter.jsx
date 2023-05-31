import React from "react";
import "./Footer.css";

const CreateFooter = (props) => {
    const { children } = props;

    return (
        <>
            <footer className="footer fcc">
                <div className="footer-create-content fccontent">
                    { children }
                </div>
            </footer>
        </>
    )
}

export default CreateFooter
