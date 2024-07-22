import React, { useState } from 'react';
import './Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() !== "") {
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages([...messages, { text: newMessage, user: "You", time: timestamp, align: 'right' }]);
      setNewMessage("");

      // Add an automated response
      setTimeout(() => {
        const responseTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setMessages((prevMessages) => [...prevMessages, { text: "Message back", user: "System", time: responseTimestamp, align: 'left' }]);
      }, 1000); // 1 second delay for the response
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <div className="main-content chat-page">
      <h1>Chat</h1>
      <div className="messages">
        {messages.map((message, index) => (
          <div className={`message ${message.align}`} key={index}>
            <div className="message-header">
              <span className="message-user">{message.user}</span>
              <span className="message-time">{message.time}</span>
            </div>
            <div className="message-text">
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="message-form-container">
        <form className="message-form" onSubmit={handleSubmit}>
          <textarea
            className="message-input"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
          />
        </form>
      </div>
    </div>
  );
};

export default Chat;
