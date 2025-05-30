import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Nearby_trader from './pages/Nearby_trader';
import Search_card from './pages/Search_card';
import Offers from './pages/Offers';
import Messages from './pages/Messages';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Nearby_trader />} />
            <Route path="nearby-traders" element={<Nearby_trader />} />
            <Route path="search-cards" element={<Search_card />} />
            <Route path="offers" element={<Offers />} />
            <Route path="messages" element={<Messages />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;