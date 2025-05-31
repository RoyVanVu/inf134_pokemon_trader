import React, { useState } from 'react';
import '../css/Topbar.css';
import pokemonAvatar from "../assets/pokemonAvatar.jpg"

const Topbar = ({ 
  showSearch = true, 
  showFilters = true, 
  searchPlaceholder = "Search",
  onSearch,
  onFilterChange 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState(null);

  const filters = [
    { id: 'for-sale', label: 'For Sale', icon: '🏪' },
    { id: 'price', label: 'Price', icon: '💰' },
    { id: 'rarity', label: 'Rarity', icon: '💎' },
    { id: 'condition', label: 'Condition', icon: '⭐' }
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  const handleFilterClick = (filterId) => {
    const newActiveFilter = activeFilter === filterId ? null : filterId;
    setActiveFilter(newActiveFilter);
    if (onFilterChange) {
      onFilterChange(filterId, newActiveFilter !== null);
    }
  };

  return (
    <div className={`navigation-bar ${!showSearch ? 'no-search' : ''}`}>
      {/* Search Section - Conditional */}
      {showSearch && (
        <div className="search-container">
          <div className="search-input-wrapper">
            <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path 
                d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>
        </div>
      )}

      {/* Filters Section - Conditional */}
      {showFilters && (
        <div className="filters-container">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`filter-button ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => handleFilterClick(filter.id)}
            >
              <span className="filter-label">{filter.label}</span>
              <svg className="dropdown-icon" width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M6 9L12 15L18 9" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ))}
        </div>
      )}

      {/* Actions Section */}
      <div className="actions-container">
        {/* Messages Button */}
        <button className="action-button messages-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path 
              d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Notifications Button */}
        <button className="action-button notifications-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path 
              d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          <span className="notification-badge"></span>
        </button>

        {/* Avatar */}
        <div className="avatar-container">
          <img 
            src={pokemonAvatar}
            alt="User Avatar" 
            className="avatar"
          />
        </div>
      </div>
    </div>
  );
};

export default Topbar;