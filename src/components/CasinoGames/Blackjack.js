import React, { useState, useEffect } from 'react';
import './Blackjack.css';
import DollarVector from '../icons/DollarVector.svg';
import BlackjackHandImage from '../img/BlackjackBackground.svg';
import BlackjackCardBack from '../icons/BlackjackCardBack.svg';
import { createDeck, dealInitialHands, dealCardToHand } from './BlackjackFunctionality';

const Blackjack = ({ openRegistrationPopup, isLoggedIn }) => {
  const [wager, setWager] = useState(0.00);
  const [gameState, setGameState] = useState('idle');
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [movingCard, setMovingCard] = useState(null);

  useEffect(() => {
    setDeck(createDeck());
  }, []);

  const handleWagerChange = (value) => {
    const parsedValue = parseFloat(value);
    if (isNaN(parsedValue) || parsedValue < 0) {
      setWager(0.00);
    } else {
      setWager(parsedValue);
    }
  };

  const handleHalfWager = () => {
    setWager((prevWager) => prevWager / 2);
  };

  const handleDoubleWager = () => {
    setWager((prevWager) => prevWager * 2);
  };

  const handleFocus = (event) => {
    event.target.select();
  };

  const handleBlur = (event) => {
    if (!event.target.value) {
      setWager(0.00);
    }
  };

  const startGame = () => {
    const newDeck = createDeck(); // Initialize the deck
    setDeck(newDeck);

    const { playerHand: initialPlayerHand, dealerHand: initialDealerHand, deck: remainingDeck } = dealInitialHands(newDeck);
    setPlayerHand(initialPlayerHand);
    setDealerHand(initialDealerHand);
    setDeck(remainingDeck);

    setGameState('dealing');
  };

  const dealCard = (toPlayer) => {
    const newDeck = [...deck];
    const card = newDeck.pop();
    setDeck(newDeck);
    setMovingCard(card);
    setTimeout(() => {
      if (toPlayer) {
        setPlayerHand((prevHand) => dealCardToHand(prevHand, newDeck));
      } else {
        setDealerHand((prevHand) => dealCardToHand(prevHand, newDeck));
      }
      setMovingCard(null);
    }, 1000);
  };

  const handleBetClick = () => {
    if (!isLoggedIn) {
      openRegistrationPopup();
    } else {
      startGame();
    }
  };

  return (
    <div className="main-content blackjack-page">
      <div className="blackjack-center-wrapper">
        <div className="blackjack-game-frame">
          <div className="blackjack-content">
            <div className="blackjack-sidebar">
              <div className="blackjack-stacked-items">
                <div className="blackjack-input-wrap">
                  <div className="blackjack-input-content">
                    <input
                      type="number"
                      min={0.00}
                      value={wager}
                      onChange={(e) => handleWagerChange(e.target.value)}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                    <img src={DollarVector} alt="Dollar Icon" className="blackjack-currency-icon-1" />
                  </div>
                  <div className="blackjack-input-buttons">
                    <button className="blackjack-input-button" onClick={handleHalfWager}>½</button>
                    <button className="blackjack-input-button double" onClick={handleDoubleWager}>2x</button>
                  </div>
                </div>
                <span className="blackjack-label-content">
                  <div className="blackjack-label-left-wrapper">
                    <span>Bet Amount</span>
                  </div>
                  <div className="blackjack-currency-conversion">
                    <div className="blackjack-currency-content">${wager.toFixed(2)}</div>
                  </div>
                </span>
              </div>
              <div className="blackjack-actions">
                <button className="blackjack-hit" disabled={gameState === 'idle'}>
                  <span>Hit</span>
                  <svg fill="currentColor" viewBox="0 0 64 64" className="blackjack-svg-icon hit" style={{ color: '#ff9d00' }}>
                    <path d="M52.615 44.136h4.272c1.138 0 1.992 1.425 1.138 2.28L43.502 62.931c-1.139 1.424-3.134 1.424-4.272 0L24.707 46.415c-.855-.854-.285-2.279 1.138-2.279h4.272c.854 0 1.424-.57 1.424-1.424V27.334c0-1.709 1.139-2.847 2.847-2.847h13.953c1.71 0 2.847 1.138 2.847 2.847v15.378c0 .854.57 1.424 1.425 1.424h.002ZM16.734 41.29c1.138-2.563 3.417-4.555 6.264-5.41v-8.827c0-6.264 5.126-11.39 11.39-11.39h2.563V2.847C36.951 1.138 35.813 0 34.104 0H8.474C6.766 0 5.627 1.138 5.627 2.847v42.432c0 1.709 1.139 2.847 2.847 2.847h7.69c-.57-2.279-.57-4.555.57-6.834v-.003Z"></path>
                  </svg>
                </button>
                <button className="blackjack-stand" disabled={gameState === 'idle'}>
                  <span>Stand</span>
                  <svg fill="currentColor" viewBox="0 0 64 64" className="blackjack-svg-icon stand" style={{ color: '#9000ff' }}>
                    <path d="M59.102 14.4c0-2.666-2.134-4.534-4.534-4.534-2.666 0-4.534 2.134-4.534 4.534V32h-5.866V4.534C44.168 1.868 42.034 0 39.634 0S35.1 2.134 35.1 4.534V32h-5.6V12c0-2.666-2.134-4.534-4.534-4.534-2.666 0-4.534 2.134-4.534 4.534v30.666l-7.2-7.2c-1.866-1.866-5.066-1.866-6.934 0-1.868 1.866-1.866 5.066 0 6.934l14.4 17.6c1.6 2.666 4.534 4 7.734 4h16.266c7.734 0 14.134-6.4 14.134-14.134l.266-35.466h.004Z"></path>
                  </svg>
                </button>
                <button className="blackjack-split" disabled={gameState === 'idle'}>
                  <span>Split</span>
                  <svg fill="currentColor" viewBox="0 0 64 64" className="blackjack-svg-icon split" style={{ color: 'inherit' }}>
                    <path d="m62.716 17.48-19.897-7.259c-1.075-.268-2.152.269-2.42 1.075l-8.334 23.66-8.335-23.66c-.268-.806-1.345-1.345-2.42-1.075l-19.897 7.26C.338 17.749-.2 18.826.068 19.9L11.63 52.704c.538.806 1.613 1.345 2.688 1.075l17.746-6.453 17.745 6.453c1.075.268 2.152-.269 2.42-1.075L63.788 19.9c.54-1.075 0-2.152-1.074-2.42h.002Z"></path>
                  </svg>
                </button>
                <button className="blackjack-double" disabled={gameState === 'idle'}>
                  <span>Double</span>
                  <svg fill="currentColor" viewBox="0 0 64 64" className="blackjack-svg-icon double" style={{ color: 'inherit' }}>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M18.285 6.994c6.454 0 12.1 3.497 15.327 8.605-8.337 4.303-14.252 13.177-14.252 23.125 0 1.614.27 3.227.539 4.572-.539.269-1.075.269-1.614.269C8.067 43.565 0 35.498 0 25.279 0 15.06 8.337 6.994 18.285 6.994ZM36.3 23.128c2.69-1.614 5.917-2.689 9.412-2.689l.002-.004C55.933 20.435 64 28.772 64 38.721c0 10.218-8.337 18.285-18.286 18.285-9.41 0-16.94-7.26-18.015-16.402-.268-.536-.268-1.343-.268-1.881 0-1.075 0-2.152.268-3.227.268-.268.268-.538.268-.807.269-1.077.539-2.152.807-2.958 0-.134.067-.269.134-.404.067-.134.134-.269.134-.403.168-.505.442-.905.69-1.265.147-.215.285-.415.385-.616.134-.135.269-.336.404-.538.134-.202.269-.403.403-.537.374-.188.619-.506.823-.773.09-.115.17-.221.252-.302.17-.17.34-.367.518-.574.386-.446.812-.94 1.363-1.308.135-.136.27-.203.405-.27.134-.068.269-.135.402-.268.27-.27.538-.471.807-.673.269-.202.537-.403.806-.672Z"></path>
                  </svg>
                </button>
              </div>
              <button className="blackjack-bet" onClick={handleBetClick}>Bet</button>
            </div>
            <div className="blackjack-game">
              <div className="blackjack-game-wrap">
                <div className="blackjack-dealer" style={{ '--card-ratio': '1.2em' }}>
                  <div className="blackjack-deck">
                    {movingCard && (
                      <div className="blackjack-deck-content" style={{ transform: 'translate(0, 12%)', transition: 'transform 1s' }}>
                        <div className="blackjack-deck-back" style={{ backgroundImage: `url(${BlackjackCardBack})` }}></div>
                      </div>
                    )}
                    <button className="blackjack-deck-wrap" disabled style={{ transform: 'translate(0, 10%)' }}>
                      <div className="blackjack-deck-horizontal" style={{ '--transition-time': '300ms' }}>
                        <div className="blackjack-deck-content" style={{ width: '5em', height: '7.9em', '--transition-time': '300ms' }}>
                          <div className="blackjack-deck-face none">
                            <div className="blackjack-deck-face-content" style={{ color: '#1a2c38' }}>
                              <span>A</span>
                              <svg fill="currentColor" viewBox="0 0 64 64" className="svg-icon" style={{}}>
                                <title></title>
                                <path d="M14.022 50.698.398 36.438A1.47 1.47 0 0 1 0 35.427c0-.395.152-.751.398-1.012l13.624-14.268c.249-.257.59-.417.967-.417.378 0 .718.16.967.417l13.625 14.268c.245.26.397.617.397 1.012 0 .396-.152.752-.397 1.013L15.957 50.698c-.25.257-.59.416-.968.416s-.718-.16-.967-.416Zm34.022 0L34.41 36.438a1.471 1.471 0 0 1-.398-1.012c0-.395.152-.751.398-1.012l13.633-14.268c.248-.257.589-.417.967-.417s.718.16.967.417l13.624 14.268c.246.26.398.617.398 1.012 0 .396-.152.752-.398 1.013L49.978 50.698c-.249.257-.59.416-.967.416-.378 0-.719-.16-.968-.416ZM44.541 62h.01c.685 0 1.239-.58 1.239-1.296 0-.36-.14-.686-.367-.92L32.871 46.657a1.206 1.206 0 0 0-.871-.375h-.04L27.335 62h17.207ZM32.963 32.965l13.624-14.25a1.47 1.47 0 0 0 .398-1.012 1.47 1.47 0 0 0-.398-1.013L32.963 2.422a1.334 1.334 0 0 0-.97-.422h-.03L26.51 16.229l5.455 17.156h.03c.38 0 .72-.16.968-.42Z"></path>
                                <path d="M31.028 2.424 17.404 16.683c-.245.26-.397.616-.397 1.012s.152.752.397 1.012l13.624 14.26c.24.253.568.412.934.421L31.963 2a1.33 1.33 0 0 0-.935.424Zm-12.45 57.36c-.228.234-.368.56-.368.92 0 .717.554 1.296 1.238 1.296h12.515l-.002-15.718c-.33.008-.625.15-.841.375L18.576 59.784Z"></path>
                              </svg>
                            </div>
                          </div>
                          <div className="blackjack-deck-back" style={{ backgroundImage: `url(${BlackjackCardBack})` }}></div>
                        </div>
                      </div>
                    </button>
                    <button className="blackjack-deck-wrap" disabled style={{ transform: 'translate(0, 8%)' }}>
                      <div className="blackjack-deck-horizontal" style={{ '--transition-time': '300ms' }}>
                        <div className="blackjack-deck-content" style={{ width: '5em', height: '7.9em', '--transition-time': '300ms' }}>
                          <div className="blackjack-deck-face none">
                            <div className="blackjack-deck-face-content" style={{ color: '#1a2c38' }}>
                              <span>A</span>
                              <svg fill="currentColor" viewBox="0 0 64 64" className="svg-icon" style={{}}>
                                <title></title>
                                <path d="M14.022 50.698.398 36.438A1.47 1.47 0 0 1 0 35.427c0-.395.152-.751.398-1.012l13.624-14.268c.249-.257.59-.417.967-.417.378 0 .718.16.967.417l13.625 14.268c.245.26.397.617.397 1.012 0 .396-.152.752-.397 1.013L15.957 50.698c-.25.257-.59.416-.968.416s-.718-.16-.967-.416Zm34.022 0L34.41 36.438a1.471 1.471 0 0 1-.398-1.012c0-.395.152-.751.398-1.012l13.633-14.268c.248-.257.589-.417.967-.417s.718.16.967.417l13.624 14.268c.246.26.398.617.398 1.012 0 .396-.152.752-.398 1.013L49.978 50.698c-.249.257-.59.416-.967.416-.378 0-.719-.16-.968-.416ZM44.541 62h.01c.685 0 1.239-.58 1.239-1.296 0-.36-.14-.686-.367-.92L32.871 46.657a1.206 1.206 0 0 0-.871-.375h-.04L27.335 62h17.207ZM32.963 32.965l13.624-14.25a1.47 1.47 0 0 0 .398-1.012 1.47 1.47 0 0 0-.398-1.013L32.963 2.422a1.334 1.334 0 0 0-.97-.422h-.03L26.51 16.229l5.455 17.156h.03c.38 0 .72-.16.968-.42Z"></path>
                                <path d="M31.028 2.424 17.404 16.683c-.245.26-.397.616-.397 1.012s.152.752.397 1.012l13.624 14.26c.24.253.568.412.934.421L31.963 2a1.33 1.33 0 0 0-.935.424Zm-12.45 57.36c-.228.234-.368.56-.368.92 0 .717.554 1.296 1.238 1.296h12.515l-.002-15.718c-.33.008-.625.15-.841.375L18.576 59.784Z"></path>
                              </svg>
                            </div>
                          </div>
                          <div className="blackjack-deck-back" style={{ backgroundImage: `url(${BlackjackCardBack})` }}></div>
                        </div>
                      </div>
                    </button>
                    <button className="blackjack-deck-wrap" disabled style={{ transform: 'translate(0, 6%)' }}>
                      <div className="blackjack-deck-horizontal" style={{ '--transition-time': '300ms' }}>
                        <div className="blackjack-deck-content" style={{ width: '5em', height: '7.9em', '--transition-time': '300ms' }}>
                          <div className="blackjack-deck-face none">
                            <div className="blackjack-deck-face-content" style={{ color: '#1a2c38' }}>
                              <span>A</span>
                              <svg fill="currentColor" viewBox="0 0 64 64" className="svg-icon" style={{}}>
                                <title></title>
                                <path d="M14.022 50.698.398 36.438A1.47 1.47 0 0 1 0 35.427c0-.395.152-.751.398-1.012l13.624-14.268c.249-.257.59-.417.967-.417.378 0 .718.16.967.417l13.625 14.268c.245.26.397.617.397 1.012 0 .396-.152.752-.397 1.013L15.957 50.698c-.25.257-.59.416-.968.416s-.718-.16-.967-.416Zm34.022 0L34.41 36.438a1.471 1.471 0 0 1-.398-1.012c0-.395.152-.751.398-1.012l13.633-14.268c.248-.257.589-.417.967-.417s.718.16.967.417l13.624 14.268c.246.26.398.617.398 1.012 0 .396-.152.752-.398 1.013L49.978 50.698c-.249.257-.59.416-.967.416-.378 0-.719-.16-.968-.416ZM44.541 62h.01c.685 0 1.239-.58 1.239-1.296 0-.36-.14-.686-.367-.92L32.871 46.657a1.206 1.206 0 0 0-.871-.375h-.04L27.335 62h17.207ZM32.963 32.965l13.624-14.25a1.47 1.47 0 0 0 .398-1.012 1.47 1.47 0 0 0-.398-1.013L32.963 2.422a1.334 1.334 0 0 0-.97-.422h-.03L26.51 16.229l5.455 17.156h.03c.38 0 .72-.16.968-.42Z"></path>
                                <path d="M31.028 2.424 17.404 16.683c-.245.26-.397.616-.397 1.012s.152.752.397 1.012l13.624 14.26c.24.253.568.412.934.421L31.963 2a1.33 1.33 0 0 0-.935.424Zm-12.45 57.36c-.228.234-.368.56-.368.92 0 .717.554 1.296 1.238 1.296h12.515l-.002-15.718c-.33.008-.625.15-.841.375L18.576 59.784Z"></path>
                              </svg>
                            </div>
                          </div>
                          <div className="blackjack-deck-back" style={{ backgroundImage: `url(${BlackjackCardBack})` }}></div>
                        </div>
                      </div>
                    </button>
                    <button className="blackjack-deck-wrap" disabled style={{ transform: 'translate(0, 4%)' }}>
                      <div className="blackjack-deck-horizontal" style={{ '--transition-time': '300ms' }}>
                        <div className="blackjack-deck-content" style={{ width: '5em', height: '7.9em', '--transition-time': '300ms' }}>
                          <div className="blackjack-deck-face none">
                            <div className="blackjack-deck-face-content" style={{ color: '#1a2c38' }}>
                              <span>A</span>
                              <svg fill="currentColor" viewBox="0 0 64 64" className="svg-icon" style={{}}>
                                <title></title>
                                <path d="M14.022 50.698.398 36.438A1.47 1.47 0 0 1 0 35.427c0-.395.152-.751.398-1.012l13.624-14.268c.249-.257.59-.417.967-.417.378 0 .718.16.967.417l13.625 14.268c.245.26.397.617.397 1.012 0 .396-.152.752-.397 1.013L15.957 50.698c-.25.257-.59.416-.968.416s-.718-.16-.967-.416Zm34.022 0L34.41 36.438a1.471 1.471 0 0 1-.398-1.012c0-.395.152-.751.398-1.012l13.633-14.268c.248-.257.589-.417.967-.417s.718.16.967.417l13.624 14.268c.246.26.398.617.398 1.012 0 .396-.152.752-.398 1.013L49.978 50.698c-.249.257-.59.416-.967.416-.378 0-.719-.16-.968-.416ZM44.541 62h.01c.685 0 1.239-.58 1.239-1.296 0-.36-.14-.686-.367-.92L32.871 46.657a1.206 1.206 0 0 0-.871-.375h-.04L27.335 62h17.207ZM32.963 32.965l13.624-14.25a1.47 1.47 0 0 0 .398-1.012 1.47 1.47 0 0 0-.398-1.013L32.963 2.422a1.334 1.334 0 0 0-.97-.422h-.03L26.51 16.229l5.455 17.156h.03c.38 0 .72-.16.968-.42Z"></path>
                                <path d="M31.028 2.424 17.404 16.683c-.245.26-.397.616-.397 1.012s.152.752.397 1.012l13.624 14.26c.24.253.568.412.934.421L31.963 2a1.33 1.33 0 0 0-.935.424Zm-12.45 57.36c-.228.234-.368.56-.368.92 0 .717.554 1.296 1.238 1.296h12.515l-.002-15.718c-.33.008-.625.15-.841.375L18.576 59.784Z"></path>
                              </svg>
                            </div>
                          </div>
                          <div className="blackjack-deck-back" style={{ backgroundImage: `url(${BlackjackCardBack})` }}></div>
                        </div>
                      </div>
                    </button>
                    <button className="blackjack-deck-wrap" disabled style={{ transform: 'translate(0, 2%)' }}>
                      <div className="blackjack-deck-horizontal" style={{ '--transition-time': '300ms' }}>
                        <div className="blackjack-deck-content" style={{ width: '5em', height: '7.9em', '--transition-time': '300ms' }}>
                          <div className="blackjack-deck-face none">
                            <div className="blackjack-deck-face-content" style={{ color: '#1a2c38' }}>
                              <span>A</span>
                              <svg fill="currentColor" viewBox="0 0 64 64" className="svg-icon" style={{}}>
                                <title></title>
                                <path d="M14.022 50.698.398 36.438A1.47 1.47 0 0 1 0 35.427c0-.395.152-.751.398-1.012l13.624-14.268c.249-.257.59-.417.967-.417.378 0 .718.16.967.417l13.625 14.268c.245.26.397.617.397 1.012 0 .396-.152.752-.397 1.013L15.957 50.698c-.25.257-.59.416-.968.416s-.718-.16-.967-.416Zm34.022 0L34.41 36.438a1.471 1.471 0 0 1-.398-1.012c0-.395.152-.751.398-1.012l13.633-14.268c.248-.257.589-.417.967-.417s.718.16.967.417l13.624 14.268c.246.26.398.617.398 1.012 0 .396-.152.752-.398 1.013L49.978 50.698c-.249.257-.59.416-.967.416-.378 0-.719-.16-.968-.416ZM44.541 62h.01c.685 0 1.239-.58 1.239-1.296 0-.36-.14-.686-.367-.92L32.871 46.657a1.206 1.206 0 0 0-.871-.375h-.04L27.335 62h17.207ZM32.963 32.965l13.624-14.25a1.47 1.47 0 0 0 .398-1.012 1.47 1.47 0 0 0-.398-1.013L32.963 2.422a1.334 1.334 0 0 0-.97-.422h-.03L26.51 16.229l5.455 17.156h.03c.38 0 .72-.16.968-.42Z"></path>
                                <path d="M31.028 2.424 17.404 16.683c-.245.26-.397.616-.397 1.012s.152.752.397 1.012l13.624 14.26c.24.253.568.412.934.421L31.963 2a1.33 1.33 0 0 0-.935.424Zm-12.45 57.36c-.228.234-.368.56-.368.92 0 .717.554 1.296 1.238 1.296h12.515l-.002-15.718c-.33.008-.625.15-.841.375L18.576 59.784Z"></path>
                              </svg>
                            </div>
                          </div>
                          <div className="blackjack-deck-back" style={{ backgroundImage: `url(${BlackjackCardBack})` }}></div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="blackjack-hands" style={{ '--hand-image': `url(${BlackjackHandImage})` }}>
                  <div className="blackjack-dealer-hands">
                    <div className="blackjack-hands-wrap"></div>
                  </div>
                  <div className="blackjack-player-hands">
                    <div className="blackjack-player-hands-wrap">
                      <div className="blackjack-hands-wrap"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="blackjack-footer">
            <div className="blackjack-options">
              <div className="blackjack-settings">
                <div className="blackjack-settings-icon tooltip">
                  <button className="blackjack-footer-button settings">
                    <svg fill="#B1BAD3" viewBox="0 0 64 64" className="blackjack-svg-icon">
                      <path d="M55.441 32a26.082 26.082 0 0 0-.34-3.99l.02.15 8.16-6-7.12-12.32-9.254 4.054a23.83 23.83 0 0 0-6.502-3.784l-.164-.056L39.121 0h-14.24l-1.12 10.054c-2.554.98-4.76 2.276-6.71 3.874l.042-.034L7.84 9.84.72 22.16l8.16 6a25.007 25.007 0 0 0-.32 3.828V32c.012 1.366.128 2.694.34 3.99l-.02-.15-8.16 6 7.12 12.32 9.254-4.054a23.83 23.83 0 0 0 6.502 3.784l.164.056L24.88 64h14.24l1.12-10.054c2.554-.98 4.76-2.276 6.71-3.874l-.042-.034 9.254 4.054 7.12-12.32-8.16-6c.192-1.146.308-2.474.32-3.828V32Zm-23.44 8.666A8.666 8.666 0 1 1 40.667 32c-.016 4.78-3.886 8.652-8.666 8.666H32h.002Z"></path>
                    </svg>
                  </button>
                  <span className="tooltip-text">Game Settings</span>
                </div>
              </div>
              <div className="blackjack-theatremode">
                <div className="blackjack-theatremode-icon tooltip">
                  <button className="blackjack-footer-button theatremode">
                    <svg fill="#B1BAD3" viewBox="0 0 64 64" className="blackjack-svg-icon">
                      <path d="M64 58.5H0v-53h64v53Zm-56-8h48v-37H8v37Z"></path>
                    </svg>
                  </button>
                  <span className="tooltip-text">Theatre Mode</span>
                </div>
              </div>
              <div className="blackjack-livestats"></div>
              <div className="blackjack-livestats-icon tooltip">
                <button className="blackjack-footer-button livestats">
                  <svg fill="#B1BAD3" viewBox="0 0 64 64" className="blackjack-svg-icon">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M33.013 19.707 64 0v12.64L30.987 33.627 18.133 18.853 0 30.693V17.947L20.107 4.853l12.906 14.854ZM16 64H5.333V35.173L16 28.213V64Zm13.707-21.653-3.04-3.52V64h10.666V37.493l-2.773 1.76-4.853 3.094ZM58.667 64H48V30.72l10.667-6.8V64Z"></path>
                  </svg>
                </button>
                <span className="tooltip-text">Live Stats</span>
              </div>
            </div>
            <div className="blackjack-logo">
              <div className="elevate-logo">Elevate</div>
            </div>
            <div className="blackjack-fairness">
              <button className="blackjack-footer-button fairness">
                Fairness
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blackjack;
