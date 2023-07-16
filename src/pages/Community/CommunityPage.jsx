import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import { useSelector } from "react-redux";

import Header from '../../components/header/Header';
import CustomButton from '../../components/CustomButton/CustomButton';

import Briefcase from '../../assets/svg/Briefcase.svg'
import People from '../../assets/svg/People.svg'

import './CommunityPage.css';


const LoadingCommunity = () => {
    return (
        <>
            <p>Loading...</p>
        </>
    );
}

const CommunityPage = () => {
    const { id } = useParams();
    const user = useSelector((state) => state.auth.user);
    const defaultImage = 'https://cdn.dribbble.com/userupload/8579132/file/original-671579801ae5f46f8c0b4ed36e9a9d74.png?compress=1';
    const API_URL = import.meta.env.VITE_APP_WEBSITE_API;
    const navigate = useNavigate();
    const [community, setCommunity] = useState(null);
    
    useEffect(() => {
        console.log(user);
        const fetchCommunity = async () => {
            try {
                const response = await axios.get(`${API_URL}/group/${id}`);
                setCommunity(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };

        if (community===null) {
            fetchCommunity();
        }
    }, []);

    const loginButtonClick = () => {
        navigate('/login');
        toast('👋🏼 You need to login first')
    };

    const verifyAccountClick = () => {
        // navigate('/login');
        toast('👋🏼 You need to first Verify your account')
    };

    const editButtonClick = () => {
        // navigate('/login');
        toast('👋🏼 Edit button clicked')
    };

    const LeaveButtonClick = () => {
        // navigate('/login');
        toast('👋🏼 Leave oe remove request button clicked')
    };

    const joinButtonClick = () => {
        // navigate('/login');
        toast('👋🏼 Join button clicked')
    };

    const renderButton = () => {
        if (!user || !community) {
            return <CustomButton onClick={loginButtonClick}>Join Community</CustomButton>; // User not logged in
        }

        if (user.isEmailConfirmed===false) {
            return <CustomButton onClick={verifyAccountClick}>Join Community</CustomButton>; // User not logged in
        }
    
        if (community.owner === user._id) {
            return <CustomButton style="bland-style" onClick={editButtonClick}>Edit Community</CustomButton>; // User is owner
        }
    
        if (community.members.includes(user._id)) {
            return <CustomButton style="inverted-style" onClick={LeaveButtonClick}>Leave Community</CustomButton>; // User is member of community
        }
    
        if (community.requests && community.requests.includes(user._id)) {
            return <CustomButton style="bland-style" onClick={LeaveButtonClick}>Requested</CustomButton>; // User has requested to join
        }
    
        return <CustomButton onClick={joinButtonClick}>Join Community</CustomButton>; // Default case to join community
    }

    return (
        <>
            <Header />

            {!community ?
                <LoadingCommunity />
            :
                <>
                    <div className="community-image-container">
                        <img className="community-image-container-img" src={defaultImage} alt="" />
                        <div className="community-main-image-container">
                            <img src={defaultImage} alt="" />
                        </div>
                    </div>
                    <div className="community-body-container">
                        <div className="community-title-container">
                            <p className="community-title-text">{community.name}</p>
                            
                            {renderButton()}
                        </div>
                        <div className="community-basic-details">
                            <div className="community-basic-details-members"><img src={People} alt="" /> <span>{community.members.length+1} members</span></div>
                            <div className="community-basic-details-openess"><img src={Briefcase} alt="" /> <span>{community.permissionRequired ? "Private Group" : "Public Group"}</span></div>
                        </div>
                        <div className="community-description">
                            <p>{ community.description }</p>
                        </div>

                    </div>
                    
                </>
            }
        </>
    );
};

export default CommunityPage;
