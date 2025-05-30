import React, { useContext } from "react";
import Navbar from "../components/Navbar";

function Offers() {
    return (
    <div style={{ paddingRight: '16rem' }}> 
      <h1>Offers</h1>
      <Navbar activeItem="nearby-traders" />
    </div>
    );
}

export default Offers;