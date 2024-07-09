import React, { useState } from 'react';
import './RegistrationPopup.css';

const RegistrationPopup = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Registration successful!');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="registration-popup">
      <div className="registration-popup-content">
        <div className="registration-popup-header">
          <h2>Register</h2>
          <button className="registration-close-btn" onClick={onClose}>×</button>
        </div>
        <div className="registration-popup-body">
          <form id="registration-form" onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <div className="registration-step registration-step-active">
                <h3>Step 1: Account Details</h3>
                <label htmlFor="registration-username">Username:</label>
                <input type="text" id="registration-username" name="username" required />
                <label htmlFor="registration-password">Password:</label>
                <input type="password" id="registration-password" name="password" required />
                <button type="button" className="registration-next-btn" onClick={handleNextStep}>Next</button>
              </div>
            )}
            {currentStep === 2 && (
              <div className="registration-step registration-step-active">
                <h3>Step 2: Personal Information</h3>
                <label htmlFor="registration-email">Email:</label>
                <input type="email" id="registration-email" name="email" required />
                <label htmlFor="registration-phone">Phone Number:</label>
                <input type="tel" id="registration-phone" name="phone" required />
                <button type="button" className="registration-back-btn" onClick={handlePrevStep}>Back</button>
                <button type="button" className="registration-next-btn" onClick={handleNextStep}>Next</button>
              </div>
            )}
            {currentStep === 3 && (
              <div className="registration-step registration-step-active">
                <h3>Step 3: Confirmation</h3>
                <p>Review your details and confirm.</p>
                <button type="button" className="registration-back-btn" onClick={handlePrevStep}>Back</button>
                <button type="submit" className="registration-submit-btn">Register</button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPopup;
