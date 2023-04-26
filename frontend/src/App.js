import React from 'react'
import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Routes,
  Route,
  Link,
  useMatch,
  useNavigate
} from 'react-router-dom'

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
import { initializeBlogs, likeBlog, deleteBlog } from './reducers/blogsReducer'
import { setUser } from './reducers/userReducer'
import UsersRoute from './Routes/UsersRoute'
import UserRoute from './Routes/UserRoute'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogCreated, setBlogCreated] = useState(false)
  const [blogUpdated, setBlogUpdated] = useState(false)
  const [blogRemoved, setBlogRemoved] = useState(false)
  const [users, setUsers] = useState([])
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch, blogCreated, blogUpdated, blogRemoved])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    axios.get('/api/users').then(response => {
      setUsers(response.data)
      console.log(response.data)
    })
  }, [])

  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      blogService.setToken(user.token)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
      dispatch(setNotification(`Logged in as user ${username}`, 2, 5))
    } catch (exception) {
      console.log('wrong credentials')
      dispatch(setNotification('wrong username or password', 1, 5))
    }
  }

  const handleLogout = () => {
    dispatch(setUser(null))
    window.localStorage.removeItem('loggedUser')
  }

  const handleCreateBlog = async (event, newBlog) => {
    event.preventDefault()
    try {
      const response = await blogService.postNewBlog(newBlog)
      if (response.status === 201) {
        blogFormRef.current.toggleVisibility()
        setBlogCreated(response)
        dispatch(
          setNotification(
            `${response.data.title} by ${response.data.author} created`,
            2,
            5
          )
        )
      }
    } catch (exception) {
      dispatch(
        setNotification(
          `error in creating new blog: ${exception.message}`,
          1,
          5
        )
      )
    }
  }

  const handleLike = async (event, updatedBlog) => {
    event.preventDefault()
    try {
      if (await dispatch(likeBlog(updatedBlog))) {
        setBlogUpdated(!blogUpdated)
        dispatch(
          setNotification(
            `Blog ${updatedBlog.title} by ${updatedBlog.author} liked!`,
            3,
            5
          )
        )
      }
    } catch (exception) {
      dispatch(
        setNotification(`error while liking: ${exception.message}`, 1, 5)
      )
    }
  }

  const handleDeleteBlog = async (event, blog) => {
    event.preventDefault()
    try {
      if (await dispatch(deleteBlog(blog))) {
        setBlogRemoved(!blogRemoved)
        dispatch(
          setNotification(
            `Blog ${blog.title} by ${blog.author} removed succesfully`,
            2,
            5
          )
        )
      }
    } catch (exception) {
      dispatch(
        setNotification(`error removing blog: ${exception.message}`, 1, 5)
      )
    }
  }

  const blogFormRef = useRef()

  

  return (
    <div>
      <Headers.one value={'Bloglistapp'} />
      <Notification />
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
          <Routes>
            <Route path='/' element={      
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
            } />
            <Route path='/users' element={<UsersRoute users={users} />} />
            <Route path='/users/:id' element={<UserRoute users={users} />} />
          </Routes>
          </div>
        )}
    </div>
  )
}

export default App
