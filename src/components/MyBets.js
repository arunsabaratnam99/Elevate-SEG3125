import React from 'react';
import './MyBets.css';

const MyBets = ({ bets, onCashout }) => {
  const handleCashoutClick = (bet) => {
    onCashout(bet);
  };

  return (
    <div className="main-content my-bets-page">
      <h1>My Bets</h1>
      <div className="bets-grid">
        {bets.map((bet, index) => {
          console.log("Bet Object:", bet); // Log bet object here
          return (
            <div key={index} className="bet-card">
              <div className="bet-card-header">
                <div className="bet-date-time">{new Date().toLocaleString()}</div>
              </div>
              <div className="bet-details">
                <div className="teams">{bet.team} - {bet.opponent}</div>
                <div className="winner-betdetails">{bet.marketName}</div>
                <div className="team-winner">
                  <span>{bet.team}</span>
                  <span className="odds-my-bets">{bet.odds}</span>
                </div>
                <div className="bet-time">{bet.date}</div>
              </div>
              <hr className="hr-line" />
              <div className="bet-info">
                <div className="wager-info">
                  <div className="wager">Wager</div>
                  <div className="wager-amount">CA${bet.wager.toFixed(2)}</div>
                </div>
                <div className="return-info">
                  <div className="return">Return</div>
                  <div className="return-amount">CA${bet.returnAmount.toFixed(2)}</div>
                </div>
              </div>
              <button className="cashout-button" onClick={() => handleCashoutClick(bet)}>
                Cashout CA${(bet.wager * 0.9).toFixed(2)}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyBets;
