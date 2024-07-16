import React, { useState } from 'react';
import './RedeemPopup.css';
import RedeemVector from './icons/RedeemVector.svg'; // Ensure the correct path to the icon
import ErrorVector from './icons/ErrorVector.svg'; // Ensure the correct path to the icon
import RedeemPicture from './img/RedeemPicture.png'; // Ensure the correct path to the image

const RedeemPopup = ({ isOpen, onClose }) => {
  const [promoCode, setPromoCode] = useState('');
  const [error, setError] = useState('');

  const handleRedeem = () => {
    if (promoCode.trim()) {
      alert(`Promo code "${promoCode}" redeemed successfully!`);
      setPromoCode('');
      setError('');
      onClose();
    } else {
      setError('Please enter a valid promo code.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`redeem-popup ${isOpen ? 'open' : ''}`}>
      <div className="redeem-popup-content">
        <div className="redeem-popup-header">
          <h2>
            <img src={RedeemVector} alt="Redeem" className="redeem-popup-icon" /> Redeem Code
          </h2>
          <button className="redeem-popup-close-btn" onClick={onClose}>×</button>
        </div>
        <div className="redeem-popup-body">
          <div className="redeem-popup-left">
            <h3>Redeem awesome deals!</h3>
            <p>Unlock incredible rewards, elevate gaming, and maximize winnings today!</p>
            <label htmlFor="promo-code">Enter Promotional Code</label>
            <div className="redeem-popup-code-container">
              <input
                type="text"
                id="promo-code"
                value={promoCode}
                onChange={(e) => {
                  setPromoCode(e.target.value);
                  setError('');
                }}
                placeholder="Enter a code"
                className={error ? 'redeem-popup-input-error' : ''}
              />
              <button className="redeem-popup-redeem-btn" onClick={handleRedeem}>Redeem</button>
            </div>
            {error && (
              <div className="redeem-popup-error-message">
                <img src={ErrorVector} alt="Error" className="redeem-popup-error-icon" />
                {error}
              </div>
            )}
          </div>
          <div className="redeem-popup-right">
            <img src={RedeemPicture} alt="Redeem" className="redeem-popup-picture" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedeemPopup;
