import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import RegistrationPopup from './RegistrationPopup';

function Header() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  const openRegistrationPopup = () => {
    setIsRegistrationOpen(true);
  };

  const closeRegistrationPopup = () => {
    setIsRegistrationOpen(false);
  };

  return (
    <header className="header d-flex justify-content-between align-items-center px-4">
      <div className="logo-wrapper">
        <div className="logo"><Link to="/">Elevate</Link></div>
      </div>
      <div className="auth-buttons">
        <button className="login-button btn me-3">Login</button>
        <button className="register-button btn" onClick={openRegistrationPopup}>Register</button>
      </div>
      {isRegistrationOpen && <RegistrationPopup isOpen={isRegistrationOpen} onClose={closeRegistrationPopup} />}
    </header>
  );
}

export default Header;
