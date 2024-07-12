import React, { useState } from 'react';
import './RegistrationPopup.css';
import googleLogo from './img/devicon_google.svg'; // Update path as needed
import facebookLogo from './img/logos_facebook.svg'; // Update path as needed
import twitchLogo from './img/logos_twitch.svg'; // Update path as needed
import visibleIcon from './img/VectorVisibleVector.svg'; // Update path as needed
import notVisibleIcon from './img/VectorNotVisibleVector.svg'; // Update path as needed
import ArrowVector from './icons/ArrowVector.svg'; // Import the new arrow vector
import ErrorVector from './icons/ErrorVector.svg'; // Import the error vector

const RegistrationPopup = ({ isOpen, onClose, openSignInPopup }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    dob: { day: '', month: '', year: '' },
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    province: '',
    city: '',
    postalCode: '',
  });
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState({});

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validateUsername = (username) => {
    return username.length >= 3 && username.length <= 14;
  };

  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordPattern.test(password);
  };

  const validateDob = (dob) => {
    const { day, month, year } = dob;
    const date = new Date(`${year}-${month}-${day}`);
    return (
      date.getFullYear() === parseInt(year) &&
      date.getMonth() + 1 === parseInt(month) &&
      date.getDate() === parseInt(day)
    );
  };

  const validatePhoneNumber = (phoneNumber) => {
    return phoneNumber.length >= 10;
  };

  const handleNextStep = () => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!validateEmail(formData.email)) newErrors.email = 'Please include a "@" and a "." in your email address';
      if (!validateUsername(formData.username)) newErrors.username = 'Your username must be 3-14 characters long.';
      if (!validatePassword(formData.password)) newErrors.password = 'Your password must contain at least 1 letter, 1 number, and be 8 characters long.';
      if (!validateDob(formData.dob)) newErrors.dob = 'Please enter a valid date.';
    } else if (currentStep === 2) {
      if (!formData.firstName) newErrors.firstName = 'Please enter your first name.';
      if (!formData.lastName) newErrors.lastName = 'Please enter your last name.';
      if (!formData.city || !formData.province || !formData.postalCode) newErrors.location = 'Please fill out all the fields.';
    }

    if (Object.keys(newErrors).length === 0) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      setErrors(newErrors);
    }
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
      location: undefined,
    }));
  };

  const handleDobChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      dob: {
        ...prevData.dob,
        [name]: value,
      },
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      dob: undefined,
    }));
  };

  const handlePhoneNumberChange = (event) => {
    const input = event.target.value;
    if (input.startsWith(selectedCountryCode)) {
      setPhoneNumber(input);
    } else {
      setPhoneNumber(selectedCountryCode + input);
    }
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setFocused((prevFocused) => ({
      ...prevFocused,
      [name]: false,
    }));

    // Perform validation
    if (name === 'email' && !validateEmail(formData.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Please include a "@" and a "." in your email address',
      }));
    } else if (name === 'username' && !validateUsername(formData.username)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: 'Your username must be 3-14 characters long.',
      }));
    } else if (name === 'password' && !validatePassword(formData.password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Your password must contain at least 1 letter, 1 number, and be 8 characters long.',
      }));
    } else if ((name === 'day' || name === 'month' || name === 'year') && !validateDob(formData.dob)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        dob: 'Please enter a valid date.',
      }));
    } else if (name === 'firstName' && !formData.firstName) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        firstName: 'Please enter your first name.',
      }));
    } else if (name === 'lastName' && !formData.lastName) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        lastName: 'Please enter your last name.',
      }));
    } else if ((name === 'city' || name === 'province' || name === 'postalCode') && (!formData.city || !formData.province || !formData.postalCode)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        location: 'Please fill out all the fields.',
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

  const handleSignInClick = () => {
    onClose();
    openSignInPopup();
  };

  if (!isOpen) return null;

  return (
    <div className="registration-popup">
      <div className="registration-popup-content">
        <div className="registration-popup-header">
          {currentStep > 1 && (
            <button className="registration-back-btn" onClick={handlePrevStep}>
              <img src={ArrowVector} alt="Back" />
            </button>
          )}
          <h2>Create an Account</h2>
          <button className="registration-close-btn" onClick={onClose}>×</button>
        </div>
        <div className="registration-popup-body">
          <form id="registration-form" onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <div className="registration-step registration-step-active">
                <h3>Step 1/3: Fill out your details</h3>
                <label htmlFor="registration-email">Email <span>*</span></label>
                <input
                  type="email"
                  id="registration-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  className={errors.email ? (focused.email ? 'input-error-focused' : 'input-error') : ''}
                  required
                />
                {errors.email && (
                  <div className="error-message">
                    <img src={ErrorVector} alt="Error" className="error-icon" />
                    {errors.email}
                  </div>
                )}
                <label htmlFor="registration-username">Username <span>*</span></label>
                <input
                  type="text"
                  id="registration-username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  className={errors.username ? (focused.username ? 'input-error-focused' : 'input-error') : ''}
                  required
                />
                {errors.username && (
                  <div className="error-message">
                    <img src={ErrorVector} alt="Error" className="error-icon" />
                    {errors.username}
                  </div>
                )}
                <span className="username-note">Your username must be 3-14 characters long.</span>
                <label htmlFor="registration-password">Password <span>*</span></label>
                <div className="password-input-container">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    id="registration-password"
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
                    <img src={ErrorVector} alt="Error" className="error-icon" />
                    {errors.password}
                  </div>
                )}
                <label htmlFor="registration-dob">Date of Birth <span>*</span></label>
                <div className="dob-inputs">
                  <input
                    type="text"
                    placeholder="DD"
                    maxLength="2"
                    name="day"
                    value={formData.dob.day}
                    onChange={handleDobChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    className={errors.dob ? (focused.dob ? 'input-error-focused' : 'input-error') : ''}
                    required
                  />
                  <select
                    name="month"
                    value={formData.dob.month}
                    onChange={handleDobChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    className={errors.dob ? (focused.dob ? 'input-error-focused' : 'input-error') : ''}
                    required
                  >
                    <option value="" disabled selected>Month</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </select>
                  <input
                    type="text"
                    placeholder="YYYY"
                    maxLength="4"
                    name="year"
                    value={formData.dob.year}
                    onChange={handleDobChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    className={errors.dob ? (focused.dob ? 'input-error-focused' : 'input-error') : ''}
                    required
                  />
                </div>
                {errors.dob && (
                  <div className="error-message">
                    <img src={ErrorVector} alt="Error" className="error-icon" />
                    {errors.dob}
                  </div>
                )}
                <label htmlFor="registration-phone">Phone (Optional)</label>
                <div className="phone-inputs">
                  <select className="country-code-select">
                    <option value="" disabled selected>Country code</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+91">+91</option>
                    <option value="+61">+61</option>
                    <option value="+81">+81</option>
                    <option value="+49">+49</option>
                    <option value="+33">+33</option>
                    <option value="+39">+39</option>
                  </select>
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                  />
                </div>
                <button type="button" className="registration-next-btn" onClick={handleNextStep}>Continue</button>
              </div>
            )}
            {currentStep === 2 && (
              <div className="registration-step registration-step-active">
                <h3>Step 2/3: Fill out personal details</h3>
                <div className="name-inputs">
                  <div className="name-input">
                    <label htmlFor="registration-first-name">First Name <span>*</span></label>
                    <input
                      type="text"
                      id="registration-first-name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onFocus={handleFocus}
                      className={errors.firstName ? (focused.firstName ? 'input-error-focused' : 'input-error') : ''}
                      required
                    />
                    {errors.firstName && (
                      <div className="error-message">
                        <img src={ErrorVector} alt="Error" className="error-icon" />
                        {errors.firstName}
                      </div>
                    )}
                  </div>
                  <div className="name-input">
                    <label htmlFor="registration-last-name">Last Name <span>*</span></label>
                    <input
                      type="text"
                      id="registration-last-name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onFocus={handleFocus}
                      className={errors.lastName ? (focused.lastName ? 'input-error-focused' : 'input-error') : ''}
                      required
                    />
                    {errors.lastName && (
                      <div className="error-message">
                        <img src={ErrorVector} alt="Error" className="error-icon" />
                        {errors.lastName}
                      </div>
                    )}
                  </div>
                </div>
                <label htmlFor="registration-address">Address</label>
                <input
                  type="text"
                  id="registration-address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  className={errors.address ? (focused.address ? 'input-error-focused' : 'input-error') : ''}
                  required
                />
                {errors.address && (
                  <div className="error-message">
                    <img src={ErrorVector} alt="Error" className="error-icon" />
                    {errors.address}
                  </div>
                )}
                <div className="location-inputs">
                  <div className="location-input">
                    <label htmlFor="registration-city">City <span>*</span></label>
                    <input
                      type="text"
                      id="registration-city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onFocus={handleFocus}
                      className={errors.location ? (focused.city ? 'input-error-focused' : 'input-error') : ''}
                      required
                    />
                  </div>
                  <div className="location-input">
                    <label htmlFor="registration-province">Province <span>*</span></label>
                    <select
                      id="registration-province"
                      name="province"
                      value={formData.province}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onFocus={handleFocus}
                      className={errors.location ? (focused.province ? 'input-error-focused' : 'input-error') : ''}
                      required
                    >
                      <option value="" disabled selected>Province</option>
                      <option value="AB">Alberta</option>
                      <option value="BC">British Columbia</option>
                      <option value="MB">Manitoba</option>
                      <option value="NB">New Brunswick</option>
                      <option value="NL">Newfoundland and Labrador</option>
                      <option value="NS">Nova Scotia</option>
                      <option value="ON">Ontario</option>
                      <option value="PE">Prince Edward Island</option>
                      <option value="QC">Quebec</option>
                      <option value="SK">Saskatchewan</option>
                      <option value="NT">Northwest Territories</option>
                      <option value="NU">Nunavut</option>
                      <option value="YT">Yukon</option>
                    </select>
                  </div>
                  <div className="location-input">
                    <label htmlFor="registration-postal-code">Postal Code <span>*</span></label>
                    <input
                      type="text"
                      id="registration-postal-code"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onFocus={handleFocus}
                      className={errors.location ? (focused.postalCode ? 'input-error-focused' : 'input-error') : ''}
                      required
                    />
                  </div>
                </div>
                {errors.location && (
                  <div className="error-message-location">
                    <img src={ErrorVector} alt="Error" className="error-icon" />
                    {errors.location}
                  </div>
                )}
                <button type="button" className="registration-next-btn" onClick={handleNextStep}>Continue</button>
              </div>
            )}
            {currentStep === 3 && (
              <div className="registration-step registration-step-active">
                <h3>Step 3/3: Confirm your details</h3>
                <p>Please review your details and confirm your registration.</p>
                <div className="confirmation-box">
                  <ul>
                    <li><span className="label">Email:</span> <span className="value">{formData.email}</span></li>
                    <li><span className="label">Username:</span> <span className="value">{formData.username}</span></li>
                    <li><span className="label">Date of Birth:</span> <span className="value">{`${formData.dob.day}/${formData.dob.month}/${formData.dob.year}`}</span></li>
                    <li><span className="label">Phone:</span> <span className="value">{phoneNumber}</span></li>
                    <li><span className="label">First Name:</span> <span className="value">{formData.firstName}</span></li>
                    <li><span className="label">Last Name:</span> <span className="value">{formData.lastName}</span></li>
                    <li><span className="label">Address:</span> <span className="value">{formData.address}</span></li>
                    <li><span className="label">Province:</span> <span className="value">{formData.province}</span></li>
                    <li><span className="label">City:</span> <span className="value">{formData.city}</span></li>
                    <li><span className="label">Postal Code:</span> <span className="value">{formData.postalCode}</span></li>
                  </ul>
                </div>
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
            Already have an account? <a href="#" onClick={handleSignInClick}>Sign In</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPopup;
