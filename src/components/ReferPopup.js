import React, { useState, useEffect } from 'react';
import './ReferPopup.css';
import ReferVector from './icons/ReferVector.svg';
import Chips from './img/ReferPicture.png';

const ReferPopup = ({ isOpen, onClose, username }) => {
  const [activeTab, setActiveTab] = useState('refer');
  const [referralLink, setReferralLink] = useState('');
  const [copyButtonText, setCopyButtonText] = useState('Copy Url');

  useEffect(() => {
    const cleanUsername = username.includes('@') ? username.split('@')[0] : username;
    setReferralLink(`https://elevate.com/?ref=${cleanUsername}`);
  }, [username]);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopyButtonText('Copied!');
      setTimeout(() => {
        setCopyButtonText('Copy Url');
      }, 2000);
    });
  };

  if (!isOpen) return null;

  return (
    <div className={`refer-popup ${isOpen ? 'open' : ''} ${activeTab === 'earnings' ? 'earnings-active' : ''}`}>
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
                  Share your promo code "<span className="promo-code-white">{username}</span>" with your friends,
                  they'll be rewarded with a free boost to level 1 rewards - and you'll receive
                  commission on all wagers, for life. <br/>Professional Publisher?
                  <br /><span className="join-link">Join Elevate Affiliates.</span>
                </p>
              </div>
              <div className="refer-image-container">
                <img src={Chips} alt="Chips" className="refer-image" />
              </div>
            </div>
          )}
          {activeTab === 'earnings' && (
            <div className="earnings-content">
              <div className="earnings-header-section">
                <div className="earnings-box-group">
                  <div className="earnings-container">
                    <div className="earnings-box full-width">
                      <p>Available Credit</p>
                      <div className="earnings-value">$0.00</div>
                      <button className="earnings-claim-btn">Claim</button>
                    </div>
                    <div className="earnings-box full-width">
                      <p>Lifetime Earnings</p>
                      <div className="earnings-value">$0.00</div>
                    </div>
                  </div>
                  <div className="earnings-container">
                    <div className="earnings-box full-width">
                      <p>Commission Tier</p>
                      <div className="tier-value">Tier 1</div>
                      <div className="commission-progress">
                        <div className="progress-bar">
                          <div className="progress" style={{ width: '5%' }}></div>
                        </div>
                        <div className="tier-labels">
                          <span>Tier 1: 5%</span>
                          <span>Tier 2: 6%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="earnings-stats-section full-width">
                <div className="stats-container">
                  <div className="stats-box-group">
                    <div className="stats-box">
                      <p>Referrals</p>
                      <div className="stats-value">0</div>
                    </div>
                    <div className="stats-box">
                      <p>Depositors</p>
                      <div className="stats-value">0</div>
                    </div>
                    <div className="stats-box">
                      <p>Deposits</p>
                      <div className="stats-value">0</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="referral-earnings-section">
                <div className="earnings-chart-header-section">
                  <p>Referral Earnings</p>
                  <div className="earnings-chart-controls">
                    <button className="earnings-chart-btn">30d</button>
                    <button className="earnings-chart-btn">14d</button>
                    <button className="earnings-chart-btn active">7d</button>
                  </div>
                </div>
                <div className="earnings-chart-section">
                  <div className="chart-placeholder">$1.00</div>
                  <div className="chart-placeholder">$0.80</div>
                  <div className="chart-placeholder">$0.60</div>
                  <div className="chart-placeholder">$0.40</div>
                  <div className="chart-placeholder">$0.20</div>
                  <div className="chart-placeholder">$0.00</div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'refer' && (
            <div className="refer-popup-link-container">
              <label htmlFor="referral-link">Share Your Referral Link</label>
              <div className="refer-popup-link">
                <input
                  type="text"
                  id="referral-link"
                  value={referralLink}
                  readOnly
                />
                <button className="refer-popup-copy-btn" onClick={handleCopyClick}>
                  {copyButtonText}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReferPopup;
