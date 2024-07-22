import React, { useState } from 'react';
import './LiveSupport.css';
import Popup from './Popup';
import homeIcon from './img/material-symbols_home.svg';
import messageIcon from './img/ic_baseline-message.svg';
import helpIcon from './img/material-symbols_help.svg';

const LiveSupport = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleOpenPopup = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  return (
    <div className="live-support">
      <div className="header-text">
        <h1>How can we help you?</h1>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search" />
        <button className="search-btn">→</button>
      </div>
      <div className="support-list-container">
        <ul className="support-list">
          <li>
            Support <span>></span>
          </li>
          <li>
            Verification <span>></span>
          </li>
          <li>
            Cash Out <span>></span>
          </li>
          <li>
            Deposit & Withdraw <span>></span>
          </li>
          <li>
            2FA Guide <span>></span>
          </li>
        </ul>
      </div>
      <div className="footer">
        <button>
          <img src={homeIcon} alt="Home Icon" />
          <span>Home</span>
        </button>
        <button>
          <img src={messageIcon} alt="Message Icon" />
          <span>Live Chat</span>
        </button>
        <button>
          <img src={helpIcon} alt="Help Icon" />
          <span>Help</span>
        </button>
      </div>
    </div>
  );
};

export default LiveSupport;
