import React from "react";
import {
  useNavigate
} from 'react-router-dom'

import { Button } from 'react-bootstrap'

import LoggedIn from "./LoggedIn"
import Notification from "./Notification"
import Headers from './Headers'


const MenuBar = ({ user, handleLogout }) => {
  
  const navigate = useNavigate()

  const navigationHandler = (event, relativeDir) => {
    event.preventDefault()
    navigate(relativeDir)
  }


  return (
    <div className="grid-container" id="menubar1">
      <div class="header">
        <Headers.one value={'Bloglistapp'} />
      </div>
      <div class="blogs">
        <Button variant='outline-primary' onClick={(event) => navigationHandler(event, '/blogs')}>
        blogs
        </Button>
      </div>
      <div class="users">
        <Button variant='outline-primary' onClick={(event) => navigationHandler(event, '/users')}>
        users
        </Button>
      </div>
      <div class="empty">
      </div>
      <div class="logout">
        <LoggedIn user={user} handleLogout={handleLogout} />
      </div>
      <div class="notification">
        <Notification />
      </div>
    </div>
  )
}

export default MenuBar