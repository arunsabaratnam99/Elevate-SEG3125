import React from 'react';
import './BasketballBets.css';

const BasketballBets = () => {
  return (
    <div className="main-content basketball-bets-page">
      <h1>Basketball</h1>
      <div className="bets-list">
        <div className="bet-item">
          <div className="bet-date">Mon. Jun 24, 22:00</div>
          <div className="bet-teams">
            <div className="team-info">
              <div className="team">Toronto Raptors</div>
              <div className="team">Houston Rockets</div>
            </div>
            <div className="bet-odds-wrapper">
              <div className="bet-odds">
                <div className="winner">Winner (incl. overtime)</div>
                <div className="odds">
                  <div className="team-odds">
                    <div className="odds-box">
                      <span className="team-name">Toronto Raptors</span>
                      <span className="odds-value">1.78</span>
                    </div>
                  </div>
                  <div className="team-odds">
                    <div className="odds-box">
                      <span className="team-name">Houston Rockets</span>
                      <span className="odds-value">2.20</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketballBets;
