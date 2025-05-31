import React, { useState } from "react";
import Topbar from "../components/Topbar";
import "../css/Offers.css";
import SabrinasGengar from '../assets/SabrinasGengar.jpg';
import shinningT from '../assets/shinningT.jpg';
import person1 from '../assets/person1.jpg';

const offerData = {
  sender: {
    name: "Ash Ketchup",
    avatar: person1,
    date: "Apr 10, 2:30 PM"
  },
  status: "Pending",
  theyOffered: {
    cardImage: SabrinasGengar,
    cardName: "Sabrina's Gengar",
    cardType: "Gym Heroes (G1)",
    condition: "Excellent"
  },
  yourCard: {
    cardImage: shinningT,
    cardName: "Shining Tyranitar",
    cardType: "Neo Destiny (N4)",
    condition: "Excellent"
  }
};

function Offers() {
  const [tab, setTab] = useState("incoming");

  return (
    <div>
      <Topbar showSearch={false} showFilters={false} />
      <div className="offers-centered-container">
        <div className="offers-header-row">
          <h1 className="offers-title">Trade Offers</h1>
          <button className="offer-trade-btn">Offer Trade</button>
        </div>
        <div className="offers-tabs">
          <button className={tab === "incoming" ? "active" : ""} onClick={() => setTab("incoming")}>Incoming <span className="tab-count">1</span></button>
          <button className={tab === "outgoing" ? "active" : ""} onClick={() => setTab("outgoing")}>Outgoing <span className="tab-count">1</span></button>
          <button className={tab === "completed" ? "active" : ""} onClick={() => setTab("completed")}>Completed</button>
        </div>
        {tab === "incoming" && (
          <div className="offer-card-centered">
            <div className="offer-card-container">
              <span className="offer-status pending offer-status-float">Pending</span>
              <div className="offer-card-header">
                <img src={offerData.sender.avatar} alt="avatar" className="offer-avatar" />
                <div className="offer-sender-info">
                  <span className="offer-sender-name">From: {offerData.sender.name}</span>
                  <span className="offer-date">{offerData.sender.date}</span>
                </div>
              </div>
              <div className="offer-card-body offer-card-body-split">
                <div className="offer-section">
                  <div className="offer-section-title">They Offered</div>
                  <div className="offer-card-preview">
                    <img src={offerData.theyOffered.cardImage} alt="card" className="offer-card-img" />
                    <div className="offer-card-details">
                      <div className="offer-card-name">{offerData.theyOffered.cardName}</div>
                      <div className="offer-card-type">{offerData.theyOffered.cardType}</div>
                      <span className="offer-card-badge excellent">{offerData.theyOffered.condition}</span>
                    </div>
                  </div>
                </div>
                <div className="offer-card-divider"></div>
                <div className="offer-section">
                  <div className="offer-section-title">For Your</div>
                  <div className="offer-card-preview">
                    <img src={offerData.yourCard.cardImage} alt="card" className="offer-card-img" />
                    <div className="offer-card-details">
                      <div className="offer-card-name">{offerData.yourCard.cardName}</div>
                      <div className="offer-card-type">{offerData.yourCard.cardType}</div>
                      <span className="offer-card-badge excellent">{offerData.yourCard.condition}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="offer-card-actions offer-card-actions-fullwidth">
                <button className="offer-btn accept">Accept</button>
                <button className="offer-btn decline">Decline</button>
                <button className="offer-btn message">Message</button>
              </div>
            </div>
          </div>
        )}
        {tab !== "incoming" && (
          <div className="offer-empty">No offers in this tab.</div>
        )}
      </div>
    </div>
  );
}

export default Offers;