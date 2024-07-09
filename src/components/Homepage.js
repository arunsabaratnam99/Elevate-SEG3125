import React from 'react';
import './Homepage.css';
import placeholderImage from './img/gamblingthing.svg.svg'; // Ensure this path is correct based on your project structure
import googleLogo from './img/devicon_google.svg'; // Update path as needed
import facebookLogo from './img/logos_facebook.svg'; // Update path as needed
import twitchLogo from './img/logos_twitch.svg'; // Update path as needed
import applePayLogo from './img/logos_apple-pay.svg'; // Update path as needed
import visaLogo from './img/logos_visa.svg'; // Update path as needed
import googlePayLogo from './img/logos_google-pay.svg'; // Update path as needed
import mastercardLogo from './img/logos_mastercard.svg'; // Update path as needed
import samsungPayLogo from './img/simple-icons_samsungpay.svg'; // Update path as needed

const Homepage = () => {
  return (
    <div className="main-content">
      <div className="section">
        <div className="image-container">
          <img src={placeholderImage} alt="Placeholder" />
        </div>
        <div className="text-container">
          <h2>Play Smarter at Elevate</h2>
          <p>Join now</p>
          <button className="section-register-button">Register</button>
          <div className="continue-with">
            <hr />
            <p>Or Continue With</p>
            <hr />
          </div>
          <div className="social-buttons">
            <button className="social-button">
              <img src={googleLogo} alt="Google" className="social-logo" /> Google
            </button>
            <button className="social-button">
              <img src={facebookLogo} alt="Facebook" className="social-logo" /> Facebook
            </button>
            <button className="social-button">
              <img src={twitchLogo} alt="Twitch" className="social-logo" /> Twitch
            </button>
          </div>
        </div>
      </div>
      <div className="section payment-section">
        <div className="payment-options">
          <div className="payment-row">
            <img src={applePayLogo} alt="Apple Pay" className="payment-logo" />
            <img src={visaLogo} alt="Visa" className="payment-logo" />
            <img src={googlePayLogo} alt="Google Pay" className="payment-logo" />
          </div>
          <div className="payment-row">
            <img src={mastercardLogo} alt="MasterCard" className="payment-logo" />
            <img src={samsungPayLogo} alt="Samsung Pay" className="payment-logo" />
          </div>
        </div>
        <div className="deposit-container">
          <h2>Get Started Now</h2>
          <p>100% Deposit Bonus</p>
          <button className="deposit-button">Deposit</button>
        </div>
      </div>
      <div className="bottom-sections no-background">
        <div className="casino-container">
          <h2>Casino</h2>
          <p>Award winning games</p>
        </div>
        <div className="sportsbook-container">
          <h2>Sportsbook</h2>
          <p>Support your team</p>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
