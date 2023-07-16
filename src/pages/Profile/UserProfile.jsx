import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import { useSelector } from "react-redux";

import Header from '../../components/header/Header';

import CustomButton from '../../components/CustomButton/CustomButton';

import './UserProfile.css';


const LoadingUser = () => {
    return (
        <>
            <div className="user-image-loading">
            </div>

            <div className="profile-content-details">
                <div className="profile-content-texts">
                    <div className="profile-content-details-name-loading"></div>
                    
                    <div className="profile-content-details-email-loading"></div>
                </div>
            </div>
        </>
    );
}


const UserProfile = () => {
    const { uniqueURL } = useParams();
    const API_URL = import.meta.env.VITE_APP_WEBSITE_API;
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const [visitedUser, setVisitedUser] = useState(null);
    
    useEffect(() => {
        const fetchVisitedUser = async () => {
            try {
                const response = await axios.get(`${API_URL}/users/${uniqueURL}`);
                setVisitedUser(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Failed to fetch User:', error);
            }
        };

        if (visitedUser===null) {
            fetchVisitedUser();
        }
    }, [user, navigate]);

    return (
        <>
            <Header />

            <div className="profile-container">
                {!visitedUser ?
                    <LoadingUser />
                :
                    <>
                        <div className="profile-content-container">
                            <div className="profile-content-picture">
                                <div className="profile-picture-inner">
                                    <img src={visitedUser.profilePhoto.location} alt="" />
                                </div>
                            </div>
                            <div className="profile-content-details">
                                <div className="profile-content-texts">
                                    <p className="profile-content-details-name">{ visitedUser.fullname }</p>
                                    <p className="profile-content-details-email">{ visitedUser.email }</p>
                                </div>

                                { visitedUser?._id===user?._id ?
                                    <CustomButton style="inverted-style">Edit Profile</CustomButton>
                                    : null
                                }
                            </div>
                        </div>

                        <div className="profile-content-container-other">

                        </div>
                    </>
                }
            </div>
        </>
    );
};

export default UserProfile;
