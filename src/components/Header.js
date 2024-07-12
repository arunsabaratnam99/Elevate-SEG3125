import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import DollarVector from './icons/DollarVector.svg';
import ProfileVector from './icons/ProfileVector.svg';

function Header({ isLoggedIn, openRegistrationPopup, openSignInPopup }) {
  return (
    <header className={`header ${isLoggedIn ? 'logged-in' : ''}`}>
      <div className="logo-wrapper">
        <div className="logo"><Link to="/">Elevate</Link></div>
      </div>
      {!isLoggedIn && (
        <div className="auth-buttons">
          <button className="login-button btn me-3" onClick={openSignInPopup}>Login</button>
          <button className="register-button btn" onClick={openRegistrationPopup}>Register</button>
        </div>
      )}
      {isLoggedIn && (
        <>
          <div className="wallet-container">
            <div className="wallet-amount">
              0.00 <img src={DollarVector} alt="Dollar Icon" />
            </div>
            <button className="wallet-button">Wallet</button>
          </div>
          <div className="profile-icon">
            <img src={ProfileVector} alt="Profile" />
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
