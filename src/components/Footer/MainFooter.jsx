import React from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";

import "./Footer.css";

const MainFooter = (props) => {
    const { children } = props;
    const navigate = useNavigate();

    return (
        <>
            <footer className="footer">
                {/* <div className="footer-top">
                    <div className="footer-bottom-copy">
                        <p className="footer-bottom-copy">© 2023 Clubbera.</p>
                    </div>
                    <div className="footer-bottom-links">
                        <NavLink to="/terms-of-service" className="footer-bottom-link-item">Terms of Service</NavLink>
                        <NavLink to="/privacy-policy" className="footer-bottom-link-item">Privacy Policy</NavLink>
                        <NavLink to="/cookie-policy" className="footer-bottom-link-item">Cookie Policy</NavLink>
                    </div>
                </div> */}
                <div className="footer-bottom">
                    <p className="footer-bottom-copy">© 2023 Clubbera.</p>
                    <div className="footer-bottom-links">
                        <NavLink to="/terms-of-service" className="footer-bottom-link-item">Terms of Service</NavLink>
                        <NavLink to="/privacy-policy" className="footer-bottom-link-item">Privacy Policy</NavLink>
                        <NavLink to="/cookie-policy" className="footer-bottom-link-item">Cookie Policy</NavLink>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default MainFooter
