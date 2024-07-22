import React from 'react';
import './SoccerBets.css';

const SoccerBets = ({ onBetClick, selectedBets }) => {
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
      date: "Wed. Jun 27, 18:00",
      marketName: "1x2",
      teams: [
        { name: "Manchester United", odds: "1.50" },
        { name: "Chelsea FC", odds: "2.75" }
      ]
    },
    {
      date: "Thurs. Jun 28, 21:00",
      marketName: "1x2",
      teams: [
        { name: "Real Madrid", odds: "1.60" },
        { name: "Barcelona", odds: "2.45" }
      ]
    },
    {
      date: "Fri. Jun 29, 19:30",
      marketName: "1x2",
      teams: [
        { name: "Bayern Munich", odds: "1.30" },
        { name: "Borussia Dortmund", odds: "3.10" }
      ]
    },
    {
      date: "Sat. Jun 30, 20:00",
      marketName: "1x2",
      teams: [
        { name: "Paris Saint-Germain", odds: "1.40" },
        { name: "Lyon", odds: "2.90" }
      ]
    }
  ];

  return (
    <div className="main-content soccer-bets-page">
      <h1>Soccer</h1>
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

export default SoccerBets;
