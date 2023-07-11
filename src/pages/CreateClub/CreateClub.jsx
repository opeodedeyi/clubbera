import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import CreateHeader from "../../components/header/CreateHeader";
import CustomButton from "../../components/CustomButton/CustomButton";
import CheckButton from "../../components/CustomButton/CheckButton";
import CustomTag from "../../components/CustomButton/CustomTag";
import FormInput from "../../components/FormInput/FormInput";
import MapInput from "../../components/FormInput/MapInput";
import MapContainer from "../../components/MapContainer/MapContainer";
import SingleImageUpload from "../../components/ImageUpload/SingleImageUpload";

import { useSelector, useDispatch } from "react-redux";
import { createClubActions } from "../../store/createClub";

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
                    placeholder="Enter Your Club's Primary Meeting Location" />
                
                <div className="mb-one"></div>

                { isComponentMounted && Object.keys(coordinates).length > 0  && <MapContainer center={coordinates} />}
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
    const tags = useSelector((state) => state.createClub.tags);
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
    return (
        <>
            <div className="create-club-intro-texts">
                <h2 className="create-club-header">Upload Your Club's Banner Image</h2>
                <SingleImageUpload />
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

const StepPost = () => {
    const navigate = useNavigate();

    const whatNextClick = () => {
        navigate('/');
    };

    return (
        <>
            <div className="create-club-form-content">
                <div className="mb-one"></div>
                <div className="create-club-finish-logo mb-one">
                    <img src={checkMark} alt="back arrow" className="create-club-finish-mark" />
                </div>
                <h2 className="create-club-header">Steps Completed</h2>
                <p className="create-club-tip-point tpmw-cc mb-one">Awesome! Your club is set to make a splash on Clubbera! Stay tuned for updates and next steps. Get ready for the fun to unfold. Let's start this exciting journey</p>
                <CustomButton style="default-style" size="normal" onClick={(e) => whatNextClick(e)}>Homepage</CustomButton>
            </div>
        </>
    );
}

const CreateClub = () => {
    useEffect(() => {
        document.title = "Create Community | Clubbera";
    }, []);

    const [step, setStep] = useState(0);

    const handleNext = (event) => {
        event.preventDefault();
        setStep(step + 1)
    };
    const handleBack = (event) => {
        event.preventDefault();
        setStep(step - 1);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        // Logic to handle form submission
        console.log('Form submitted with clubname');
        setStep(step + 1)
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
                        {step === 6 && <StepPost />}
                    </div>

                    {step < 5 ? (
                        <CustomButton style="default-style" size="small" onClick={(e) => handleNext(e)}>Next</CustomButton>
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
