import React, { useState } from 'react';
import './App.css';
import './customScrollbar.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Homepage from './components/Homepage';
import BasketballBets from './components/SportsBets/BasketballBets';
import SoccerBets from './components/SportsBets/SoccerBets';
import HockeyBets from './components/SportsBets/HockeyBets';
import FootballBets from './components/SportsBets/FootballBets';
import TennisBets from './components/SportsBets/TennisBets';
import BaseballBets from './components/SportsBets/BaseballBets';
import CricketBets from './components/SportsBets/CricketBets';
import VolleyballBets from './components/SportsBets/VolleyballBets';
import TableTennisBets from './components/SportsBets/TableTennisBets';
import ValorantBets from './components/SportsBets/ValorantBets';
import LoLBets from './components/SportsBets/LoLBets';
import CS2Bets from './components/SportsBets/CS2Bets';
import MyBets from './components/MyBets';
import Chat from './components/Chat';
import RegistrationPopup from './components/RegistrationPopup';
import SignInPopup from './components/SignInPopup';
import WalletPopup from './components/WalletPopup';
import RedeemPopup from './components/RedeemPopup';
import ReferPopup from './components/ReferPopup';
import BetDetail from './components/BetDetail';
import Promotions from './components/Promotions';
import Blackjack from './components/CasinoGames/Blackjack';

function App() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('guest');
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [walletAmount, setWalletAmount] = useState(0.00);
  const [registeredCards, setRegisteredCards] = useState([]);
  const [selectedBets, setSelectedBets] = useState([]);
  const [myBets, setMyBets] = useState([]);
  const [isRedeemPopupOpen, setIsRedeemPopupOpen] = useState(false);
  const [isReferPopupOpen, setIsReferPopupOpen] = useState(false);

  const handleBetClick = (newSelectedBets) => {
    setSelectedBets(newSelectedBets);
  };

  const handleClearAllBets = () => {
    setSelectedBets([]);
  };

  const openRegistrationPopup = () => setIsRegistrationOpen(true);
  const closeRegistrationPopup = () => setIsRegistrationOpen(false);

  const openSignInPopup = () => setIsSignInOpen(true);
  const closeSignInPopup = () => setIsSignInOpen(false);

  const openWalletPopup = () => {
    if (isLoggedIn) {
      setIsWalletOpen(true);
    } else {
      alert("You need to be logged in to access the wallet.");
    }
  };
  
  const closeWalletPopup = () => setIsWalletOpen(false);

  const handleLoginSuccess = (loggedInUsername) => {
    setIsLoggedIn(true);
    setUsername(loggedInUsername);
    closeSignInPopup();
  };

  const handleSaveCard = (newCard) => {
    setRegisteredCards([...registeredCards, newCard]);
  };

  const handleDeposit = (amount) => {
    setWalletAmount((prevAmount) => parseFloat((prevAmount + amount).toFixed(2)));
  };

  const handleWithdraw = (withdrawalInfo) => {
    setWalletAmount((prevAmount) => parseFloat((prevAmount - withdrawalInfo.amount).toFixed(2)));
  };

  const handleCloseBet = (updatedBets) => {
    setSelectedBets(updatedBets);
  };

  const handlePlaceBets = (wagers) => {
    const totalWager = wagers.reduce((total, wager) => total + parseFloat(wager || 0), 0);
    setWalletAmount(walletAmount - totalWager);

    const placedBets = selectedBets.map((bet, index) => ({
      ...bet,
      wager: wagers[index],
      returnAmount: wagers[index] * bet.odds
    }));

    setMyBets([...myBets, ...placedBets]);
    setSelectedBets([]);
  };

  const handleCashout = (bet) => {
    const cashoutAmount = bet.wager * 0.9;
    setWalletAmount((prevAmount) => prevAmount + cashoutAmount);
    setMyBets((prevBets) => prevBets.filter((b) => b !== bet));
    alert(`Cashout successful! CA$${cashoutAmount.toFixed(2)} has been added to your wallet.`);
  };

  const openRedeemPopup = () => setIsRedeemPopupOpen(true);
  const closeRedeemPopup = () => setIsRedeemPopupOpen(false);

  const openReferPopup = () => setIsReferPopupOpen(true);
  const closeReferPopup = () => setIsReferPopupOpen(false);

  return (
    <div className="App">
      <Router>
        <Header
          isLoggedIn={isLoggedIn}
          openRegistrationPopup={openRegistrationPopup}
          openSignInPopup={openSignInPopup}
          onLoginSuccess={handleLoginSuccess}
          openWalletPopup={openWalletPopup}
          walletAmount={walletAmount}
          isBetDetailOpen={selectedBets.length > 0}
        />
        <div className="main-layout">
          <Sidebar
            className="sidebar"
            betslipOpen={selectedBets.length > 0}
            openRedeemPopup={openRedeemPopup}
            openReferPopup={openReferPopup}
            isLoggedIn={isLoggedIn}
          />
          <div className="content-container">
            <div className={`content ${selectedBets.length ? 'with-detail' : ''}`}>
              <Routes>
                <Route
                  path="/Elevate-SEG3125"
                  element={
                    <Homepage
                      openRegistrationPopup={openRegistrationPopup}
                      openWalletPopup={openWalletPopup}
                      isLoggedIn={isLoggedIn}
                    />
                  }
                />
                <Route path="/blackjack" element={<Blackjack  isLoggedIn={isLoggedIn} openRegistrationPopup={openRegistrationPopup}/>} /> 
                <Route path="/basketball" element={<BasketballBets onBetClick={handleBetClick} selectedBets={selectedBets} />} />
                <Route path="/soccer" element={<SoccerBets onBetClick={handleBetClick} selectedBets={selectedBets} />} />
                <Route path="/hockey" element={<HockeyBets onBetClick={handleBetClick} selectedBets={selectedBets} />} />
                <Route path="/football" element={<FootballBets onBetClick={handleBetClick} selectedBets={selectedBets} />} />
                <Route path="/tennis" element={<TennisBets onBetClick={handleBetClick} selectedBets={selectedBets} />} />
                <Route path="/baseball" element={<BaseballBets onBetClick={handleBetClick} selectedBets={selectedBets} />} />
                <Route path="/cricket" element={<CricketBets onBetClick={handleBetClick} selectedBets={selectedBets} />} />
                <Route path="/volleyball" element={<VolleyballBets onBetClick={handleBetClick} selectedBets={selectedBets} />} />
                <Route path="/table-tennis" element={<TableTennisBets onBetClick={handleBetClick} selectedBets={selectedBets} />} />
                <Route path="/valorant" element={<ValorantBets onBetClick={handleBetClick} selectedBets={selectedBets} />} />
                <Route path="/lol" element={<LoLBets onBetClick={handleBetClick} selectedBets={selectedBets} />} />
                <Route path="/cs2" element={<CS2Bets onBetClick={handleBetClick} selectedBets={selectedBets} />} />
                <Route path="/my-bets" element={<MyBets bets={myBets} onCashout={handleCashout} />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/promotions" element={<Promotions />} />
              </Routes>
            </div>
            {selectedBets.length > 0 && (
              <div className="bet-detail-container">
                <BetDetail
                  bets={selectedBets}
                  onClose={handleCloseBet}
                  onClearAll={handleClearAllBets}
                  isLoggedIn={isLoggedIn}
                  openRegistrationPopup={openRegistrationPopup}
                  walletAmount={walletAmount}
                  onPlaceBets={handlePlaceBets}
                />
              </div>
            )}
          </div>
        </div>
      </Router>
      {isRegistrationOpen && (
        <RegistrationPopup
          isOpen={isRegistrationOpen}
          onClose={closeRegistrationPopup}
          openSignInPopup={openSignInPopup}
        />
      )}
      {isSignInOpen && (
        <SignInPopup
          isOpen={isSignInOpen}
          onClose={closeSignInPopup}
          onLoginSuccess={handleLoginSuccess}
          openRegistrationPopup={openRegistrationPopup}
        />
      )}
      {isWalletOpen && (
        <WalletPopup
          isOpen={isWalletOpen}
          onClose={closeWalletPopup}
          walletAmount={walletAmount}
          registeredCards={registeredCards}
          onSaveCard={handleSaveCard}
          onDeposit={handleDeposit}
          onWithdraw={handleWithdraw}
        />
      )}
      {isRedeemPopupOpen && (
        <RedeemPopup
          isOpen={isRedeemPopupOpen}
          onClose={closeRedeemPopup}
        />
      )}
      {isReferPopupOpen && (
        <ReferPopup
          isOpen={isReferPopupOpen}
          onClose={closeReferPopup}
          username={username}
        />
      )}
    </div>
  );
}

export default App;
