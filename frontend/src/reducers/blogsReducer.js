import { createSlice } from '@reduxjs/toolkit'

import blogsService from '../services/blogsService'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      state = action.payload
      return state
    },
    appendBlog(state, action) {
      state.push(action.payload)
      return state
    }
  }
})

export const { setBlogs, appendBlog } = blogsSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    let blogs = await blogsService.getAll()
    blogs = blogs.sort((a, b) => b.likes - a.likes)
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogsService.createBlog(content)
    dispatch(appendBlog(newBlog))
  }
}

export default blogsSlice.reducer