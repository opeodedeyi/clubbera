import React, { useState, useEffect } from "react";
import CreateHeader from "../../components/header/CreateHeader";
import CreateFooter from "../../components/Footer/CreateFooter";
import CustomButton from "../../components/CustomButton/CustomButton";
import buildingblockImage from '../../assets/images/buildingblock.png';
import './CreateClub.css';


const StepOne = () => {
    return (
        <>
            <div className="create-club-intro-texts">
                <p className="create-club-steptitle">Step 1</p>
                <h2 className="create-club-header">Tell us about your club</h2>
                <p className="create-club-text">In this step, we will ask you about the type of online club you want to create on the website and whether members can join the entire club or just specific sections. Then, please provide the club's focus or theme.</p>
            </div>

            <div className="create-club-image">
                <img src={buildingblockImage} alt="buildingblockImage" />
            </div>
        </>
    );
}

const StepTwo = () => {
    return (
        <>
            <div className="create-club-form-content-two">
                <p className="create-club-formtitle">Public or private group?</p>
                <p className="create-club-text mb-one">Public or private group?</p>
            </div>
        </>
    );
}

const StepThree = () => {
    return (
        <>
            <div className="create-club-form-content">
                <p className="create-club-formtitle">What best describes what yourclub is about?</p>
            </div>
        </>
    );
}

const CreateClub = () => {
    const [step, setStep] = useState(1);

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);
    const handleSubmit = () => {
        // Logic to handle form submission
        console.log('Form submitted');
    }

    return (
        <>
            <CreateHeader />
            
            <form className="create-club-container create-club-intro">
                {step === 1 && <StepOne />}
                {step === 2 && <StepTwo />}
                {step === 3 && <StepThree />}
            </form>

            <CreateFooter>
                {step !== 6 ? (
                    <CustomButton style="default-style" size="small" onClick={handleNext}>
                        Next
                    </CustomButton>
                ) : (
                    <CustomButton style="default-style" size="small" onClick={handleSubmit}>
                        Submit
                    </CustomButton>
                )}
                {step !== 1 && (
                    <CustomButton style="no-style" size="small" onClick={handleBack}>Back</CustomButton>
                )}
            </CreateFooter>
        </>
    )
}

export default CreateClub
