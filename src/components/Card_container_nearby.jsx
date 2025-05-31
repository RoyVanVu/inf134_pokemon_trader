import React, { useState, useEffect } from 'react';
import '../css/Card_container_nearby.css';
import PokemonCardContainer from './PokemonCardContainer';
import SabrinasGengar from '../assets/SabrinasGengar.jpg';
import starmieV from '../assets/starmieV.jpg';
import shinningT from '../assets/shinningT.jpg';
import shinningM from '../assets/shinningM.jpg';
import onnix from '../assets/onnix.jpg';
import person1 from '../assets/person1.jpg';
import person2 from '../assets/person2.jpg';
import person3 from '../assets/person3.jpg';
import person4 from '../assets/person4.jpg';
import person5 from '../assets/person5.jpg';

const CardContainerNearby = ({ title = "Trending Cards For Trade" }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample card data - you can replace this with API calls later
  const sampleCards = [
    {
      id: 1,
      cardName: "Sabrina's Gengar",
      cardType: "Gym Heroes (G1)",
      rarity: "Holo Rare",
      condition: "Excellent",
      currentOffer: 142,
      cardImage: SabrinasGengar,
      userAvatar: person1,
      isFavorited: false
    },
    {
      id: 2,
      cardName: "Starmie",
      cardType: "Astral Radiance Training Gallery",
      rarity: "Ultra Rare",
      condition: "Mint",
      currentOffer: 299,
      cardImage: starmieV,
      userAvatar: person2,
      isFavorited: false
    },
    {
      id: 3,
      cardName: "Shining Tyranitar",
      cardType: "Neo Desitiny (N4)",
      rarity: "Secret Rare",
      condition: "Mint",
      currentOffer: 89,
      cardImage: shinningT,
      userAvatar: person3,
      isFavorited: true
    },
    {
      id: 4,
      cardName: "Shining Magikarp",
      cardType: "Neo Revelation (N3)",
      rarity: "Secret Rare",
      condition: "Excellent",
      currentOffer: 149,
      cardImage: shinningM,
      userAvatar: person4,
      isFavorited: false
    },
    {
      id: 5,
      cardName: "Onix",
      cardType: "Base Set",
      rarity: "Common",
      condition: "Excellent",
      currentOffer: 25,
      cardImage: onnix,
      userAvatar: person5,
      isFavorited: false
    },
  ];

  useEffect(() => {
    // Simulate loading data (replace with actual API call)
    const loadCards = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCards(sampleCards);
      setLoading(false);
    };

    loadCards();
  }, []);

  const handleFavoriteToggle = (cardId) => {
    setCards(prevCards => 
      prevCards.map(card => 
        card.id === cardId 
          ? { ...card, isFavorited: !card.isFavorited }
          : card
      )
    );
  };

  if (loading) {
    return (
      <div className="card-container_nearby loading">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading cards...</p>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="card-container_nearby">
        <div className="card-container_nearby-empty">
          <div className="empty-icon">🃏</div>
          <h3 className="empty-title">No cards found</h3>
          <p className="empty-subtitle">Try adjusting your search filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card-container_nearby">
      <div className="card-container_nearby-header">
        <h2 className="card-container_nearby-title">{title}</h2>
        <p className="card-container_nearby-subtitle">
          Viewed and saved the most in the area over the past 24 hours
        </p>
        <div className="card-container_nearby-results">
          {cards.length} results
        </div>
      </div>
      
      <div className="card-grid">
        {cards.map((card) => (
          <PokemonCardContainer 
            key={card.id} 
            {...card} 
            onFavoriteToggle={() => handleFavoriteToggle(card.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CardContainerNearby;