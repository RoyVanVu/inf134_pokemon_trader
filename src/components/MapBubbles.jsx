import React, { useState, useEffect, useRef } from 'react';
import person1 from '../assets/person1.jpg';
import person2 from '../assets/person2.jpg';
import person3 from '../assets/person3.jpg';
import person4 from '../assets/person4.jpg';
import person5 from '../assets/person5.jpg';
import { Star, X } from 'lucide-react';
import '../css/MapBubbles.css';

const getRandomDollarAmount = () => {
  return Math.floor(Math.random() * (150 - 20 + 1)) + 20;
};

const getRandomProfileImage = () => {
  const images = [person1, person2, person3, person4, person5];
  return images[Math.floor(Math.random() * images.length)];
};

const MapBubbles = ({ position, onNavigateToProfile }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const [userData] = useState(() => {
    return {
      username: `User${Math.floor(Math.random() * 1000)}`,
      rating: Math.floor(Math.random() * 5) + 1,
      completedTrades: Math.floor(Math.random() * 100),
      dollarAmount: getRandomDollarAmount(),
      profileImage: getRandomProfileImage()
    };
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  const handleBubbleClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = (e) => {
    e.stopPropagation();
    setIsModalOpen(false);
  };

  const handleProfileClick = (e) => {
    e.stopPropagation();
    if (onNavigateToProfile) {
      onNavigateToProfile(userData);
    }
  };

  return (
    <div className="map-bubble-container" style={{ left: position.x, top: position.y }}>
      <div className="map-bubble chat-bubble" onClick={handleBubbleClick}>
        <span className="bubble-dollar">${userData.dollarAmount}</span>
      </div>

      {isModalOpen && (
        <div className="bubble-modal" ref={modalRef} onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={handleCloseModal}>
            <X size={20} />
          </button>
          <div className="modal-content modal-content-row">
            <img 
              src={userData.profileImage}
              alt={userData.username}
              className="modal-avatar"
            />
            <div className="modal-userinfo">
              <h3 className="modal-username">{userData.username}</h3>
              <div className="modal-rating">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={20}
                    className={index < userData.rating ? 'star-filled' : 'star-empty'}
                  />
                ))}
              </div>
              <p className="modal-trades">
                Completed Trades: {userData.completedTrades}
              </p>
            </div>
          </div>
          <button 
            className="profile-button"
            onClick={handleProfileClick}
          >
            View Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default MapBubbles;