import React, { useContext, useState, useEffect } from "react";
import Topbar from "../components/Topbar";
import SearchBar from "../components/SearchBar";
import PokemonCardContainer from "../components/PokemonCardContainer";
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
import '../css/Search_card.css';

function Search_card() {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        forSale: 'all',
        price: 'all',
        rarity: 'all',
        condition: 'all'
    });

    // Sample card data
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
            cardName: "Shinning Tyranitar",
            cardType: "NEo Destiny (N4)",
            rarity: "Secret Rare",
            condition: "Mint",
            currentOffer: 299,
            cardImage: shinningT,
            userAvatar: person3,
            isFavorited: false
        },
        {
            id: 3,
            cardName: "Starmie V",
            cardType: "Astral Radiance Training Gallery",
            rarity: "Ultra Rare",
            condition: "Near Mint",
            currentOffer: 89,
            cardImage: starmieV,
            userAvatar: person2,
            isFavorited: true
        },
        {
            id: 4,
            cardName: "Shinning Magikarp",
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
            cardName: "Onnix",
            cardType: "Paldean Fates",
            rarity: "Common",
            condition: "Excellent",
            currentOffer: 450,
            cardImage: onnix,
            userAvatar: person5,
            isFavorited: false
        },
    ];

    useEffect(() => {
        const loadCards = async () => {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1000));
            setCards(sampleCards);
            setLoading(false);
        };

        loadCards();
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);
        // Add search logic here
    };

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
        // Add filter logic here
    };

    const handleFavoriteToggle = (cardId) => {
        setCards(prevCards => 
            prevCards.map(card => 
                card.id === cardId 
                    ? { ...card, isFavorited: !card.isFavorited }
                    : card
            )
        );
    };

    const filteredCards = cards.filter(card => {
        if (searchQuery && !card.cardName.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }
        return true;
    });

    if (loading) {
        return (
            <div>
                <Topbar showSearch={false} showFilters={false} />
                <div className="search-card-page loading">
                    <div className="loading-spinner"></div>
                    <p className="loading-text">Loading cards...</p>
                </div>
            </div>
        );
    }

    return (
        <div> 
            <Topbar showSearch={false} showFilters={false} />
            
            <div className="search-card-page">
                <div className="search-card-header">
                    <h1 className="search-card-title">Search Cards</h1>
                    
                    <SearchBar 
                        onSearch={handleSearch}
                        onFilterChange={handleFilterChange}
                        searchQuery={searchQuery}
                        filters={filters}
                    />
                    
                    <div className="search-results-info">
                        <h2 className="results-title">Results</h2>
                        <p className="results-count">{filteredCards.length} cards found</p>
                    </div>
                </div>

                <div className="cards-grid">
                    {filteredCards.map((card) => (
                        <PokemonCardContainer 
                            key={card.id} 
                            {...card} 
                            onFavoriteToggle={() => handleFavoriteToggle(card.id)}
                        />
                    ))}
                </div>

                {filteredCards.length === 0 && !loading && (
                    <div className="no-results">
                        <div className="no-results-icon">🃏</div>
                        <h3 className="no-results-title">No cards found</h3>
                        <p className="no-results-subtitle">Try adjusting your search or filters</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Search_card;