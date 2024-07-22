import React from 'react';
import './FootballBets.css';

const FootballBets = ({ onBetClick, selectedBets }) => {
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
      date: "Sun. Jul 7, 13:00",
      marketName: "Winner (Incl. Overtime and Penalties)",
      teams: [
        { name: "New England Patriots", odds: "1.80" },
        { name: "Kansas City Chiefs", odds: "2.10" }
      ]
    },
    {
      date: "Sun. Jul 7, 16:00",
      marketName: "Winner (Incl. Overtime and Penalties)",
      teams: [
        { name: "Green Bay Packers", odds: "1.70" },
        { name: "Chicago Bears", odds: "2.20" }
      ]
    },
    {
      date: "Mon. Jul 8, 19:00",
      marketName: "Winner (Incl. Overtime and Penalties)",
      teams: [
        { name: "Seattle Seahawks", odds: "1.85" },
        { name: "San Francisco 49ers", odds: "2.05" }
      ]
    },
    {
      date: "Mon. Jul 8, 21:00",
      marketName: "Winner (Incl. Overtime and Penalties)",
      teams: [
        { name: "Dallas Cowboys", odds: "1.90" },
        { name: "Philadelphia Eagles", odds: "2.00" }
      ]
    }
  ];

  return (
    <div className="main-content football-bets-page">
      <h1>Football</h1>
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

export default FootballBets;
