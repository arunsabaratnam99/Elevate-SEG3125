import React from 'react';
import './HockeyBets.css';

const HockeyBets = ({ onBetClick, selectedBets }) => {
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
      date: "Mon. Jul 1, 19:00",
      marketName: "Winner (Incl. Overtime and Penalties)",
      teams: [
        { name: "Toronto Maple Leafs", odds: "1.85" },
        { name: "Montreal Canadiens", odds: "2.10" }
      ]
    },
    {
      date: "Tue. Jul 2, 20:00",
      marketName: "Winner (Incl. Overtime and Penalties)",
      teams: [
        { name: "Boston Bruins", odds: "1.75" },
        { name: "New York Rangers", odds: "2.20" }
      ]
    },
    {
      date: "Wed. Jul 3, 21:00",
      marketName: "Winner (Incl. Overtime and Penalties)",
      teams: [
        { name: "Chicago Blackhawks", odds: "1.95" },
        { name: "Detroit Red Wings", odds: "2.00" }
      ]
    },
    {
      date: "Thu. Jul 4, 22:00",
      marketName: "Winner (Incl. Overtime and Penalties)",
      teams: [
        { name: "Vancouver Canucks", odds: "1.80" },
        { name: "Calgary Flames", odds: "2.15" }
      ]
    }
  ];

  return (
    <div className="main-content hockey-bets-page">
      <h1>Hockey</h1>
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

export default HockeyBets;
