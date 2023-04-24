import { createSlice } from '@reduxjs/toolkit'

import blogsService from '../services/blogsService'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      console.log(action.payload)
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
      return state
    },
    updateBlogs(state, action) {
      const id = action.payload.id
      state = state.map(blog =>
        blog.id === id
        ? action.payload
        : blog
      )
      return state
    },
    removeBlog(state, action) {
      const id = action.payload.id
      state = state.filter(blog => blog.id !== id)
      return state
    }
  }
})

export const { setBlogs, appendBlog, updateBlogs } = blogsSlice.actions

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

export const likeBlog = (blogToUpdate) => {
  return async dispatch => {
    const response = await blogsService.likeBlog(blogToUpdate)
    if (response.status === 204) {
      dispatch(updateBlogs(response.data))
      return true
    }
    else {
      return false
    }
  }
}

export const deleteBlog = (blogToDelete) => {
  return async dispatch => {
    const response = await blogsService.removeBlog(blogToDelete)
    if (response.status === 204) {
      return true      
    }
    else {
      return false
    }
  }
}

export default blogsSlice.reducer