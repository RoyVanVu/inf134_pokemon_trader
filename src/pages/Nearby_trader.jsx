// pages/Nearby_trader.jsx
import React from "react";
import Topbar from "../components/Topbar";
import MapComponent from "../components/MapComponent";
import CardContainerNearby from "../components/Card_container_nearby";

function Nearby_trader() {
    return (
    <div className="nearby-traders-page">
      <Topbar />
      <MapComponent 
        center={[33.6405, -117.8389]} 
        zoom={15}
        markers={[
          {
            lat: 33.6405,
            lng: -117.8389,
            popup: "University of California, Irvine"
          }
        ]}
      />
      <CardContainerNearby />
      
      {/* Cards Grid Container */}
      {/* <div className="cards-grid">
        <PokemonCardContainer
          cardImage={SabrinasGengar}
          cardName="Sabrina's Gengar"
          cardType="Gym Heroes (G1)"
          currentOffer={142}
          userAvatar={person1}
          rarity="Holo Rare"
          condition="Excellent"
          onFavorite={(isFavorited) => console.log('Favorited:', isFavorited)}
          onCardClick={() => console.log('Card clicked')}
        />
        
        <PokemonCardContainer
          cardImage={SabrinasGengar}
          cardName="Another Gengar"
          cardType="Base Set"
          currentOffer={85}
          userAvatar={person1}
          rarity="Rare"
          condition="Good"
          onFavorite={(isFavorited) => console.log('Favorited:', isFavorited)}
          onCardClick={() => console.log('Card clicked')}
        />
        
        <PokemonCardContainer
          cardImage={SabrinasGengar}
          cardName="Test Card"
          cardType="Gym Challenge"
          currentOffer={203}
          userAvatar={person1}
          rarity="Holo Rare"
          condition="Excellent"
          onFavorite={(isFavorited) => console.log('Favorited:', isFavorited)}
          onCardClick={() => console.log('Card clicked')}
        />
      </div> */}
    </div>
    );
}

export default Nearby_trader;