import React from 'react';
import './BasketballBets.css';

const BasketballBets = ({ onBetClick, selectedBets }) => {
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
      date: "Mon. Jun 24, 22:00",
      marketName: "Winner (Incl. Overtime)",
      teams: [
        { name: "Toronto Raptors", odds: "1.78" },
        { name: "Houston Rockets", odds: "2.20" }
      ]
    },
    {
      date: "Tues. Jun 25, 20:30",
      marketName: "Winner (Incl. Overtime)",
      teams: [
        { name: "Boston Celtics", odds: "1.83" },
        { name: "Dallas Mavericks", odds: "2.03" }
      ]
    },
    {
      date: "Mon. Jun 25, 21:00",
      marketName: "Winner (Incl. Overtime)",
      teams: [
        { name: "Los Angeles Lakers", odds: "3.23" },
        { name: "Denver Nuggets", odds: "1.26" }
      ]
    },
    {
      date: "Tues. Jun 26, 20:00",
      marketName: "Winner (Incl. Overtime)",
      teams: [
        { name: "Phoenix Suns", odds: "1.06" },
        { name: "Washington Wizards", odds: "3.12" }
      ]
    }
  ];

  return (
    <div className="main-content basketball-bets-page">
      <h1>Basketball</h1>
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

export default BasketballBets;
