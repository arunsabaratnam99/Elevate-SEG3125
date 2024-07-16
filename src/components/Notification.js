import React from 'react';
import './Notification.css';
import SuccessIcon from './icons/CheckmarkVector.svg'; // Replace with your icon paths
import ErrorIcon from './icons/ErrorVector.svg';

const Notification = ({ type, header, message, onClose }) => {
  return (
    <div className={`notification ${type}`}>
      <div className="notification-icon">
        <img src={type === 'success' ? SuccessIcon : ErrorIcon} alt="icon" />
      </div>
      <div className="notification-content">
        <div className="notification-header">{header}</div>
        <div className="notification-message">{message}</div>
      </div>
      <button className="notification-close" onClick={onClose}>×</button>
    </div>
  );
};

export default Notification;
