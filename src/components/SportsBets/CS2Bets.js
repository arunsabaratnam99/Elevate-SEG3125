import React from 'react';
import './CS2Bets.css';

const CS2Bets = ({ onBetClick, selectedBets }) => {
  const handleClick = (team, odds, opponent, marketName) => {
    const isSelected = selectedBets.some((selectedBet) => selectedBet.team === team);
    if (isSelected) {
      const newSelectedBets = selectedBets.filter((selectedBet) => selectedBet.team !== team);
      onBetClick(newSelectedBets);
    } else {
      const newSelectedBets = [...selectedBets, { team, odds, opponent, marketName }];
      onBetClick(newSelectedBets);
    }
  };

  const betItems = [
    {
      date: "Fri. Jul 14, 18:00",
      marketName: "Match Winner - Twoway",
      teams: [
        { name: "Astralis", odds: "1.50" },
        { name: "NAVI", odds: "2.75" }
      ]
    },
    {
      date: "Sat. Jul 15, 20:00",
      marketName: "Match Winner - Twoway",
      teams: [
        { name: "G2 Esports", odds: "1.60" },
        { name: "Team Liquid", odds: "2.40" }
      ]
    },
    {
      date: "Sun. Jul 16, 22:00",
      marketName: "Match Winner - Twoway",
      teams: [
        { name: "FaZe Clan", odds: "1.70" },
        { name: "Vitality", odds: "2.20" }
      ]
    },
    {
      date: "Mon. Jul 17, 16:00",
      marketName: "Match Winner - Twoway",
      teams: [
        { name: "Heroic", odds: "1.85" },
        { name: "ENCE", odds: "2.10" }
      ]
    }
  ];

  return (
    <div className="main-content cs2-bets-page">
      <h1>CS:GO 2</h1>
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
                        onClick={() => handleClick(team.name, team.odds, betItem.teams.find(t => t.name !== team.name).name, betItem.marketName)}
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

export default CS2Bets;
