import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import Popup from './Popup';
import LiveSupport from './LiveSupport';

// Import icons
import BaccaratVector from './icons/BaccaratVector.svg';
import BaseballVector from './icons/BaseballVector.svg';
import BasketballVector from './icons/BasketballVector.svg';
import BlackjackVector from './icons/BlackjackVector.svg';
import CasinoVector from './icons/CasinoVector.svg';
import ChatVector from './icons/ChatVector.svg';
import Craps from './icons/Craps.svg';
import CricketVector from './icons/CricketVector.svg';
import CS2Vector from './icons/CS2Vector.svg';
import FootballVector from './icons/FootballVector.svg';
import HockeyVector from './icons/HockeyVector.svg';
import LanguageVector from './icons/LanguageVector.svg';
import LiveInGameVector from './icons/LiveInGameVector.svg';
import LiveVector from './icons/LiveVector.svg';
import LoLVector from './icons/LoLVector.svg';
import MyBetsVector from './icons/MyBetsVector.svg';
import PokerVector from './icons/PokerVector.svg';
import PromotionVector from './icons/PromotionVector.svg';
import RedeemVector from './icons/RedeemVector.svg';
import ReferVector from './icons/ReferVector.svg';
import RouletteVector from './icons/RouletteVector.svg';
import SearchVector from './icons/SearchVector.svg';
import SlotsVector from './icons/SlotsVector.svg';
import SoccerVector from './icons/SoccerVector.svg';
import SportsVector from './icons/SportsVector.svg';
import TableTennisVector from './icons/TableTennisVector.svg';
import TennisVector from './icons/TennisVector.svg';
import ValorantVector from './icons/ValorantVector.svg';
import VolleyballVector from './icons/VolleyballVector.svg';

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
    games: [
      { name: "Blackjack", icon: BlackjackVector },
      { name: "Baccarat", icon: BaccaratVector },
      { name: "Slots", icon: SlotsVector },
      { name: "Roulette", icon: RouletteVector },
      { name: "Poker", icon: PokerVector },
      { name: "Craps", icon: Craps }
    ],
    sportsList: [
      { name: "Basketball", icon: BasketballVector },
      { name: "Soccer", icon: SoccerVector },
      { name: "Hockey", icon: HockeyVector },
      { name: "Football", icon: FootballVector },
      { name: "Tennis", icon: TennisVector },
      { name: "Baseball", icon: BaseballVector },
      { name: "Cricket", icon: CricketVector },
      { name: "Volleyball", icon: VolleyballVector },
      { name: "Table Tennis", icon: TableTennisVector },
      { name: "Valorant", icon: ValorantVector },
      { name: "LoL", icon: LoLVector },
      { name: "CS2", icon: CS2Vector }
    ],
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
    games: [
      { name: "Blackjack", icon: BlackjackVector },
      { name: "Baccarat", icon: BaccaratVector },
      { name: "Machines à sous", icon: SlotsVector },
      { name: "Roulette", icon: RouletteVector },
      { name: "Poker", icon: PokerVector },
      { name: "Craps", icon: Craps }
    ],
    sportsList: [
      { name: "Basketball", icon: BasketballVector },
      { name: "Football", icon: SoccerVector },
      { name: "Hockey", icon: HockeyVector },
      { name: "Football américain", icon: FootballVector },
      { name: "Tennis", icon: TennisVector },
      { name: "Baseball", icon: BaseballVector },
      { name: "Cricket", icon: CricketVector },
      { name: "Volley-ball", icon: VolleyballVector },
      { name: "Tennis de table", icon: TableTennisVector },
      { name: "Valorant", icon: ValorantVector },
      { name: "LoL", icon: LoLVector },
      { name: "CS2", icon: CS2Vector }
    ],
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
    games: [
      { name: "Blackjack", icon: BlackjackVector },
      { name: "Baccarat", icon: BaccaratVector },
      { name: "Tragamonedas", icon: SlotsVector },
      { name: "Ruleta", icon: RouletteVector },
      { name: "Póker", icon: PokerVector },
      { name: "Craps", icon: Craps }
    ],
    sportsList: [
      { name: "Baloncesto", icon: BasketballVector },
      { name: "Fútbol", icon: SoccerVector },
      { name: "Hockey", icon: HockeyVector },
      { name: "Fútbol americano", icon: FootballVector },
      { name: "Tenis", icon: TennisVector },
      { name: "Béisbol", icon: BaseballVector },
      { name: "Críquet", icon: CricketVector },
      { name: "Voleibol", icon: VolleyballVector },
      { name: "Tenis de mesa", icon: TableTennisVector },
      { name: "Valorant", icon: ValorantVector },
      { name: "LoL", icon: LoLVector },
      { name: "CS2", icon: CS2Vector }
    ],
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

  const formatPath = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-');
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
              <img src={CasinoVector} alt="Casino Icon" className="nav-icon" />
              {t.casino}
            </div>
            <ul
              ref={casinoRef}
              className={`sub-nav ${expandedCategory === 'casino' ? 'expanded' : ''}`}
              style={{ height: expandedCategory === 'casino' ? subNavHeights.casino : 0 }}
            >
              {t.games.map((game, index) => (
                <li key={index}>
                  <img src={game.icon} alt={`${game.name} Icon`} className="sub-nav-icon" />
                  {game.name}
                </li>
              ))}
            </ul>
          </li>
          <li className="nav-item">
            <div
              className="nav-category-header"
              onClick={() => toggleCategory('sports')}
            >
              <img src={SportsVector} alt="Sports Icon" className="nav-icon" />
              {t.sports}
            </div>
            <ul
              ref={sportsRef}
              className={`sub-nav ${expandedCategory === 'sports' ? 'expanded' : ''}`}
              style={{ height: expandedCategory === 'sports' ? subNavHeights.sports : 0 }}
            >
              {t.sportsList.map((sport, index) => (
                <li key={index}>
                  <img src={sport.icon} alt={`${sport.name} Icon`} className="sub-nav-icon" />
                  <Link to={`/${formatPath(sport.name)}`}>{sport.name}</Link>
                </li>
              ))}
            </ul>
          </li>
          <div className="grouped-items">
            <li className="nav-item"><img src={LiveInGameVector} alt="Live In Game Icon" className="sub-nav-icon" />{t.liveInGame}</li>
            <li className="nav-item"><img src={MyBetsVector} alt="My Bets Icon" className="sub-nav-icon" /><Link to="/my-bets">{t.myBets}</Link></li>
          </div>
          
          <div className="grouped-items">
            <li className="nav-item"><img src={ChatVector} alt="Chat Icon" className="sub-nav-icon" /><Link to="/chat">{t.chat}</Link></li>
            <li className="nav-item" onClick={togglePopup}><img src={LiveVector} alt="Live Support Icon" className="sub-nav-icon" />{t.liveSupport}</li>
          </div>
          <div className="grouped-items">
            <li className="nav-item"><img src={PromotionVector} alt="Promotions Icon" className="sub-nav-icon" />{t.promotions}</li>
            <li className="nav-item"><img src={ReferVector} alt="Refer Icon" className="sub-nav-icon" />{t.refer}</li>
            <li className="nav-item"><img src={RedeemVector} alt="Redeem Icon" className="sub-nav-icon" />{t.redeem}</li>
          </div>
          <li className="nav-item">
            <div
              className="nav-category-header"
              onClick={toggleLanguage}
            >
              <img src={LanguageVector} alt="Language Icon" className="nav-icon" />
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
            <li className="nav-item"><img src={SearchVector} alt="Search Icon" className="sub-nav-icon" />{t.search}</li>
          </div>
        </ul>
      </nav>
      {isPopupOpen && <Popup content={<LiveSupport />} handleClose={togglePopup} />}
    </aside>
  );
}

export default Sidebar;
