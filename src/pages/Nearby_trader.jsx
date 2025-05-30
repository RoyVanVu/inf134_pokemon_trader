import React, { useContext } from "react";
import Navbar from "../components/Navbar";

function Nearby_trader() {
    return (
    <div style={{ paddingRight: '16rem' }}> 
      <h1>Nearby Traders</h1>
      {/* Your page content */}
      <Navbar activeItem="nearby-traders" />
    </div>
    );
}

export default Nearby_trader;