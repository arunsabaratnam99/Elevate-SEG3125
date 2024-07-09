import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import Popup from './Popup';
import LiveSupport from './LiveSupport';

const translations = {
  en: {
    casino: "Casino",
    sports: "Sports",
    liveInGame: "Live In Game",
    myBets: "My Bets",
    chat: "Chat",
    liveSupport: "Live Support",
    promotions: "Promotions",
    refer: "Refer",
    redeem: "Redeem",
    language: "English",
    search: "Search",
    games: ["Blackjack", "Baccarat", "Slots", "Roulette", "Poker", "Craps"],
    sportsList: ["Basketball", "Soccer", "Hockey", "Football", "Tennis", "Baseball", "Cricket", "Volleyball", "Table Tennis", "Valorant", "LoL", "CS2"],
  },
  fr: {
    casino: "Casino",
    sports: "Sports",
    liveInGame: "En Direct",
    myBets: "Mes Paris",
    chat: "Chat",
    liveSupport: "Support en Direct",
    promotions: "Promotions",
    refer: "Parrainer",
    redeem: "Échanger",
    language: "Français",
    search: "Rechercher",
    games: ["Blackjack", "Baccarat", "Machines à sous", "Roulette", "Poker", "Craps"],
    sportsList: ["Basketball", "Football", "Hockey", "Football américain", "Tennis", "Baseball", "Cricket", "Volley-ball", "Tennis de table", "Valorant", "LoL", "CS2"],
  },
  es: {
    casino: "Casino",
    sports: "Deportes",
    liveInGame: "En Vivo",
    myBets: "Mis Apuestas",
    chat: "Chat",
    liveSupport: "Soporte en Vivo",
    promotions: "Promociones",
    refer: "Referir",
    redeem: "Canjear",
    language: "Español",
    search: "Buscar",
    games: ["Blackjack", "Baccarat", "Tragamonedas", "Ruleta", "Póker", "Craps"],
    sportsList: ["Baloncesto", "Fútbol", "Hockey", "Fútbol americano", "Tenis", "Béisbol", "Críquet", "Voleibol", "Tenis de mesa", "Valorant", "LoL", "CS2"],
  },
};

function Sidebar() {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [subNavHeights, setSubNavHeights] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [expandedLanguage, setExpandedLanguage] = useState(false);

  const casinoRef = useRef(null);
  const sportsRef = useRef(null);
  const languageRef = useRef(null);

  useEffect(() => {
    setSubNavHeights({
      casino: casinoRef.current.scrollHeight,
      sports: sportsRef.current.scrollHeight,
      language: languageRef.current.scrollHeight,
    });
  }, []);

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const toggleLanguage = () => {
    setExpandedLanguage(!expandedLanguage);
  };

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    setExpandedLanguage(false);
  };

  const t = translations[selectedLanguage];

  return (
    <aside className="sidebar">
      <nav>
        <ul className="nav flex-column">
          <li className="nav-item">
            <div
              className="nav-category-header"
              onClick={() => toggleCategory('casino')}
            >
              {t.casino}
            </div>
            <ul
              ref={casinoRef}
              className={`sub-nav ${expandedCategory === 'casino' ? 'expanded' : ''}`}
              style={{ height: expandedCategory === 'casino' ? subNavHeights.casino : 0 }}
            >
              {t.games.map((game, index) => (
                <li key={index}>{game}</li>
              ))}
            </ul>
          </li>
          <li className="nav-item">
            <div
              className="nav-category-header"
              onClick={() => toggleCategory('sports')}
            >
              {t.sports}
            </div>
            <ul
              ref={sportsRef}
              className={`sub-nav ${expandedCategory === 'sports' ? 'expanded' : ''}`}
              style={{ height: expandedCategory === 'sports' ? subNavHeights.sports : 0 }}
            >
              {t.sportsList.map((sport, index) => (
                <li key={index}><Link to={`/${sport.toLowerCase()}`}>{sport}</Link></li>
              ))}
            </ul>
          </li>
          <div className="grouped-items">
            <li className="nav-item">{t.liveInGame}</li>
            <li className="nav-item"><Link to="/my-bets">{t.myBets}</Link></li>
          </div>
          <div className="grouped-items">
            <li className="nav-item"><Link to="/chat">{t.chat}</Link></li>
            <li className="nav-item" onClick={togglePopup}>{t.liveSupport}</li>
          </div>
          <div className="grouped-items">
            <li className="nav-item">{t.promotions}</li>
            <li className="nav-item">{t.refer}</li>
            <li className="nav-item">{t.redeem}</li>
          </div>
          <li className="nav-item">
            <div
              className="nav-category-header"
              onClick={toggleLanguage}
            >
              {t.language}
            </div>
            <ul
              ref={languageRef}
              className={`sub-nav ${expandedLanguage ? 'expanded' : ''}`}
              style={{ height: expandedLanguage ? subNavHeights.language : 0 }}
            >
              <li
                className={`language-item ${selectedLanguage === 'en' ? 'selected' : ''}`}
                onClick={() => handleLanguageChange('en')}
              >
                <span className="language-text">English</span> {selectedLanguage === 'en' && <span className="checkmark">✔</span>}
              </li>
              <li
                className={`language-item ${selectedLanguage === 'fr' ? 'selected' : ''}`}
                onClick={() => handleLanguageChange('fr')}
              >
                <span className="language-text">Français</span> {selectedLanguage === 'fr' && <span className="checkmark">✔</span>}
              </li>
              <li
                className={`language-item ${selectedLanguage === 'es' ? 'selected' : ''}`}
                onClick={() => handleLanguageChange('es')}
              >
                <span className="language-text">Español</span> {selectedLanguage === 'es' && <span className="checkmark">✔</span>}
              </li>
            </ul>
          </li>
          <div className="grouped-items">
            <li className="nav-item">{t.search}</li>
          </div>
        </ul>
      </nav>
      {isPopupOpen && <Popup content={<LiveSupport />} handleClose={togglePopup} />}
    </aside>
  );
}

export default Sidebar;
