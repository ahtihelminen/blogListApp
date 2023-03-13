import React  from 'react'
import { useState, useEffect, useRef } from 'react'

import LoginForm from './components/LoginForm'
import LoggedIn from './components/LoggedIn'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Headers from './components/Headers'
import TogglableBlogs from './components/TogglableBlogs'

import blogService from './services/blogs'
import loginService from './services/login'

import './index.css'
import CreateBlogForm from './components/BlogForm'
import Blog from './components/Blog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogCreated, setBlogCreated] = useState('')
  const [blogUpdated, setBlogUpdated] = useState('')
  const [blogRemoved, setBlogRemoved] = useState('')
  const [notificationIdentity, setNotificationIdentity] = useState(0)
  const [notificationMessage, setNotificationMessage] = useState('')


  useEffect(() => {
    async function getBlogs() {
      const response = await blogService.getAll()
      response.sort((a, b) => b.likes-a.likes)
      setBlogs(response)
    }
    getBlogs()
  }, [blogCreated, blogUpdated, blogRemoved])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotificationIdentity(2)
      setNotificationMessage(`Logged in as user ${username}`)
      setTimeout(() => {
        setNotificationIdentity(0)
        setNotificationMessage('')
      }, 5000)
    }
    catch (exception) {
      console.log('wrong credentials')
      setNotificationIdentity(1)
      setNotificationMessage('wrong username or password')
      setTimeout(() => {
        setNotificationIdentity(0)
        setNotificationMessage('')
      }, 5000)
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
        setNotificationIdentity(2)
        setNotificationMessage(`${response.data.title} by ${response.data.author} created`)
        setTimeout(() => {
          setNotificationIdentity(0)
          setNotificationMessage('')
        }, 5000
        )
      }
    } catch (exception) {
      setNotificationIdentity(1)
      setNotificationMessage(`error in creating new blog: ${exception.message}`)
      setTimeout(() => {
        setNotificationIdentity(0)
        setNotificationMessage('')
      }, 5000)
    }
  }

  const handleLike = async (event, updatedBlog) => {
    event.preventDefault()
    try {
      const response = await blogService.likeBlog(updatedBlog)
      if (response.status === 204) {
        setBlogUpdated(response)
        setNotificationIdentity(3)
        setNotificationMessage(`Blog ${updatedBlog.title} by ${updatedBlog.author} liked!`)
        setTimeout(() => {
          setNotificationIdentity(0)
          setNotificationMessage('')
        }, 5000)
      }
    } catch (exception) {
      setNotificationIdentity(1)
      setNotificationMessage(`error while liking: ${exception.message}`)
      setTimeout(() => {
        setNotificationIdentity(0)
        setNotificationMessage('')
      }, 5000)
    }
  }

  const handleDeleteBlog = async (event, blog) => {
    event.preventDefault()
    try {
      const response = await blogService.removeBlog(blog)
      if (response.status === 204) {
        setBlogRemoved(response)
        setNotificationIdentity(2)
        setNotificationMessage(`Blog ${blog.title} by ${blog.author} removed succesfully`)
        setTimeout(() => {
          setNotificationIdentity(0)
          setNotificationMessage('')
        }, 5000)
      }
    } catch (exception){
      setNotificationIdentity(1)
      setNotificationMessage(`error removing blog: ${exception.message}`)
      setTimeout(() => {
        setNotificationIdentity(0)
        setNotificationMessage('')
      }, 5000)
    }
  }

  const blogFormRef = useRef()

  return (
    <div>
      <Headers.one value={'Bloglistapp'}/>
      <Notification identity={notificationIdentity} message={notificationMessage}/>
      {user === null
        ?
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
        :
        <div>
          <LoggedIn user={user} handleLogout={handleLogout}/>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <CreateBlogForm
              handleCreateBlog={handleCreateBlog}
            />
          </Togglable>
          <div>
            <Headers.two value={'Blogs'}/>
            <div>
              {blogs.map(blog =>
                <div key={blog.id} className="blog">
                  <TogglableBlogs buttonLabel='view' blog={blog}>
                    <Blog blog={blog} handleLike={handleLike} handleDeleteBlog={handleDeleteBlog} username={user.username}/>
                  </TogglableBlogs>
                </div>
              )}
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default App