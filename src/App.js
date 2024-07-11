import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Homepage from './components/Homepage';
import BasketballBets from './components/BasketballBets';
import MyBets from './components/MyBets';
import Chat from './components/Chat';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="main-layout">
          <Sidebar />
          <div className="content-container">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/basketball" element={<BasketballBets />} />
              <Route path="/my-bets" element={<MyBets />} />
              <Route path="/chat" element={<Chat />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
