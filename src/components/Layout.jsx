import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import '../css/Layout.css';

const Layout = () => {
  const location = useLocation();
  
  // Map routes to navbar item IDs
  const getActiveItem = () => {
    const path = location.pathname;
    console.log('Current path:', path); // Debug log
    
    switch (path) {
      case '/':
      case '/nearby-traders':
        return 'nearby-traders';
      case '/search-cards':
        return 'search-cards';
      case '/offers':
        return 'offers';
      case '/messages':
        return 'messages';
      default:
        return 'nearby-traders'; 
    }
  };

  return (
    <div className="layout">
      {/* Main content area with proper spacing for navbar */}
      <div className="layout-content" style={{ paddingRight: '16rem' }}>
        <main className="main-content">
          <Outlet />
        </main>
      </div>
      
      {/* Right sidebar navigation */}
      <Navbar activeItem={getActiveItem()} />
    </div>
  );
};

export default Layout;