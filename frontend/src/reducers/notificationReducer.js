import { createSlice } from '@reduxjs/toolkit' 


const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: 'init message',
    identity: 0,
  },
  reducers: {
    setMessage(state, action) {
      state.message = action.payload
    },
    setIdentity(state, action) {
      state.identity = action.payload
    }
  }
})

export const { setMessage, setIdentity } = notificationSlice.actions

export const setNotification = (message, identity, timeInSeconds) => {
  return dispatch => {
    dispatch(setMessage(message))
    dispatch(setIdentity(identity))
    setTimeout(() => {
      dispatch(setMessage(''))
      dispatch(setIdentity(0))
    }, timeInSeconds*1000)
  }
}

export default notificationSlice.reducer