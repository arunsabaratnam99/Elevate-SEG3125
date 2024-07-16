import React, { useState, useEffect } from 'react';
import './ReferPopup.css';
import ReferVector from './icons/ReferVector.svg';

const ReferPopup = ({ isOpen, onClose, username }) => {
  const [activeTab, setActiveTab] = useState('refer');
  const [referralLink, setReferralLink] = useState('');

  useEffect(() => {
    const cleanUsername = username.includes('@') ? username.split('@')[0] : username;
    setReferralLink(`https://elevate.com/?ref=${cleanUsername}`);
  }, [username]);

  if (!isOpen) return null;

  return (
    <div className={`refer-popup ${isOpen ? 'open' : ''}`}>
      <div className="refer-popup-content">
        <div className="refer-popup-header">
          <h2>
            <img src={ReferVector} alt="Refer" className="refer-popup-icon" /> Refer And Earn
          </h2>
          <button className="refer-popup-close-btn" onClick={onClose}>×</button>
        </div>
        <div className="refer-popup-tabs">
          <div
            className={`refer-popup-tab ${activeTab === 'refer' ? 'active' : ''}`}
            onClick={() => setActiveTab('refer')}
          >
            Refer Friends
          </div>
          <div
            className={`refer-popup-tab ${activeTab === 'earnings' ? 'active' : ''}`}
            onClick={() => setActiveTab('earnings')}
          >
            My Earnings
          </div>
          <div className="refer-popup-tab-fill" style={{ left: activeTab === 'refer' ? '0%' : '50%' }} />
        </div>
        <div className="refer-popup-body">
          {activeTab === 'refer' && (
            <div className="refer-friends-content">
              <div className="refer-text">
                <h3>Refer Your Friends</h3>
                <p>
                  Share your promo code "<span className="promo-code">{username}</span>" with your friends,
                  they'll be rewarded with a free boost to level 1 Roowards - and you'll receive
                  commission on all wagers, for life. Professional Publisher? Join Roobet Affiliates.
                </p>
              </div>
              <div className="refer-image-container">
                <img src="./icons/ChipVector.svg" alt="Chips" className="refer-image" />
              </div>
            </div>
          )}
          {activeTab === 'earnings' && (
            <div className="my-earnings-content">
              <p>Your earnings will be displayed here.</p>
            </div>
          )}
          <div className="refer-popup-link-container">
            <label htmlFor="referral-link">Share Your Referral Link</label>
            <input
              type="text"
              id="referral-link"
              value={referralLink}
              readOnly
            />
            <button className="refer-popup-copy-btn" onClick={() => navigator.clipboard.writeText(referralLink)}>
              Copy Url
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferPopup;
