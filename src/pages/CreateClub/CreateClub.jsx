import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';

import CreateHeader from "../../components/header/CreateHeader";
import CustomButton from "../../components/CustomButton/CustomButton";
import CheckButton from "../../components/CustomButton/CheckButton";
import CustomTag from "../../components/CustomButton/CustomTag";
import FormInput from "../../components/FormInput/FormInput";
import MapInput from "../../components/FormInput/MapInput";
import MapContainer from "../../components/MapContainer/MapContainer";
import SingleImageUpload from "../../components/ImageUpload/SingleImageUpload";

import { useSelector, useDispatch } from "react-redux";
import { createClubActions, createCommunity } from "../../store/createClub";
import { utilityActions } from "../../store/utility";

import buildingblockImage from '../../assets/images/buildingblockb.png';
import arrowBack from '../../assets/svg/arrowBack.svg';
import checkMark from '../../assets/svg/checkMark.svg';
import tipIcon from '../../assets/svg/tips.svg';
import './CreateClub.css';


const StepPre = () => {
    return (
        <>
            <div className="create-club-intro-texts">
                <h2 className="create-club-header">Give Your Community the Spotlight!</h2>
                <p className="create-club-text">Are you leading an amazing community or club that's just waiting to be discovered? We can't wait to meet you! Clubbera is the perfect place to showcase your community, reach passionate individuals, and make your club shine. Don't keep your awesome community a secret; use this form to share the excitement.</p>
            </div>

            <div className="create-club-image">
                <img src={buildingblockImage} alt="buildingblockImage" />
            </div>
        </>
    );
}

const StepOne = () => {
    const dispatch = useDispatch();
    const inputValue = useSelector((state) => state.createClub.inputValue);
    const coordinates = useSelector((state) => state.createClub.coordinates);
    const [isComponentMounted, setIsComponentMounted] = useState(false);

    useEffect(() => {
        setIsComponentMounted(true);
    }, []);

    return (
        <>
            <div className="create-club-intro-texts">
                <h2 className="create-club-header">Primary Meeting Location</h2>
                <MapInput 
                    type="text" 
                    placeholder="Enter Your Club's Primary Meeting Location"
                    value={inputValue}
                    onChange={(value) => dispatch(createClubActions.setInputValue(value))}
                    onSelect={(suggestion) => {
                        const { formatted_address, place_id, geometry } = suggestion;
                        dispatch(createClubActions.setPlaceId(place_id));
                        dispatch(createClubActions.setFormattedAddress(formatted_address));
                        dispatch(createClubActions.setCoordinates({ lat: geometry.location.lat, lng: geometry.location.lng }));
                        dispatch(createClubActions.setInputValue(formatted_address));
                    }} 
                    onCurrentLocation={(result) => {
                        dispatch(createClubActions.setPlaceId(result.place_id));
                        dispatch(createClubActions.setFormattedAddress(result.formatted_address));
                        dispatch(createClubActions.setCoordinates({ lat: result.geometry.location.lat, lng: result.geometry.location.lng }));
                        dispatch(createClubActions.setInputValue(result.formatted_address));
                    }} />
                
                <div className="mb-one"></div>

                { isComponentMounted && coordinates.lat && coordinates.lng && <MapContainer center={coordinates} />}
            </div>

            <div className="create-club-tip">
                <p className="create-club-tip-header"> 
                    <img src={tipIcon} alt="tip icon" className="create-club-tip-icon" />
                    <span>Tips</span>
                </p>
                <p className="create-club-tip-point">Enter the main location for your club meetings or events (e.g., 'Main Street Park, Springfield'). This helps potential members know if they can attend regularly</p>
            </div>
        </>
    );
}

const StepTwo = () => {
    const dispatch = useDispatch();
    const tags = useSelector((state) => state.utility.tags);
    const selectedTags = useSelector((state) => state.createClub.selectedTags);

    const handleClick = (tag) => {
        dispatch(createClubActions.toggleTagSelection(tag));
    };

    return (
        <>
            <div className="create-club-intro-texts">
                <h2 className="create-club-header">Select Tags That Describe Your Club</h2>

                <div className="create-club-tags">
                    {tags.map((tag, index) => (
                        <CustomTag key={index} tagged={selectedTags.includes(tag) ? 'is-tagged' : 'not-tagged'} onClick={() => handleClick(tag)}>
                            {tag}
                        </CustomTag>
                    ))}
                </div>
            </div>

            <div className="create-club-tip">
                <p className="create-club-tip-header"> 
                    <img src={tipIcon} alt="tip icon" className="create-club-tip-icon" />
                    <span>Tips</span>
                </p>
                <p className="create-club-tip-point">Choose tags that best describe your club. This helps potential members find your club when they search for specific interests. For example, if your club is about hiking, you might choose tags like 'Outdoor', 'Adventure', 'Hiking', etc.</p>
            </div>
        </>
    );
}

const StepThree = () => {
    const dispatch = useDispatch();
    const clubName = useSelector((state) => state.createClub.clubName);
    const clubDescription = useSelector((state) => state.createClub.clubDescription);

    const [activeInput, setActiveInput] = useState('clubName');

    const tips = {
        clubName: 'Choose a name that clearly represents your club. Make it catchy and relevant to the interests or activities of your club.',
        clubDescription: `Describe what your club is about. Mention your main activities, unique features, and what members can expect. Make it appealing to potential members.`
    };

    return (
        <>
            <div className="create-club-intro-texts">
                <h2 className="create-club-header">Enter Your Club Name</h2>
                <FormInput
                    type="text"
                    placeholder="e.g., 'Springfield Hiking Enthusiasts"
                    value={clubName}
                    onFocus={() => setActiveInput('clubName')}
                    onChange={(e) => dispatch(createClubActions.setClubName(e.target.value))}/>

                <div className="mb-two"></div>

                <h2 className="create-club-header">Enter Your Club Description</h2>
                <FormInput
                    type="textarea"
                    placeholder="e.g., 'Our club is for all hiking enthusiasts who love exploring the trails around Springfield. We meet every Saturday morning and occasionally organize weekend camping trips...'"
                    value={clubDescription}
                    onFocus={() => setActiveInput('clubDescription')}
                    onChange={(e) => dispatch(createClubActions.setClubDescription(e.target.value))}/>
            </div>

            <div className="create-club-tip">
                <p className="create-club-tip-header"> 
                    <img src={tipIcon} alt="tip icon" className="create-club-tip-icon" />
                    <span>Tips</span>
                </p>
                <p 
                    className="create-club-tip-point" 
                    dangerouslySetInnerHTML={{ __html: tips[activeInput] }} 
                />
            </div>
        </>
    );
}

const StepFour = () => {
    const dispatch = useDispatch();
    const permissionRequired = useSelector((state) => state.createClub.permissionRequired);

    return (
        <>
            <div className="create-club-intro-texts">
                <h2 className="create-club-header">Is Your Club Private or Public?</h2>
                <p className="create-club-tip-point mb-two">Club Privacy Settings</p>
                <div className="create-club-choose">
                    <CheckButton style="checked-style" size="padded" checked={permissionRequired===true ? true : false} onClick={() => dispatch(createClubActions.setPermissionTrue())}>Private</CheckButton>
                    <CheckButton style="checked-style" size="padded" checked={permissionRequired===false ? true : false} onClick={() => dispatch(createClubActions.setPermissionFalse())}>Public</CheckButton>
                </div>
            </div>

            <div className="create-club-tip">
                <p className="create-club-tip-header"> 
                    <img src={tipIcon} alt="tip icon" className="create-club-tip-icon" />
                    <span>Tips</span>
                </p>
                <p className="create-club-tip-point">Select whether your club is private or public. A private club allows you to control membership by approving or rejecting join requests. A public club allows anyone to join freely, although you retain the power to ban any misbehaving members.</p>
            </div>
        </>
    );
}

const StepFive = () => {
    const dispatch = useDispatch();
    const rawPhoto = useSelector((state) => state.createClub.rawPhoto);

    return (
        <>
            <div className="create-club-intro-texts">
                <h2 className="create-club-header">Upload Your Club's Banner Image</h2>
                <SingleImageUpload 
                    selectedImage={ rawPhoto }
                    setSelectedImage={(newImage) => dispatch(createClubActions.setRawPhoto(newImage))}
                    setSelectedImageName={(filename) => dispatch(createClubActions.setBannerFileName(filename))}/>
            </div>

            <div className="create-club-tip">
                <p className="create-club-tip-header"> 
                    <img src={tipIcon} alt="tip icon" className="create-club-tip-icon" />
                    <span>Tips</span>
                </p>
                <p className="create-club-tip-point">Upload a landscape-oriented image that best represents your club. This image will be your club's banner, so choose a photo that's eye-catching and relevant. Ideal dimensions are 1920 by 1080 pixels for best display quality.</p>
            </div>
        </>
    );
}

const StepPost = ({ uniqueURL }) => {
    const navigate = useNavigate();

    const whatNextClick = () => {
        navigate(`/community/${uniqueURL}`);
    };

    return (
        <>
            <div className="create-club-form-content">
                <div className="mb-one"></div>
                <div className="create-club-finish-logo mb-one">
                    <img src={checkMark} alt="back arrow" className="create-club-finish-mark" />
                </div>
                <h2 className="create-club-header">Steps Completed</h2>
                <p className="create-club-tip-point tpmw-cc mb-one">Awesome! Your club is set to make a splash on Clubbera! Stay tuned for updates and next steps. Get ready for the fun to unfold. Click on the button below to see what your community loos like to people</p>
                <CustomButton style="default-style" size="normal" onClick={(e) => whatNextClick(e)}>View Community</CustomButton>
            </div>
        </>
    );
}

const CreateClub = () => {
    const API_URL = import.meta.env.VITE_APP_WEBSITE_API;
    const dispatch = useDispatch();
    const hasNavigatedRef = useRef(false);
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [uniqueURL, setUniqueURL] = useState('');
    const user = useSelector((state) => state.auth.user);
    const tags = useSelector((state) => state.utility.tags);
    const formattedAddress = useSelector((state) => state.createClub.formattedAddress);
    const selectedTags = useSelector((state) => state.createClub.selectedTags);
    const clubName = useSelector((state) => state.createClub.clubName);
    const clubDescription = useSelector((state) => state.createClub.clubDescription);
    const permissionRequired = useSelector((state) => state.createClub.permissionRequired);
    const isDisabled = (step==1 && formattedAddress.length==0) 
        || (step==2 && selectedTags.length==0) 
        || (step==3 && (clubName.length<1 || clubDescription.length<1)) 
        || (step==4 && permissionRequired===null)
  

    useEffect(() => {
        document.title = "Create Community | Clubbera";
    
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${API_URL}/category`);
                dispatch(utilityActions.setTags(response.data))
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };
    
        if (!tags.length) { // If tags array is empty, fetch categories
            fetchCategories();
        }
    }, [tags]);
    
    useEffect(() => {
        if (user === null && !hasNavigatedRef.current) { // check if user is null
            toast('🦄 You need to Login to create a community')
            navigate("/login");
            hasNavigatedRef.current = true;
        }

        if (user.isEmailConfirmed===false) {
            toast('🦄 You need to be Verified to create a community')
            navigate('/pr');  // navigate to profile if user is not verified
        }
    }, [user]);

    const handleNext = (event) => {
        event.preventDefault();
        setStep(step + 1)
    };
    const handleBack = (event) => {
        event.preventDefault();
        setStep(step - 1);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        try { // Fix here there is a bug
            const response = await dispatch(createCommunity());
            setUniqueURL(response.data.uniqueURL);
            setStep(step + 1);
            toast('🦄 Successfully Created your Community')
        } catch (error) {
            toast('Sorry something went wrong')
            console.error('An error occurred while creating the community:', error);
        }
    }

    return (
        <>
            <CreateHeader />
            
            <form className="create-club-container">
                <div className="create-club-progress">
                    <div className="create-club-progress-bar" style={{ width: `calc(${step} * 16.6%)` }}></div>
                </div>

                <div className="create-club-intro">
                    {step !== 0 && step !== 6 && (
                        <div className="create-club-back-button" onClick={handleBack}>
                            <img src={arrowBack} alt="back arrow" className="create-club-back-arrow" />
                            <span>Back</span>
                        </div>
                    )}

                    <div className="create-club-sub">
                        {step === 0 && <StepPre />}
                        {step === 1 && <StepOne />}
                        {step === 2 && <StepTwo />}
                        {step === 3 && <StepThree />}
                        {step === 4 && <StepFour />}
                        {step === 5 && <StepFive />}
                        {step === 6 && <StepPost uniqueURL={uniqueURL} />}
                    </div>

                    {step < 5 ? (
                        <CustomButton disabled={isDisabled} style="default-style" size="small" onClick={(e) => handleNext(e)}>Next</CustomButton>
                    ) : (
                        step === 5 ? (
                            <CustomButton style="default-style" size="small" onClick={handleSubmit}>Submit</CustomButton>
                        ) : null
                    )}

                </div>
            </form>
        </>
    )
}

export default CreateClub
