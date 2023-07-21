import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import Header from '../../components/header/Header';
import "./Policy.css";

const TermsOfService = (props) => {
    useEffect(() => {
        document.title = 'Terms of Service | Clubera';
    }, []);

    return (
        <>
            <Header />

            <div className="policy-container">
                <div className="policy-container-header">
                    <h1>Terms of Service</h1>
                </div>
                <div className="policy-container-main">
                    <h1>Clubbera Terms of Service</h1>
                    <p>Last Updated: July 21, 2023</p>
                    <p>Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the www.clubbera.com website (the "Service") operated by Clubbera ("us", "we", or "our").</p>

                    <h2>1. Agreement to Terms</h2>
                    <p>By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you do not have permission to access the Service.</p>

                    <h2>2. Accounts</h2>
                    <p>When you create an account with us, you guarantee that the information you provide us is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>
                    
                    <h2>3. Intellectual Property</h2>
                    <p>The Service and its original content, features, and functionality are and will remain the exclusive property of Clubbera and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.</p>

                    <h2>4. Links To Other Web Sites</h2>
                    <p>Our Service may contain links to third-party web sites or services that are not owned or controlled by Clubbera. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party web sites or services.</p>

                    <h2>5. Termination</h2>
                    <p>We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.</p>

                    <h2>6. Disclaimer</h2>
                    <p>Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied.</p>

                    <h2>7. Governing Law</h2>
                    <p>These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.</p>

                    <h2>8. Changes</h2>
                    <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time.</p>

                    <h2>9. Contact Us</h2>
                    <p>If you have any questions about these Terms, please contact us at support@clubbera.com.</p>
                </div>
            </div>
        </>
    );
};

export default TermsOfService;
