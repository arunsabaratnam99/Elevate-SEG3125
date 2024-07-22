import React from 'react';
import './Promotions.css';
import SweetBonanza from './img/SweetBonanza.png';
import Timer from './img/Timer.png';
import Raffle from './img/Raffle.png';
import Conquer from './img/Conquer.png';
import ElevateVs from './img/ElevateVs.png';
import LevelUp from './img/LevelUp.png';
import CasinoIcon from './img/PromotionsCasino.png';
import SportsIcon from './img/PromotionsSports.png';

const Promotions = () => {
  const promotions = [
    {
      imgSrc: SweetBonanza,
      altText: 'Sweet Bonanza',
      endTime: 'Ends at 6:00 PM 7/21/2024',
      title: 'Sweet Bonanza Prize Drops!',
    },
    {
      imgSrc: Timer,
      altText: 'Daily Races',
      endTime: 'Ends at 7:59 AM 12/31/2024',
      title: "Elevate's Daily Races",
    },
    {
      imgSrc: Raffle,
      altText: 'Weekly Raffle',
      endTime: 'Ends at 8:00 AM 12/8/2024',
      title: "Elevate's Weekly Raffle",
    },
    {
      imgSrc: Conquer,
      altText: 'Conquer the Casino',
      endTime: 'Ends at 2:00 AM 7/26/2024',
      title: 'Conquer the Casino!',
    },
    {
      imgSrc: ElevateVs,
      altText: 'Elevate vs The World',
      endTime: 'Ends at 2:00 AM 7/22/2024',
      title: 'Elevate vs The World',
    },
    {
      imgSrc: LevelUp,
      altText: 'The Level Up',
      endTime: 'Ends at 2:00 AM 7/24/2024',
      title: 'The Level Up',
    },
  ];

  return (
    <div className="main-content promotions-container" role="main">
      <section className="promotions-header-section">
        <h1 className="promotions-title">Promotions</h1>
      </section>
      <section className="promotions-section">
        <div className="promotions-categories">
          <div className="promotions-category promotions-casino">
            <img src={CasinoIcon} alt="Casino" className="promotions-category-icon" />
            <span>Casino</span>
            <div className="category-arrow">></div>
          </div>
          <div className="promotions-category promotions-sports">
            <img src={SportsIcon} alt="Sports" className="promotions-category-icon" />
            <span>Sports</span>
            <div className="category-arrow">></div>
          </div>
        </div>
      </section>
      <section className="latest-promotions-section">
        <h2 className="latest-promotions-title">Latest Promotions</h2>
        <div className="latest-promotions-grid">
          {promotions.map((promotion, index) => (
            <article className="promotion-item" key={index}>
              <img className="promotion-icon" src={promotion.imgSrc} alt={promotion.altText} />
              <div className="promotion-content">
                <span className="promotion-end-time">{promotion.endTime}</span>
                <h3 className="promotion-title">{promotion.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Promotions;
