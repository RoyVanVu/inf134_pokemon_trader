import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import '../css/SearchBar.css';

const SearchBar = ({ onSearch, onFilterChange, searchQuery, filters }) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(localQuery);
  };

  const handleInputChange = (e) => {
    setLocalQuery(e.target.value);
    // Optional: Real-time search
    onSearch(e.target.value);
  };

  const handleFilterSelect = (filterType, value) => {
    onFilterChange(filterType, value);
  };

  return (
    <div className="search-bar-container">
      {/* Search Input */}
      <form onSubmit={handleSearchSubmit} className="search-form">
        <div className="search-input-wrapper">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search"
            value={localQuery}
            onChange={handleInputChange}
            className="search-input"
          />
        </div>
      </form>

      {/* Filter Dropdowns */}
      <div className="filters-container">
        {/* For Sale Filter */}
        <div className="filter-dropdown">
          <select 
            value={filters.forSale}
            onChange={(e) => handleFilterSelect('forSale', e.target.value)}
            className="filter-select"
          >
            <option value="all">For Sale</option>
            <option value="auction">Auction</option>
            <option value="buy-now">Buy Now</option>
            <option value="trade">Trade</option>
          </select>
          <ChevronDown className="dropdown-icon" size={16} />
        </div>

        {/* Price Filter */}
        <div className="filter-dropdown">
          <select 
            value={filters.price}
            onChange={(e) => handleFilterSelect('price', e.target.value)}
            className="filter-select"
          >
            <option value="all">Price</option>
            <option value="0-50">$0 - $50</option>
            <option value="50-100">$50 - $100</option>
            <option value="100-200">$100 - $200</option>
            <option value="200-500">$200 - $500</option>
            <option value="500+">$500+</option>
          </select>
          <ChevronDown className="dropdown-icon" size={16} />
        </div>

        {/* Rarity Filter */}
        <div className="filter-dropdown">
          <select 
            value={filters.rarity}
            onChange={(e) => handleFilterSelect('rarity', e.target.value)}
            className="filter-select"
          >
            <option value="all">Rarity</option>
            <option value="common">Common</option>
            <option value="uncommon">Uncommon</option>
            <option value="rare">Rare</option>
            <option value="holo-rare">Holo Rare</option>
            <option value="ultra-rare">Ultra Rare</option>
            <option value="secret-rare">Secret Rare</option>
          </select>
          <ChevronDown className="dropdown-icon" size={16} />
        </div>

        {/* Condition Filter */}
        <div className="filter-dropdown">
          <select 
            value={filters.condition}
            onChange={(e) => handleFilterSelect('condition', e.target.value)}
            className="filter-select"
          >
            <option value="all">Condition</option>
            <option value="mint">Mint</option>
            <option value="near-mint">Near Mint</option>
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
            <option value="damaged">Damaged</option>
          </select>
          <ChevronDown className="dropdown-icon" size={16} />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;