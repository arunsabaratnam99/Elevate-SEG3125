import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import RegistrationPopup from './RegistrationPopup';
import SignInPopup from './SignInPopup';
import WalletPopup from './WalletPopup';
import DollarVector from './icons/DollarVector.svg';
import ProfileVector from './icons/ProfileVector.svg';

function Header({ isLoggedIn, onLoginSuccess, openRegistrationPopup, openSignInPopup, openWalletPopup, walletAmount }) {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const closeRegistrationPopup = () => setIsRegistrationOpen(false);
  const closeSignInPopup = () => setIsSignInOpen(false);

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
              {walletAmount.toFixed(2)} <img src={DollarVector} alt="Dollar Icon" />
            </div>
            <button className="wallet-button" onClick={openWalletPopup}>
              Wallet
            </button>
          </div>
          <div className="profile-icon">
            <img src={ProfileVector} alt="Profile" />
          </div>
        </>
      )}
      {isRegistrationOpen && <RegistrationPopup isOpen={isRegistrationOpen} onClose={closeRegistrationPopup} />}
      {isSignInOpen && <SignInPopup isOpen={isSignInOpen} onClose={closeSignInPopup} onLoginSuccess={onLoginSuccess} />}
    </header>
  );
}

export default Header;
