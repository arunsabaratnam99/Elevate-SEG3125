import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Homepage from './components/Homepage';
import BasketballBets from './components/BasketballBets';
import MyBets from './components/MyBets';
import Chat from './components/Chat';
import RegistrationPopup from './components/RegistrationPopup';
import SignInPopup from './components/SignInPopup';
import WalletPopup from './components/WalletPopup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [walletAmount, setWalletAmount] = useState(0.00); // Initial wallet amount
  const [registeredCards, setRegisteredCards] = useState([]); // Registered cards state

  const openRegistrationPopup = () => setIsRegistrationOpen(true);
  const closeRegistrationPopup = () => setIsRegistrationOpen(false);

  const openSignInPopup = () => setIsSignInOpen(true);
  const closeSignInPopup = () => setIsSignInOpen(false);

  const openWalletPopup = () => setIsWalletOpen(true);
  const closeWalletPopup = () => setIsWalletOpen(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    closeSignInPopup();
  };

  const handleSaveCard = (newCard) => {
    setRegisteredCards([...registeredCards, newCard]);
  };

  const handleDeposit = (amount) => {
    setWalletAmount((prevAmount) => parseFloat((prevAmount + amount).toFixed(2)));
  };

  const handleWithdraw = ({ amount }) => {
    setWalletAmount((prevAmount) => parseFloat((prevAmount - amount).toFixed(2)));
  };

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
        />
        <div className="main-layout">
          <Sidebar />
          <div className="content-container">
            <Routes>
              <Route path="/" element={<Homepage openRegistrationPopup={openRegistrationPopup} />} />
              <Route path="/basketball" element={<BasketballBets />} />
              <Route path="/my-bets" element={<MyBets />} />
              <Route path="/chat" element={<Chat />} />
            </Routes>
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
    </div>
  );
}

export default App;
