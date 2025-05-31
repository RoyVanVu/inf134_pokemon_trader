import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import '../css/PokemonCardContainer.css';

const PokemonCardContainer = ({ 
  cardImage = "https://via.placeholder.com/200x280/9333ea/ffffff?text=Pokemon+Card",
  cardName = "Pokemon Card",
  cardType = "Set Name",
  currentOffer = 0,
  userAvatar = "https://via.placeholder.com/40x40/6366f1/ffffff?text=U",
  rarity = "Common",
  condition = "Good",
  onFavorite,
  onCardClick
}) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    if (onFavorite) {
      onFavorite(!isFavorited);
    }
  };

  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick();
    }
  };

  const getRarityClass = (rarity) => {
    switch (rarity.toLowerCase()) {
      case 'holo rare':
        return 'badge-holo-rare';
      case 'rare':
        return 'badge-rare';
      case 'uncommon':
        return 'badge-uncommon';
      case 'common':
        return 'badge-common';
      default:
        return 'badge-default';
    }
  };

  const getConditionClass = (condition) => {
    switch (condition.toLowerCase()) {
      case 'excellent':
        return 'badge-excellent';
      case 'good':
        return 'badge-good';
      case 'fair':
        return 'badge-fair';
      case 'poor':
        return 'badge-poor';
      default:
        return 'badge-default';
    }
  };

  return (
    <div className="pokemon-card" onClick={handleCardClick}>
      {/* Card Image Container */}
      <div className="card-image-container">
        {/* Rarity and Condition Badges */}
        <div className="card-badges">
          <span className={`badge ${getRarityClass(rarity)}`}>
            {rarity}
          </span>
          <span className={`badge ${getConditionClass(condition)}`}>
            {condition}
          </span>
        </div>
        
        {/* Favorite Button */}
        <button 
          onClick={handleFavoriteClick}
          className="favorite-button"
        >
          <Heart 
            className={`favorite-icon ${isFavorited ? 'favorited' : 'not-favorited'}`}
          />
        </button>

        {/* Pokemon Card Image */}
        <div className="card-image-wrapper">
          <img 
            src={cardImage}
            alt={cardName}
            className="card-image"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/200x280/9333ea/ffffff?text=Pokemon+Card";
            }}
          />
        </div>

        {/* User Avatar */}
        <div className="user-avatar-container">
          <img 
            src={userAvatar}
            alt="User"
            className="user-avatar"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/40x40/6366f1/ffffff?text=U";
            }}
          />
        </div>
      </div>

      {/* Card Information */}
      <div className="card-info">
        {/* Card Name */}
        <h3 className="card-name">
          {cardName}
        </h3>
        
        {/* Card Type */}
        <p className="card-type">
          {cardType}
        </p>
        
        {/* Current Offer */}
        <div className="card-offer-container">
          <span className="card-offer-label">Current Offer:</span>
          <span className="card-offer-amount">
            ${currentOffer}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PokemonCardContainer;