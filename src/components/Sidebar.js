import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import Popup from './Popup';
import LiveSupport from './LiveSupport';

function Sidebar() {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [subNavHeights, setSubNavHeights] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const casinoRef = useRef(null);
  const sportsRef = useRef(null);

  useEffect(() => {
    setSubNavHeights({
      casino: casinoRef.current.scrollHeight,
      sports: sportsRef.current.scrollHeight,
    });
  }, []);

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <aside className="sidebar">
      <nav>
        <ul className="nav flex-column">
          <li className="nav-item">
            <div
              className="nav-category-header"
              onClick={() => toggleCategory('casino')}
            >
              Casino
            </div>
            <ul
              ref={casinoRef}
              className={`sub-nav ${expandedCategory === 'casino' ? 'expanded' : ''}`}
              style={{ height: expandedCategory === 'casino' ? subNavHeights.casino : 0 }}
            >
              <li>Blackjack</li>
              <li>Baccarat</li>
              <li>Slots</li>
              <li>Roulette</li>
              <li>Poker</li>
              <li>Craps</li>
            </ul>
          </li>
          <li className="nav-item">
            <div
              className="nav-category-header"
              onClick={() => toggleCategory('sports')}
            >
              Sports
            </div>
            <ul
              ref={sportsRef}
              className={`sub-nav ${expandedCategory === 'sports' ? 'expanded' : ''}`}
              style={{ height: expandedCategory === 'sports' ? subNavHeights.sports : 0 }}
            >
              <li><Link to="/basketball">Basketball</Link></li>
              <li>Soccer</li>
              <li>Hockey</li>
              <li>Football</li>
              <li>Tennis</li>
              <li>Baseball</li>
              <li>Cricket</li>
              <li>Volleyball</li>
              <li>Table Tennis</li>
              <li>Valorant</li>
              <li>LoL</li>
              <li>CS2</li>
            </ul>
          </li>
          <div className="grouped-items">
            <li className="nav-item">Live In Game</li>
            <li className="nav-item"><Link to="/my-bets">My Bets</Link></li>
          </div>
          <div className="grouped-items">
            <li className="nav-item"><Link to="/chat">Chat</Link></li>
            <li className="nav-item" onClick={togglePopup}>Live Support</li>
          </div>
          <div className="grouped-items">
            <li className="nav-item">Promotions</li>
            <li className="nav-item">Refer</li>
            <li className="nav-item">Redeem</li>
          </div>
          <div className="grouped-items">
            <li className="nav-item">Language: English</li>
          </div>
          <div className="grouped-items">
            <li className="nav-item">Search</li>
          </div>
        </ul>
      </nav>
      {isPopupOpen && <Popup content={<LiveSupport />} handleClose={togglePopup} />}
    </aside>
  );
}

export default Sidebar;
