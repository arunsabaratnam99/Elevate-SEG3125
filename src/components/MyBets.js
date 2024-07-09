import React from 'react';
import './MyBets.css';

const MyBets = () => {
  return (
    <div className="main-content my-bets-page">
      <h1>My Bets</h1>
      <div className="bet-card">
        <div className="bet-card-header">
          <div className="bet-date-time">1:39 AM 6/20/2024</div>
        </div>
        <div className="bet-details">
          <div className="teams">Edmonton Oilers - Florida Panthers</div>
          <div className="winner-betdetails">Winner (incl. overtime)</div>
          <div className="team-winner">
            <span>Edmonton Oilers</span>
            <span className="odds">1.80</span>
          </div>
          <div className="bet-time">Fri, Jun 21 20:00</div>
        </div>
        <hr className="hr-line" />
        <div className="bet-info">
          <div className="wager-info">
            <div className="wager">Wager</div>
            <div className="wager-amount">CA$100</div>
          </div>
          <div className="return-info">
            <div className="return">Return</div>
            <div className="return-amount">CA$180</div>
          </div>
        </div>
        <button className="cashout-button">Cashout CA$92</button>
      </div>
    </div>
  );
};

export default MyBets;
