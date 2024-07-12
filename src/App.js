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
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const openRegistrationPopup = () => {
    setIsRegistrationOpen(true);
  };

  const closeRegistrationPopup = () => {
    setIsRegistrationOpen(false);
  };

  const openSignInPopup = () => {
    setIsSignInOpen(true);
  };

  const closeSignInPopup = () => {
    setIsSignInOpen(false);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    closeSignInPopup();
  };

  return (
    <div className="App">
      <Router>
        <Header 
          isLoggedIn={isLoggedIn}
          openRegistrationPopup={openRegistrationPopup}
          openSignInPopup={openSignInPopup}
          onLoginSuccess={handleLoginSuccess}
        />
        <div className="main-layout">
          <Sidebar />
          <div className="content-container">
            <Routes>
              <Route 
                path="/" 
                element={<Homepage openRegistrationPopup={openRegistrationPopup} />} 
              />
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
          openSignInPopup={openSignInPopup} // Pass the openSignInPopup function
        />
      )}
      {isSignInOpen && (
        <SignInPopup 
          isOpen={isSignInOpen} 
          onClose={closeSignInPopup} 
          onLoginSuccess={handleLoginSuccess}
          openRegistrationPopup={openRegistrationPopup} // Pass the openRegistrationPopup function
        />
      )}
    </div>
  );
}

export default App;
