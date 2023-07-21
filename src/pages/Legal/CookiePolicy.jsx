import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import Header from '../../components/header/Header';
import "./Policy.css";

const CookiePolicy = (props) => {
    useEffect(() => {
        document.title = 'Cookie Policy | Clubera';
    }, []);

    return (
        <>
            <Header />

            <div className="policy-container">
                <div className="policy-container-header">
                    <h1>Cookie Policy</h1>
                </div>
                <div className="policy-container-main">
                    <h1>Clubbera Cookie Policy</h1>
                    <p>Last Updated: July 21, 2023</p>
                    <p>Welcome to Clubbera. This Cookie Policy explains how Clubbera ("we", "our", "us") uses cookies and similar technologies to recognize you when you visit our website at www.clubbera.com ("Website"). It explains what these technologies are and why we use them, as well as your rights to control our use of them.</p>

                    <h2>What are cookies?</h2>
                    <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information. They help us to improve our site and deliver a better and more personalized service.</p>

                    <h2>Why do we use cookies?</h2>
                    <p>Clubbera uses first and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Website. Third parties serve cookies through our Website for advertising, analytics, and other purposes.</p>
                    
                    <h2>How can you control cookies?</h2>
                    <p>You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.</p>

                    <h2>Types of Cookie We Use</h2>
                    <p>We use the following types of cookies:</p>
                    <ul>
                        <li>
                            <h3>Strictly necessary cookies</h3>
                            <p>These are cookies that are required for the operation of our website.</p>
                        </li>
                        <li>
                            <h3>Analytical/performance cookies</h3>
                            <p>They allow us to recognize and count the number of visitors and to see how visitors move around our website when they are using it.</p>
                        </li>
                        <li>
                            <h3>Functionality cookies</h3>
                            <p>These are used to recognize you when you return to our website.</p>
                        </li>
                        <li>
                            <h3>Targeting cookies</h3>
                            <p>These cookies record your visit to our website, the pages you have visited and the links you have followed.</p>
                        </li>
                    </ul>

                    <h2>Cookies Used by Our Service Providers</h2>
                    <p>Our service providers use cookies and those cookies may be stored on your computer when you visit our website.</p>

                    <h2>How often will you update this Cookie Policy?</h2>
                    <p>We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please, therefore, re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.</p>

                    <h2>Where can I get further information?</h2>
                    <p>If you have any questions about our use of cookies or other technologies, please email us at support@clubbera.com.</p>
                    <p>By using our website, you agree to the use of cookies and other technologies as set out in this policy. We appreciate some users may like more individual control over their visit to our website and can adjust their settings accordingly. You can read all about this in the section above "How can you control cookies?"</p>
                    <p>Thank you for visiting Clubbera!</p>
                </div>
            </div>
        </>
    );
};

export default CookiePolicy;
