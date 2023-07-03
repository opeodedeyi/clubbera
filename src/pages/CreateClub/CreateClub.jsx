import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import CreateHeader from "../../components/header/CreateHeader";
import CustomButton from "../../components/CustomButton/CustomButton";
import CheckButton from "../../components/CustomButton/CheckButton";
import CustomTag from "../../components/CustomButton/CustomTag";
import FormInput from "../../components/FormInput/FormInput";
import MapInput from "../../components/FormInput/MapInput";

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
                <h2 className="create-club-header">Tell us about your club</h2>
                <p className="create-club-text">In this step, we will ask you about the type of online club you want to create on the website and whether members can join the entire club or just specific sections. Then, please provide the club's focus or theme.</p>
            </div>

            <div className="create-club-image">
                <img src={buildingblockImage} alt="buildingblockImage" />
            </div>
        </>
    );
}

const StepOne = ({ locationObject, setLocationObject }) => {
    return (
        <>
            <div className="create-club-intro-texts">
                <h2 className="create-club-header">First, set your location for your group</h2>
                <MapInput 
                    type="text"
                    placeholder="Location of most meetings"
                    // value={clubName}
                    onSelect={setLocationObject}/>
            </div>

            <div className="create-club-tip">
                <p className="create-club-tip-header"> 
                    <img src={tipIcon} alt="tip icon" className="create-club-tip-icon" />
                    <span>Tips</span>
                </p>
                <p className="create-club-tip-point">Clubbera groups meet locally, in person or online. The location helps us to connect with people in your area</p>
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
                <h2 className="create-club-header">What tags best describe your group?</h2>

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
                <p className="create-club-tip-point">Be specific! This will help us promote your group to the right people. Try to select at least 3 topics before moving onto the next step.</p>
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
        clubName: 'Choose a name that will give people a clear idea of what the group is about.',
        clubDescription: `
            <p className="mb-one">Questions to consider:</p>
            <ul class="tip-list">
                <li>What’s the group goal?</li>
                <li>Who are you hoping to meet?</li>
                <li>What activities will people do?</li>
            </ul>
        `
    };

    return (
        <>
            <div className="create-club-intro-texts">
                <h2 className="create-club-header">Name your group</h2>
                <FormInput
                    type="text"
                    placeholder="Bradford baking meet group" 
                    input="clubName"
                    value={clubName}
                    onFocus={() => setActiveInput('clubName')}
                    onChange={(e) => dispatch(createClubActions.setClubName(e.target.value))}/>

                <div className="mb-two"></div>

                <h2 className="create-club-header">Describe your group</h2>
                <FormInput
                    type="textarea"
                    placeholder="Example: Welcome tech lovers far and wide! We’re an online and in-person tech-enthusiast group hosting live speaking events on a range of tech topics. You can join us in person if possible or on one of our live streams. Look out for our virtual happy hours and other networking events." 
                    input="clubDescription"
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
                <h2 className="create-club-header">Is this group a Private or Public Group?</h2>
                <p className="create-club-tip-point mb-two">Do you want your group to be private or public</p>
                <div className="create-club-choose">
                    <CheckButton style="checked-style" size="padded" checked={permissionRequired===true ? true : false} onClick={() => dispatch(createClubActions.setPermissionTrue())}>Yes</CheckButton>
                    <CheckButton style="checked-style" size="padded" checked={permissionRequired===false ? true : false} onClick={() => dispatch(createClubActions.setPermissionFalse())}>No</CheckButton>
                </div>
            </div>

            <div className="create-club-tip">
                <p className="create-club-tip-header"> 
                    <img src={tipIcon} alt="tip icon" className="create-club-tip-icon" />
                    <span>Tips</span>
                </p>
                <p className="create-club-tip-point">Selecting 'Yes' gives you more control on who can join your group, and selecting 'No' allows anyone to join your group.</p>
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
                <p className="create-club-tip-point tpmw-cc mb-one">Congratulations. You have successfully created a community group. Kindly proceed to your dashboard</p>
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
    const [locationObject, setLocationObject] = useState(null);

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
                        {step === 1 && <StepOne locationObject={locationObject} setLocationObject={setLocationObject}  />}
                        {step === 2 && <StepTwo />}
                        {step === 3 && <StepThree />}
                        {step === 4 && <StepFour />}
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
