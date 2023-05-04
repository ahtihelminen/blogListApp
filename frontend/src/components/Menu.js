import React from "react";
import {
  Link 
} from 'react-router-dom'

import LoggedIn from "./LoggedIn";

const MenuBar = ({ user, handleLogout }) => {
  return (
    <div className="menuBar">
      <Link to='/blogs'>blogs</Link>
      <Link to='/users'>users</Link>
      <LoggedIn user={user} handleLogout={handleLogout} />
    </div>
  )
}

export default MenuBar