import React, { useContext } from "react";
import Topbar from "../components/Topbar";

function Messages() {
    return (
    <div> 
      <Topbar showSearch={false} showFilters={false} />
    </div>
    );
}

export default Messages;