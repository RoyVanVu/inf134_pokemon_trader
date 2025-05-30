import React, { useContext } from "react";
import Navbar from "../components/Navbar";

function Messages() {
    return (
    <div style={{ paddingRight: '16rem' }}> 
      <h1>Messages</h1>
      <Navbar activeItem="nearby-traders" />
    </div>
    );
}

export default Messages;