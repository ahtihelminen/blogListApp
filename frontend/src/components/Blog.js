import React from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleDeleteBlog, username }) => {
  const likeHandler = async (event) => {
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id
    }

    await handleLike(event, updatedBlog)
  }

  const deleteHandler = async (event) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`))
      await handleDeleteBlog(event, blog)
  }

  return (
    <div className="blogTest">
      {username === blog.user.username 
      ? (
        <div>
          <form onSubmit={likeHandler}>
            {blog.url} <br></br>
            {blog.likes} &nbsp;{' '}
            <button type="submit" id="like_button">
              like
            </button>{' '}
            <br></br>
            {blog.user.name}
          </form>
          <form onSubmit={deleteHandler}>
            <button type="submit" id="remove_button">
              remove
            </button>
          </form>
        </div>
      ) 
      : (
        <div>
          <form onSubmit={likeHandler}>
            {blog.url} <br></br>
            {blog.likes} &nbsp;{' '}
            <button type="submit" id="like_button">
              like
            </button>{' '}
            <br></br>
            {blog.user.name}
          </form>
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog
