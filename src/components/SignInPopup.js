import React, { useState } from 'react';
import './SignInPopup.css';
import googleLogo from './img/devicon_google.svg';
import facebookLogo from './img/logos_facebook.svg';
import twitchLogo from './img/logos_twitch.svg';
import visibleIcon from './img/VectorVisibleVector.svg';
import notVisibleIcon from './img/VectorNotVisibleVector.svg';

const SignInPopup = ({ isOpen, onClose, onLoginSuccess, openRegistrationPopup }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  const validateEmailOrUsername = (value) => {
    return value.trim() !== '';
  };

  const validatePassword = (password) => {
    return password.trim() !== '';
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};

    if (!validateEmailOrUsername(formData.emailOrUsername)) {
      newErrors.emailOrUsername = 'Please enter your email or username.';
    }

    if (!validatePassword(formData.password)) {
      newErrors.password = 'Please enter your password.';
    }

    if (Object.keys(newErrors).length === 0) {
      alert('Sign In successful!');
      onLoginSuccess(); // Call the onLoginSuccess prop
      onClose(); // Close the popup
    } else {
      setErrors(newErrors);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevVisibility) => !prevVisibility);
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setFocused((prevFocused) => ({
      ...prevFocused,
      [name]: false,
    }));

    if (name === 'emailOrUsername' && !validateEmailOrUsername(formData.emailOrUsername)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emailOrUsername: 'Please enter your email or username.',
      }));
    } else if (name === 'password' && !validatePassword(formData.password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Please enter your password.',
      }));
    }
  };

  const handleFocus = (event) => {
    const { name } = event.target;
    setFocused((prevFocused) => ({
      ...prevFocused,
      [name]: true,
    }));
  };

  const handleRegisterClick = () => {
    onClose();
    openRegistrationPopup();
  };

  if (!isOpen) return null;

  return (
    <div className="sign-in-popup">
      <div className="sign-in-popup-content">
        <div className="sign-in-popup-header">
          <h2>Sign In</h2>
          <button className="sign-in-close-btn" onClick={onClose}>×</button>
        </div>
        <div className="sign-in-popup-body">
          <form id="sign-in-form" onSubmit={handleSubmit}>
            <label htmlFor="sign-in-email-or-username">Email or Username <span>*</span></label>
            <input
              type="text"
              id="sign-in-email-or-username"
              name="emailOrUsername"
              value={formData.emailOrUsername}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              className={errors.emailOrUsername ? (focused.emailOrUsername ? 'input-error-focused' : 'input-error') : ''}
              required
            />
            {errors.emailOrUsername && (
              <div className="error-message">
                {errors.emailOrUsername}
              </div>
            )}
            <label htmlFor="sign-in-password">Password <span>*</span></label>
            <div className="password-input-container">
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="sign-in-password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                className={errors.password ? (focused.password ? 'input-error-focused' : 'input-error') : ''}
                required
              />
              <img
                src={isPasswordVisible ? visibleIcon : notVisibleIcon}
                alt="Toggle visibility"
                className="password-toggle-icon"
                onClick={togglePasswordVisibility}
              />
            </div>
            {errors.password && (
              <div className="error-message">
                {errors.password}
              </div>
            )}
            <button type="submit" className="sign-in-btn">Sign In</button>
          </form>
          <div className="or-divider">
            <hr />
            <span>OR</span>
            <hr />
          </div>
          <div className="sign-in-social-buttons">
            <button><img src={googleLogo} alt="Google" /></button>
            <button><img src={facebookLogo} alt="Facebook" /></button>
            <button><img src={twitchLogo} alt="Twitch" /></button>
          </div>
          <div className="sign-in-footer">
            <a href="#" className="forgot-password">Forgot Password</a>
            <div>
              Don’t have an account? <a href="#" onClick={handleRegisterClick}>Register an Account</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPopup;
