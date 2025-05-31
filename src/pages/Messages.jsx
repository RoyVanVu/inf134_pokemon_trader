import React, { useState } from "react";
import Topbar from "../components/Topbar";
import person1 from '../assets/person1.jpg';
import person2 from '../assets/person2.jpg';
import person3 from '../assets/person3.jpg';
import "../css/Messages.css";

const chatList = [
  {
    id: 1,
    name: "Ash Ketchup",
    avatar: person1,
    lastMessage: "Would you trade your Shiny Tyranitar?",
    time: "5m",
    messages: [
      {
        fromMe: false,
        text: "Hey, I saw you have a Shining Tyranitar card for trade. Would you be interested in trading for my Shining Gengar?"
      },
      {
        fromMe: false,
        text: "It's in mint condition. I can send you some close-up photos if you want"
      },
      {
        fromMe: true,
        text: "Hi there! I might be interested. What set is your Shining Gengar from?"
      }
    ],
    status: "Online"
  },
  {
    id: 2,
    name: "GymLeaderBrock",
    avatar: person2,
    lastMessage: "I'll be at the card shop on Saturday...",
    time: "4h",
    messages: [
      {
        fromMe: false,
        text: "I'll be at the card shop on Saturday if you want to meet up."
      },
      {
        fromMe: true,
        text: "Sounds good! See you there."
      }
    ],
    status: "Offline"
  },
  {
    id: 3,
    name: "UltraCollector",
    avatar: person3,
    lastMessage: "Do you have any Sword & Shield Ul...",
    time: "3h",
    messages: [
      {
        fromMe: false,
        text: "Do you have any Sword & Shield Ultra Rares for trade?"
      },
      {
        fromMe: true,
        text: "I have a few! Which ones are you looking for?"
      }
    ],
    status: "Online"
  }
];

function Messages() {
  const [selectedChatId, setSelectedChatId] = useState(chatList[0].id);
  const selectedChat = chatList.find(chat => chat.id === selectedChatId);

  return (
    <div>
      <Topbar showSearch={false} showFilters={false} />
      <div className="messages-page">
        <div className="messages-header-row">
          <h1 className="messages-header-title">Messages</h1>
        </div>
        <div className="messages-card-container">
          <div className="messages-container">
            {/* Sidebar */}
            <div className="messages-sidebar">
              <div className="messages-sidebar-header">
                <span className="messages-title">Messages</span>
                <button className="messages-edit-btn" title="Edit messages">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z"/></svg>
                </button>
              </div>
              <div className="messages-search-bar">
                <input type="text" placeholder="Search" className="messages-search-input" />
              </div>
              <div className="messages-chat-list">
                {chatList.map(chat => (
                  <div
                    key={chat.id}
                    className={`messages-chat-list-item${selectedChatId === chat.id ? " active" : ""}`}
                    onClick={() => setSelectedChatId(chat.id)}
                    tabIndex={0}
                    style={{ cursor: 'pointer' }}
                  >
                    <img src={chat.avatar} alt={chat.name} className="messages-chat-avatar" />
                    <div className="messages-chat-info">
                      <div className="messages-chat-name">{chat.name}</div>
                      <div className="messages-chat-last">{chat.lastMessage}</div>
                    </div>
                    <div className="messages-chat-time">{chat.time}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Main Chat Area */}
            <div className="messages-main">
              <div className="messages-main-header">
                <div className="messages-main-user">
                  <img src={selectedChat.avatar} alt={selectedChat.name} className="messages-main-avatar" />
                  <div className="messages-main-user-info">
                    <div className="messages-main-username">{selectedChat.name}</div>
                    <div className="messages-main-status">{selectedChat.status}</div>
                  </div>
                </div>
                <button className="offer-trade-btn messages-offer-btn">Offer Trade</button>
              </div>
              <div className="messages-main-body">
                {selectedChat.messages.map((msg, idx) => (
                  <div key={idx} className={`messages-bubble${msg.fromMe ? " from-me" : ""}`}>
                    {msg.text}
                  </div>
                ))}
              </div>
              <div className="messages-main-input-row">
                <button className="messages-attach-btn" title="Attach">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21.44 11.05l-9.19 9.19a5 5 0 0 1-7.07-7.07l9.19-9.19a3 3 0 0 1 4.24 4.24l-9.2 9.19a1 1 0 0 1-1.41-1.41l9.19-9.19"/></svg>
                </button>
                <input className="messages-main-input" placeholder="Type a message..." />
                <button className="messages-send-btn" title="Send">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;