import React, { useState, useEffect } from "react";
import CreateHeader from "../../components/header/CreateHeader";
import CreateFooter from "../../components/Footer/CreateFooter";
import CustomButton from "../../components/CustomButton/CustomButton";
import './CreateClub.css';

const CreateClub = () => {
    const [step, setStep] = useState(1);

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);

    return (
        <>
            <CreateHeader />
            
            <div className="create-club-container create-club-intro">
                <div className="create-club-intro-texts">
                    <p>Step </p>
                    <p>Tell us about your club</p>
                    <p>In this step, we will ask you about the type of online club you want to create on the website and whether members can join the entire club or just specific sections. Then, please provide the club's focus or theme.</p>
                </div>

                <div></div>
            </div>

            <CreateFooter>
                <CustomButton style="no-style" size="small" onClick={handleBack}>Back</CustomButton>
                <CustomButton style="default-style" size="small" onClick={handleNext}>Next</CustomButton>
            </CreateFooter>
        </>
    )
}

export default CreateClub
