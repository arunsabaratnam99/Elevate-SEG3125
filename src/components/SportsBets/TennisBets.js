import React from 'react';
import './TennisBets.css';

const TennisBets = ({ onBetClick, selectedBets }) => {
  const handleClick = (player, odds, opponent, marketName, date) => {
    const isSelected = selectedBets.some((selectedBet) => selectedBet.team === player);
    if (isSelected) {
      const newSelectedBets = selectedBets.filter((selectedBet) => selectedBet.team !== player);
      onBetClick(newSelectedBets);
    } else {
      const newSelectedBets = [...selectedBets, { team: player, odds, opponent, marketName, date }];
      onBetClick(newSelectedBets);
    }
  };

  const betItems = [
    {
      date: "Mon. Jul 10, 15:00",
      marketName: "Winner",
      teams: [
        { name: "Novak Djokovic", odds: "1.45" },
        { name: "Roger Federer", odds: "2.90" }
      ]
    },
    {
      date: "Tue. Jul 11, 14:00",
      marketName: "Winner",
      teams: [
        { name: "Rafael Nadal", odds: "1.60" },
        { name: "Andy Murray", odds: "2.40" }
      ]
    },
    {
      date: "Wed. Jul 12, 16:00",
      marketName: "Winner",
      teams: [
        { name: "Serena Williams", odds: "1.50" },
        { name: "Naomi Osaka", odds: "2.75" }
      ]
    },
    {
      date: "Thu. Jul 13, 18:00",
      marketName: "Winner",
      teams: [
        { name: "Simona Halep", odds: "1.70" },
        { name: "Ashleigh Barty", odds: "2.20" }
      ]
    }
  ];

  return (
    <div className="main-content tennis-bets-page">
      <h1>Tennis</h1>
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

export default TennisBets;
