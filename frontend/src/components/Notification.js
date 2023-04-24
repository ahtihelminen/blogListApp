import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification.identity === 0) {
    return null
  }

  if (notification.identity === 1) {
    return <div className="unauthorized">{notification.message}</div>
  }

  if (notification.identity === 2) {
    return <div className="created">{notification.message}</div>
  }

  if (notification.identity === 3) {
    return <div className="liked">{notification.message}</div>
  }
}

export default Notification
