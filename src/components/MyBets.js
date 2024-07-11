import React from 'react';
import './MyBets.css';

const MyBets = () => {
  return (
    <div className="main-content my-bets-page">
      <h1>My Bets</h1>
      <div className="bets-grid">
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
        <div className="bet-card">
          <div className="bet-card-header">
            <div className="bet-date-time">2:45 PM 6/20/2024</div>
          </div>
          <div className="bet-details">
            <div className="teams">Los Angeles Lakers - Miami Heat</div>
            <div className="winner-betdetails">Winner (incl. overtime)</div>
            <div className="team-winner">
              <span>Los Angeles Lakers</span>
              <span className="odds">2.05</span>
            </div>
            <div className="bet-time">Sat, Jun 22 19:30</div>
          </div>
          <hr className="hr-line" />
          <div className="bet-info">
            <div className="wager-info">
              <div className="wager">Wager</div>
              <div className="wager-amount">CA$150</div>
            </div>
            <div className="return-info">
              <div className="return">Return</div>
              <div className="return-amount">CA$307.50</div>
            </div>
          </div>
          <button className="cashout-button">Cashout CA$135</button>
        </div>
        <div className="bet-card">
          <div className="bet-card-header">
            <div className="bet-date-time">4:30 PM 6/20/2024</div>
          </div>
          <div className="bet-details">
            <div className="teams">Golden State Warriors - Brooklyn Nets</div>
            <div className="winner-betdetails">Winner (incl. overtime)</div>
            <div className="team-winner">
              <span>Golden State Warriors</span>
              <span className="odds">1.90</span>
            </div>
            <div className="bet-time">Sun, Jun 23 21:00</div>
          </div>
          <hr className="hr-line" />
          <div className="bet-info">
            <div className="wager-info">
              <div className="wager">Wager</div>
              <div className="wager-amount">CA$200</div>
            </div>
            <div className="return-info">
              <div className="return">Return</div>
              <div className="return-amount">CA$380</div>
            </div>
          </div>
          <button className="cashout-button">Cashout CA$180</button>
        </div>
      </div>
    </div>
  );
};

export default MyBets;
