import React from 'react'
import { Button } from 'react-bootstrap'

const LoggedIn = ({ user, handleLogout }) => 
  (
    
    <div>
      <form onSubmit={ handleLogout }>
        <p>
          User {user.name} logged in &nbsp;
          <Button variant='outline-primary' type="submit" id="logout_button">
            logout
          </Button>
        </p>
      </form>
    </div>
)

export default LoggedIn
