import React, { useState } from 'react';

const steps = [
    { name: 'Step 1', component: Step1 },
    { name: 'Step 2', component: Step2 },
    { name: 'Step 3', component: Step3 },
    // Add more steps here
];

function Modal() {
    const [currentStep, setCurrentStep] = useState(0);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const CurrentComponent = steps[currentStep].component;

    return (
        <div>
            <h1>{steps[currentStep].name}</h1>
            <CurrentComponent />
            <button disabled={currentStep === 0} onClick={handleBack}>Back</button>
            <button disabled={currentStep === steps.length - 1} onClick={handleNext}>Next</button>
        </div>
    );
}

export default Modal;


