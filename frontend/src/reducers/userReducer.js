import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: 'root',
  reducers: {
    setUser(state, action) {
      console.log(action.payload)
      return action.payload
    },
  }
})




export const { setUser } = userSlice.actions



export default userSlice.reducer