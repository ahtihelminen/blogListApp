import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password,
}) => {
    return (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={handleUsernameChange}
                        id="username_field"
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={handlePasswordChange}
                        id="password_field"
                    />
                </div>
                <button type="submit" id="login_button">
                    login
                </button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.string.isRequired,
    handleUsernameChange: PropTypes.string.isRequired,
    handlePasswordChange: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
}

export default LoginForm
