import React from 'react';
import './ValorantBets.css';

const ValorantBets = ({ onBetClick, selectedBets }) => {
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
      date: "Fri. Jul 14, 15:00",
      marketName: "Match Winner - Twoway",
      teams: [
        { name: "KRÜ Esports", odds: "1.68" },
        { name: "Cloud9 ", odds: "2.10" }
      ]
    },
    {
      date: "Sat. Jul 15, 17:00",
      marketName: "Match Winner - Twoway",
      teams: [
        { name: "Sentinels", odds: "1.59" },
        { name: "100 Thieves", odds: "2.27" }
      ]
    },
    {
      date: "Sun. Jul 16, 19:00",
      marketName: "Match Winner - Twoway",
      teams: [
        { name: "Team Heretics", odds: "1.29" },
        { name: "Team Vitality", odds: "3.41" }
      ]
    },
    {
      date: "Mon. Jul 17, 21:00",
      marketName: "Match Winner - Twoway",
      teams: [
        { name: "FUT Esports", odds: "2.15" },
        { name: "FNATIC", odds: "1.66" }
      ]
    }
  ];

  return (
    <div className="main-content valorant-bets-page">
      <h1>Valorant</h1>
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

export default ValorantBets;
