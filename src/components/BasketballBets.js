import React, { useState } from 'react';
import './BasketballBets.css';

const BasketballBets = () => {
  const [selectedTeams, setSelectedTeams] = useState([]);

  const handleClick = (team) => {
    setSelectedTeams((prevSelectedTeams) =>
      prevSelectedTeams.includes(team)
        ? prevSelectedTeams.filter((t) => t !== team)
        : [...prevSelectedTeams, team]
    );
  };

  const betItems = [
    {
      date: "Mon. Jun 24, 22:00",
      teams: [
        { name: "Toronto Raptors", odds: "1.78" },
        { name: "Houston Rockets", odds: "2.20" }
      ]
    },
    {
      date: "Tues. Jun 25, 20:30",
      teams: [
        { name: "Boston Celtics", odds: "1.83" },
        { name: "Dallas Mavericks", odds: "2.03" }
      ]
    },
    {
      date: "Mon. Jun 25, 21:00",
      teams: [
        { name: "Los Angeles Lakers", odds: "3.23" },
        { name: "Denver Nuggets", odds: "1.26" }
      ]
    },
    {
      date: "Tues. Jun 26, 20:00",
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
                  <div className="winner">Winner (incl. overtime)</div>
                  <div className="odds">
                    {betItem.teams.map((team, idx) => (
                      <div
                        className={`team-odds ${selectedTeams.includes(team.name) ? 'selected' : ''}`}
                        onClick={() => handleClick(team.name)}
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
