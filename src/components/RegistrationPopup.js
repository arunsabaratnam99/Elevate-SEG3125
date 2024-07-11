import React, { useState } from 'react';
import './RegistrationPopup.css';
import googleLogo from './img/devicon_google.svg'; // Update path as needed
import facebookLogo from './img/logos_facebook.svg'; // Update path as needed
import twitchLogo from './img/logos_twitch.svg'; // Update path as needed
import visibleIcon from './img/VectorVisibleVector.svg'; // Update path as needed
import notVisibleIcon from './img/VectorNotVisibleVector.svg'; // Update path as needed

const RegistrationPopup = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevVisibility) => !prevVisibility);
  };

  if (!isOpen) return null;

  return (
    <div className="registration-popup">
      <div className="registration-popup-content">
        <div className="registration-popup-header">
          <h2>Create an Account</h2>
          <button className="registration-close-btn" onClick={onClose}>×</button>
        </div>
        <div className="registration-popup-body">
          <form id="registration-form" onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <div className="registration-step registration-step-active">
                <h3>Step 1/3: Fill out your details</h3>
                <label htmlFor="registration-email">Email <span>*</span></label>
                <input type="email" id="registration-email" name="email" required />
                <label htmlFor="registration-username">Username <span>*</span></label>
                <input type="text" id="registration-username" name="username" required />
                <span className="username-note">Your username must be 3-14 characters long.</span>
                <label htmlFor="registration-password">Password <span>*</span></label>
                <div className="password-input-container">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    id="registration-password"
                    name="password"
                    required
                  />
                  <img
                    src={isPasswordVisible ? visibleIcon : notVisibleIcon}
                    alt="Toggle visibility"
                    className="password-toggle-icon"
                    onClick={togglePasswordVisibility}
                  />
                </div>
                <label htmlFor="registration-dob">Date of Birth <span>*</span></label>
                <div className="dob-inputs">
                  <input type="text" placeholder="DD" maxLength="2" required />
                  <select required>
                    <option value="" disabled selected>Month</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    {/* Add other months */}
                  </select>
                  <input type="text" placeholder="YYYY" maxLength="4" required />
                </div>
                <label htmlFor="registration-phone">Phone (Optional)</label>
                <div className="phone-inputs">
                  <select className="country-code-select">
                    <option value="" disabled selected>Country code</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    {/* Add more country codes as needed */}
                  </select>
                  <input type="tel" placeholder="Phone number" />
                </div>
                <button type="button" className="registration-next-btn" onClick={handleNextStep}>Continue</button>
              </div>
            )}
            {currentStep === 2 && (
              <div className="registration-step registration-step-active">
                <h3>Step 2/3: Confirm your details</h3>
                <p>Review your details and confirm.</p>
                <button type="button" className="registration-back-btn" onClick={handlePrevStep}>Back</button>
                <button type="submit" className="registration-submit-btn">Register</button>
              </div>
            )}
          </form>
          <div className="or-divider">
            <hr />
            <span>OR</span>
            <hr />
          </div>
          <div className="reg-social-buttons">
            <button><img src={googleLogo} alt="Google" /></button>
            <button><img src={facebookLogo} alt="Facebook" /></button>
            <button><img src={twitchLogo} alt="Twitch" /></button>
          </div>
          <div className="sign-in-text">
            Already have an account? <a href="#">Sign In</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPopup;
