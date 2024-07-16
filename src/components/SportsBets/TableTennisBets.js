import React from 'react';
import './TableTennisBets.css';

const TableTennisBets = ({ onBetClick, selectedBets }) => {
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
      date: "Fri. Jul 14, 10:00",
      marketName: "Winner",
      teams: [
        { name: "Ma Long", odds: "1.45" },
        { name: "Fan Zhendong", odds: "2.60" }
      ]
    },
    {
      date: "Sat. Jul 15, 12:00",
      marketName: "Winner",
      teams: [
        { name: "Tomokazu Harimoto", odds: "1.55" },
        { name: "Hugo Calderano", odds: "2.40" }
      ]
    },
    {
      date: "Sun. Jul 16, 14:00",
      marketName: "Winner",
      teams: [
        { name: "Dimitrij Ovtcharov", odds: "1.70" },
        { name: "Lin Gaoyuan", odds: "2.20" }
      ]
    },
    {
      date: "Mon. Jul 17, 16:00",
      marketName: "Winner",
      teams: [
        { name: "Timo Boll", odds: "1.85" },
        { name: "Jun Mizutani", odds: "2.10" }
      ]
    }
  ];

  return (
    <div className="main-content tabletennis-bets-page">
      <h1>Table Tennis</h1>
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

export default TableTennisBets;
