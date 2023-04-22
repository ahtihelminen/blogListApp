import React from 'react'

const LoggedIn = ({ user, handleLogout }) => (
    <div>
        <form onSubmit={handleLogout}>
            <p>
                User {user.name} logged in
                <button type="submit" id="logout_button">
                    logout
                </button>
            </p>
        </form>
    </div>
)

export default LoggedIn
