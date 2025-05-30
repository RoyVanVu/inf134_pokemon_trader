import React from 'react';
import { NavLink } from 'react-router-dom';
import { Map, Search, Gift, MessageCircle } from 'lucide-react';
import '../css/Navbar.css';

const Navbar = ({ activeItem = '' }) => {
  const navItems = [
    {
      id: 'nearby-traders',
      to: '/nearby-traders',
      icon: Map,
      text: 'Nearby Traders'
    },
    {
      id: 'search-cards',
      to: '/search-cards',
      icon: Search,
      text: 'Search Cards'
    },
    {
      id: 'offers',
      to: '/offers',
      icon: Gift,
      text: 'Offers'
    },
    {
      id: 'messages',
      to: '/messages',
      icon: MessageCircle,
      text: 'Messages'
    }
  ];

  return (
    <div className="navbar navbar-fade-in">
      {/* Header with Pokemon logo */}
      <div className="navbar-header">
        <div className="navbar-header-content">
          <NavLink to="/" className="navbar-logo-link">
            <div className="navbar-logo-text">
              Pokémon
            </div>
            <div className="navbar-pokemon-icon">
              <div className="pokemon-ball">
                <div className="pokemon-ball-highlight"></div>
              </div>
            </div>
          </NavLink>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="navbar-nav">
        <ul className="nav-list">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.id} className="nav-item">
                <NavLink
                  to={item.to}
                  className={({ isActive }) => 
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                >
                  <IconComponent className="nav-icon" />
                  <span className="nav-text">{item.text}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;