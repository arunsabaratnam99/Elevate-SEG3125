import React, { useState, useEffect } from 'react';
import './Popup.css';

const Popup = ({ content, handleClose }) => {
  const [hide, setHide] = useState(false);

  const handleAnimationEnd = () => {
    if (hide) {
      handleClose();
    }
  };

  const closePopup = () => {
    setHide(true);
  };

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closePopup();
      }
    });
  }, []);

  return (
    <div className="popup-overlay">
      <div 
        className={`popup-content ${hide ? 'hide' : ''}`} 
        onAnimationEnd={handleAnimationEnd}
      >
        <button className="popup-close" onClick={closePopup}>X</button>
        {content}
      </div>
    </div>
  );
};

export default Popup;
