import { set } from 'mongoose';
import React, { useState } from 'react';
import { Button, ProgressBar } from 'react-bootstrap';

const MultiStep = ({ steps, handleSubmit, validateContent, validateOnchainAddress }) => {
    const [currentStep, setCurrentStep] = useState(1);

    const calculateProgress = () => {
        return (currentStep / steps.length) * 100;
    };


    const nextStep = () => {
        if (currentStep < steps.length) {

            if (validations[currentStep - 1]()) {

                setCurrentStep(prevStep => prevStep + 1);
            }
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(prevStep => prevStep - 1);
        }
    };

    const validateStep1 = () => {
        return validateContent();
    };

    const validateStep2 = () => {
        return validateOnchainAddress();
    };

    const validateStep3 = () => {

        return true;
    };

    const validateStep4 = () => {

        return true;
    };

    const validations = [validateStep1, validateStep2, validateStep3, validateStep4];

    const stepHeadlines = [
        "What do you want to inscribe?",
        "Choose receiver address",
        "Choose fee",
        "Summary"
    ];



    return (
        <div id='multistep-container'>
            <div id='steps-headline'>
                <h2>{stepHeadlines[currentStep - 1]}</h2>
            </div>
            <div className='multistep-progress m-3'>
                <ProgressBar now={calculateProgress()} label={`${calculateProgress()}%`} />
            </div>

            <div className='multistep-container-item'>
                {steps[currentStep - 1]}
            </div>
            <div className='multistep-buttons'>
                {currentStep > 1 &&
                    <Button
                        className='pay_button'
                        size="lg"
                        variant="secondary"
                        onClick={prevStep}
                    >Back</Button>}
                {currentStep < steps.length ? (
                    <button
                        onClick={nextStep}
                        className='pay_button'
                        size="lg"
                        variant="success"
                    >Next</button>
                ) : (
                    <button
                        className='pay_button'
                        onClick={handleSubmit}

                        size="lg"
                        variant="success"
                    >Submit & Pay</button>
                )}
            </div>
        </div>
    );
};

export default MultiStep;
