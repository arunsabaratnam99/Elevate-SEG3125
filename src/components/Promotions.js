import React from 'react';
import './Promotions.css';
import { Link } from 'react-router-dom';

const Promotions = () => {
  return (
    <div className="main-content promotions-container">
      <section className="promotions-header-section">
        <div className="promotions-title">Promotions</div>
      </section>
      <section className="promotions-section">
        <div className="promotions-categories">
          <Link to="/casino" className="promotions-category promotions-casino">
            <div className="promotions-category-icon casino-icon"></div>
            <span>Casino</span>
            <div className="category-arrow">></div>
          </Link>
          <Link to="/sports" className="promotions-category promotions-sports">
            <div className="promotions-category-icon sports-icon"></div>
            <span>Sports</span>
            <div className="category-arrow">></div>
          </Link>
        </div>
      </section>
      <section className="latest-promotions-section">
        <div className="latest-promotions-title">Latest Promotions</div>
        <div className="latest-promotions-grid">
          <div className="promotion-item">
            <div className="promotion-icon sweet-bonanza-icon"></div>
            <div className="promotion-details">
              <div className="promotion-end-time">Ends at 6:00 PM 7/21/2024</div>
              <div className="promotion-title">Sweet Bonanza Prize Drops!</div>
            </div>
          </div>
          <div className="promotion-item">
            <div className="promotion-icon daily-races-icon"></div>
            <div className="promotion-details">
              <div className="promotion-end-time">Ends at 7:59 AM 12/31/2024</div>
              <div className="promotion-title">Stake's Daily Races</div>
            </div>
          </div>
          <div className="promotion-item">
            <div className="promotion-icon weekly-raffle-icon"></div>
            <div className="promotion-details">
              <div className="promotion-end-time">Ends at 8:00 AM 12/8/2024</div>
              <div className="promotion-title">Stake's Weekly Raffle</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Promotions;
