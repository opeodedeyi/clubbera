import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import Header from '../../components/header/Header';
import "./Policy.css";

const PrivacyPolicy = (props) => {
    useEffect(() => {
        document.title = 'Privacy Policy | Clubera';
    }, []);

    return (
        <>
            <Header />

            <div className="policy-container">
                <div className="policy-container-header">
                    <h1>Privacy Policy</h1>
                </div>
                <div className="policy-container-main">
                    <h1>Clubbera Privacy Policy</h1>
                    <p>Last Updated: July 21, 2023</p>
                    <p>Welcome to Clubbera. This privacy policy will help you understand how Clubbera ("us", "we", "our") uses and protects the data you provide to us when you visit and use www.clubbera.com ("website", "service").</p>
                    <p>We reserve the right to change this policy at any given time. If you want to make sure that you are up to date with the latest changes, we advise you to frequently visit this page.</p>

                    <h2>What User Data We Collect</h2>
                    <p>When you visit the website, we may collect the following data:</p>
                    <ul>
                        <li>
                            <h3>Your IP address.</h3>
                        </li>
                        <li>
                            <h3>Your contact information and email address.</h3>
                        </li>
                        <li>
                            <h3>Other information such as interests and preferences.</h3>
                        </li>
                        <li>
                            <h3>Data profile regarding your online behavior on our website.</h3>
                        </li>
                    </ul>

                    <h2>Why We Collect Your Data</h2>
                    <p>We are collecting your data for several reasons:</p>
                    <ul>
                        <li>
                            <h3>To better understand your needs.</h3>
                        </li>
                        <li>
                            <h3>To improve our services and products.</h3>
                        </li>
                        <li>
                            <h3>To send you promotional emails containing the information we think you will find interesting.</h3>
                        </li>
                        <li>
                            <h3>To contact you to fill out surveys and participate in other types of market research.</h3>
                        </li>
                        <li>
                            <h3>To customize our website according to your online behavior and personal preferences.</h3>
                        </li>
                    </ul>
                    
                    <h2>Safeguarding and Securing the Data</h2>
                    <p>Clubbera is committed to securing your data and keeping it confidential. Clubbera has done all in its power to prevent data theft, unauthorized access, and disclosure by implementing the latest technologies and software, which help us safeguard all the information we collect online.</p>

                    <h2>Our Cookie Policy</h2>
                    <p>Once you agree to allow our website to use cookies, you also agree to use the data it collects regarding your online behavior (analyze web traffic, web pages you spend the most time on, and websites you visit).</p>
                    <p>The data we collect by using cookies is used to customize our website to your needs. Please refer to our Cookie Policy for more information.</p>

                    <h2>Links to Other Websites</h2>
                    <p>Our website contains links that lead to other websites. If you click on these links, Clubbera is not held responsible for your data and privacy protection. Visiting those websites is not governed by this privacy policy agreement. Make sure to read the privacy policy documentation of the website you go to from our website.</p>

                    <h2>Restricting the Collection of your Personal Data</h2>
                    <p>At some point, you might wish to restrict the use and collection of your personal data. Please reach out to us at support@clubbera.com to indicate that you want to be excluded from our marketing campaigns.</p>

                    <h2>Contact Us</h2>
                    <p>If you have any questions or concerns about our Privacy Policy, please contact us.</p>
                </div>
            </div>
        </>
    );
};

export default PrivacyPolicy;
