import React, { useContext } from "react";
import Navbar from "../components/Navbar";

function Search_card() {
    return (
    <div style={{ paddingRight: '16rem' }}> 
      <h1>Search card</h1>
      <Navbar activeItem="nearby-traders" />
    </div>
    );
}

export default Search_card;