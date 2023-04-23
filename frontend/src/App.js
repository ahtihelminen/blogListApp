import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import LoginForm from './components/LoginForm'
import LoggedIn from './components/LoggedIn'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Headers from './components/Headers'
import TogglableBlogs from './components/TogglableBlogs'

import blogService from './services/blogsService'
import loginService from './services/loginService'

import './index.css'
import CreateBlogForm from './components/BlogForm'
import Blog from './components/Blog'

import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogsReducer'


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogCreated, setBlogCreated] = useState('')
  const [blogUpdated, setBlogUpdated] = useState('')
  const [blogRemoved, setBlogRemoved] = useState('')
 
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch, blogCreated, blogUpdated, blogRemoved])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogs = useSelector(state => state.blogs)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      dispatch(setNotification(
        `Logged in as user ${username}`,
        2,
        5
      ))
    } catch (exception) {
      console.log('wrong credentials')
      dispatch(setNotification(
        'wrong username or password',
        1,
        5
      ))
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }

  const handleCreateBlog = async (event, newBlog) => {
    event.preventDefault()
    try {
      const response = await blogService.postNewBlog(newBlog)
      if (response.status === 201) {
        blogFormRef.current.toggleVisibility()
        setBlogCreated(response)
        dispatch(setNotification(
          `${response.data.title} by ${response.data.author} created`,
          2,
          5
        ))
      }
    } catch (exception) {
      dispatch(setNotification(
        `error in creating new blog: ${exception.message}`,
        1,
        5
      ))
    }
  }

  const handleLike = async (event, updatedBlog) => {
    event.preventDefault()
    try {
      const response = await blogService.likeBlog(updatedBlog)
      if (response.status === 204) {
        setBlogUpdated(response)
        dispatch(setNotification(
          `Blog ${updatedBlog.title} by ${updatedBlog.author} liked!`,
          3,
          5
        ))
      }
    } catch (exception) {
      dispatch(setNotification(
        `error while liking: ${exception.message}`,
        1,
        5
      ))
    }
  }

  const handleDeleteBlog = async (event, blog) => {
    event.preventDefault()
    try {
      const response = await blogService.removeBlog(blog)
      if (response.status === 204) {
        setBlogRemoved(response)
        dispatch(setNotification(
          `Blog ${blog.title} by ${blog.author} removed succesfully`,
          2,
          5
        ))
      }
    } catch (exception) {
      dispatch(setNotification(
        `error removing blog: ${exception.message}`,
        1,
        5
      ))
    }
  }

  const blogFormRef = useRef()

  return (
    <div>
      <Headers.one value={'Bloglistapp'} />
      <Notification/>
      {user === null ? (
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      ) : (
        <div>
          <LoggedIn user={user} handleLogout={handleLogout} />
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <CreateBlogForm handleCreateBlog={handleCreateBlog} />
          </Togglable>
          <div>
            <Headers.two value={'Blogs'} />
            <div>
              {blogs.map((blog) => (
                <div key={blog.id} className="blog">
                  <TogglableBlogs buttonLabel="view" blog={blog}>
                    <Blog
                      blog={blog}
                      handleLike={handleLike}
                      handleDeleteBlog={handleDeleteBlog}
                      username={user.username}
                    />
                  </TogglableBlogs>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
