import React from 'react'

const Notification = ({ identity, message }) => {

  if (identity === 0) {
    return null
  }

  if (identity === 1) {
    return (
      <div className='unauthorized'>
        {message}
      </div>
    )
  }

  if (identity === 2) {
    return (
      <div className='created'>
        {message}
      </div>
    )
  }

  if (identity === 3) {
    return (
      <div className="liked">
        {message}
      </div>
    )
  }
}



export default Notification