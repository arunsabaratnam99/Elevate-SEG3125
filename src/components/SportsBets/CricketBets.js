import React from 'react';
import './CricketBets.css';

const CricketBets = ({ onBetClick, selectedBets }) => {
  const handleClick = (team, odds, opponent, marketName, date) => {
    const isSelected = selectedBets.some((selectedBet) => selectedBet.team === team);
    if (isSelected) {
      const newSelectedBets = selectedBets.filter((selectedBet) => selectedBet.team !== team);
      onBetClick(newSelectedBets);
    } else {
      const newSelectedBets = [...selectedBets, { team, odds, opponent, marketName, date }];
      onBetClick(newSelectedBets);
    }
  };

  const betItems = [
    {
      date: "Mon. Jul 10, 18:00",
      marketName: "Winner (Incl. Super Over)",
      teams: [
        { name: "India", odds: "1.60" },
        { name: "Australia", odds: "2.30" }
      ]
    },
    {
      date: "Tue. Jul 11, 14:00",
      marketName: "Winner (Incl. Super Over)",
      teams: [
        { name: "England", odds: "1.70" },
        { name: "South Africa", odds: "2.20" }
      ]
    },
    {
      date: "Wed. Jul 12, 16:00",
      marketName: "Winner (Incl. Super Over)",
      teams: [
        { name: "Pakistan", odds: "1.80" },
        { name: "New Zealand", odds: "2.10" }
      ]
    },
    {
      date: "Thu. Jul 13, 18:00",
      marketName: "Winner (Incl. Super Over)",
      teams: [
        { name: "Sri Lanka", odds: "1.90" },
        { name: "West Indies", odds: "2.00" }
      ]
    }
  ];

  return (
    <div className="main-content cricket-bets-page">
      <h1>Cricket</h1>
      <div className="bets-list">
        {betItems.map((betItem, index) => (
          <div className="bet-item" key={index}>
            <div className="bet-date">{betItem.date}</div>
            <div className="bet-teams">
              <div className="team-info">
                {betItem.teams.map((team, idx) => (
                  <div className="team" key={idx}>{team.name}</div>
                ))}
              </div>
              <div className="bet-odds-wrapper">
                <div className="bet-odds">
                  <div className="winner">{betItem.marketName}</div>
                  <div className="odds">
                    {betItem.teams.map((team, idx) => (
                      <div
                        className={`team-odds ${selectedBets.some((selectedBet) => selectedBet.team === team.name) ? 'selected' : ''}`}
                        onClick={() => handleClick(team.name, team.odds, betItem.teams.find(t => t.name !== team.name).name, betItem.marketName, betItem.date)}
                        key={idx}
                      >
                        <div className="odds-box">
                          <span className="team-name">{team.name}</span>
                          <span className="odds-value">{team.odds}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CricketBets;
