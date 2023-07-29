import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import { useSelector } from "react-redux";

import Header from '../../components/header/Header';
import MainFooter from '../../components/Footer/MainFooter';
import CustomTag from "../../components/CustomButton/CustomTag";
import CustomButton from '../../components/CustomButton/CustomButton';

import noProfileImg from '../../assets/images/noProfileImg.png';

import './UserProfile.css';


const LoadingUser = () => {
    return (
        <>
            <div className="user-image-loading"> </div>

            <div className="profile-content-loading"> </div>

            <div className="profile-content-loading"> </div>
        </>
    );
}


const UserProfile = () => {
    const { uniqueURL } = useParams();
    const API_URL = import.meta.env.VITE_APP_WEBSITE_API;
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const [visitedUser, setVisitedUser] = useState(null);
    let profileImgSrc = noProfileImg;
    if (visitedUser) {
        profileImgSrc = visitedUser.profilePhoto?.location ? visitedUser.profilePhoto.location : noProfileImg;
    }
    
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

    useEffect(() => {
        document.title = `${uniqueURL} | Clubera`;
    }, []);

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
                                    <img src={profileImgSrc} alt="" />
                                </div>
                            </div>
                            <div className="profile-content-details">
                                <div className="profile-content-texts">
                                    <p className="profile-content-details-name">{ visitedUser.fullname }</p>
                                    <p className="profile-content-details-email">{ visitedUser.email }</p>
                                    { visitedUser.bio &&
                                        <p className="profile-content-details-bio">{visitedUser.bio}</p>
                                    }
                                </div>

                                { visitedUser?._id===user?._id ?
                                    <CustomButton style="inverted-style">Edit Profile</CustomButton>
                                    : null
                                }
                            </div>
                        </div>

                        <div className="profile-content-container-other flex-btw-end">
                            { 
                                visitedUser?.interests?.length > 0 ?
                                    <div className="profile-interest-tags">
                                        { 
                                            visitedUser.interests.map((tag, index) => (
                                                <CustomTag key={index} tagged={selectedTags.includes(tag) ? 'is-tagged' : 'not-tagged'} onClick={() => handleClick(tag)}>
                                                    {tag}
                                                </CustomTag>
                                            ))
                                        }
                                    </div>
                                : <p className="profile-interest-tags-alt">No intrest indicated by the user</p>
                            }
                            { visitedUser?._id===user?._id ?
                                <CustomButton style="inverted-style">Edit Interests</CustomButton>
                                : null
                            }
                        </div>
                    </>
                }
            </div>

            <MainFooter />
        </>
    );
};

export default UserProfile;
