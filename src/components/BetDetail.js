import React, { useState, useEffect } from 'react';
import './BetDetail.css';
import MyBetsVector from './icons/MyBetsVector.svg'; 
import CloseVector from './icons/CloseVector.svg'; 
import DropdownVector from './icons/DropdownVector.svg'; 
import DollarVector from './icons/DollarVector.svg'; 

const BetDetail = ({ bets = [], onClose, onClearAll, isLoggedIn, openRegistrationPopup, walletAmount, onPlaceBets }) => {
  const [activeTab, setActiveTab] = useState('Single');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Accept Any Odds');
  const [wagers, setWagers] = useState(bets.map(() => 0.00));
  const [isVisible, setIsVisible] = useState(true);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  const handleWagerChange = (index, value) => {
    const newWagers = [...wagers];
    newWagers[index] = value ? parseFloat(value) : 0.00;
    setWagers(newWagers);
  };

  const calculatePayout = (wager, odds) => {
    const payout = wager * odds;
    return isNaN(payout) ? '0.00' : payout.toFixed(2);
  };

  const handleBetClose = (bet) => {
    const updatedBets = bets.filter((b) => b.team !== bet.team);
    onClose(updatedBets);
  };

  const handleClearAll = () => {
    onClearAll();
  };

  useEffect(() => {
    setWagers(bets.map(() => 0.00));
  }, [bets]);

  useEffect(() => {
    if (!isVisible) {
      const timer = setTimeout(() => {
        onClose([]);
      }, 300); 
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const handleBetButtonClick = () => {
    if (!isLoggedIn) {
      openRegistrationPopup();
    } else {
      let valid = true;
      let totalWager = 0;
      const newWagers = [...wagers];
  
      for (let i = 0; i < newWagers.length; i++) {
        if (newWagers[i] < 0.05) {
          valid = false;
          alert('All bets need to have a wager of at least 5 cents.');
          return;
        }
        totalWager += newWagers[i];
      }
  
      if (totalWager > walletAmount) {
        alert('Insufficient funds in wallet.');
        return;
      }
  
      if (valid) {
        onPlaceBets(newWagers);
        alert('Bets placed successfully!');
        setIsVisible(false);
      }
    }
  };

  return (
    <div className={`bet-detail-container ${!isVisible ? 'slide-out' : 'slide-in'}`}>
      <div className="bet-header-fixed">
        <div className="bet-slip-header">
          <div className="bet-slip-header-content">
            <img src={MyBetsVector} alt="My Bets" className="bet-slip-icon" />
            <span className="bet-slip-title">Bet Slip</span>
            <img
              src={CloseVector}
              alt="Close"
              className="bet-slip-close"
              onClick={() => setIsVisible(false)}
            />
          </div>
        </div>
        <div className="bet-slip-tabs">
          <button
            className={`bet-slip-tab ${activeTab === 'Single' ? 'active' : ''}`}
            onClick={() => handleTabClick('Single')}
          >
            Single
          </button>
          <button
            className={`bet-slip-tab ${activeTab === 'Multi' ? 'active' : ''}`}
            onClick={() => handleTabClick('Multi')}
          >
            Multi
          </button>
        </div>
        <hr className="hr-line-bet-slip" />
        <div className="bet-options">
          <div className="dropdown">
            <button className="dropbtn" onClick={toggleDropdown}>
              {selectedOption}
              <img src={DropdownVector} alt="Dropdown Icon" className="dropdown-icon" />
            </button>
            {dropdownOpen && (
              <div className="dropdown-content show">
                <a
                  href="#"
                  onClick={() => handleOptionClick('Accept Any Odds')}
                  className={selectedOption === 'Accept Any Odds' ? 'selected' : ''}
                >
                  Accept Any Odds
                </a>
                <a
                  href="#"
                  onClick={() => handleOptionClick('Accept Only Higher Odds')}
                  className={selectedOption === 'Accept Only Higher Odds' ? 'selected' : ''}
                >
                  Accept Only Higher Odds
                </a>
                <a
                  href="#"
                  onClick={() => handleOptionClick('No Odds Changes Accepted')}
                  className={selectedOption === 'No Odds Changes Accepted' ? 'selected' : ''}
                >
                  No Odds Changes Accepted
                </a>
              </div>
            )}
          </div>
          <span className="clear-all" onClick={handleClearAll}>
            Clear All
          </span>
        </div>
      </div>
      <div className="bet-detail-content-new">
        {bets.map((bet, index) => (
          <div key={index} className="bet-item-new">
            <div className="bet-card-header-new">
              <span>{bet.team} - {bet.opponent}</span>
              <img
                src={CloseVector}
                alt="Remove"
                className="bet-item-close-new"
                onClick={() => handleBetClose(bet)}
              />
            </div>
            <div className="bet-item-content-new">
              <span className="market-name">{bet.marketName}</span>
              <span className="max-bet"></span>
              <span className="outcome-name">{bet.team}</span>
              <span className="odds-payout">{bet.odds}</span>
              <div className="footer-bet">
                <div className="info-footer">
                  <label className="stacked">
                    <div className="input-wrap">
                      <div className="input-content">
                        <input
                          type="number"
                          value={wagers[index]}
                          onChange={(e) => handleWagerChange(index, e.target.value)}
                        />
                        <img src={DollarVector} alt="Dollar Icon" className="currency-icon-1" />
                      </div>
                    </div>
                  </label>
                </div>
                <span className="estimated-label">Est. Payout</span>
                <span className="estimated-amount">
                  <div className="currency-bet">
                    <span className="content-bet">
                      {calculatePayout(wagers[index], bet.odds)}
                    </span>
                    <img src={DollarVector} alt="Dollar Icon" className="currency-icon-2" />
                  </div>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bet-footer">
        <div className="bet-summary">
          <div className="bet-summary-item">
            <span className="bet-summary-label">Total Wager</span>
            <span className="bet-summary-label">Est. Payout</span>
          </div>
          <div className="bet-summary-item">
            <span className="bet-summary-value">
              {wagers.reduce((total, wager) => total + parseFloat(wager || 0), 0).toFixed(2)}
              <img src={DollarVector} alt="Dollar Icon" className="currency-icon" />
            </span>
            <span className="bet-summary-value">
              {wagers.reduce((total, wager, index) => total + (parseFloat(wager || 0) * (bets[index]?.odds || 0)), 0).toFixed(2)}
              <img src={DollarVector} alt="Dollar Icon" className="currency-icon" />
            </span>
          </div>
        </div>
        <button className="bet-button" onClick={handleBetButtonClick}>
          {isLoggedIn ? 'Bet' : 'Register to Bet'}
        </button>
      </div>
    </div>
  );
};

export default BetDetail;
