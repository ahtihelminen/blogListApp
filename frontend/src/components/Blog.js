import React from 'react'
import PropTypes from 'prop-types'

import Headers from './Headers'

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
      <div>
        <Headers.one value={`${blog.title} ${blog.author}`} />
        <form onSubmit={likeHandler}>
          <a href={`${blog.url}`}>{blog.url}</a> 
          <br></br>
          {blog.likes} &nbsp;{' '}
          <button type="submit" id="like_button">
            like
          </button>{' '}
          <br></br>
        </form>
      </div>
      {username === blog.user.username ? (
        <div>
          <form onSubmit={deleteHandler}>
            Added by you &nbsp;
            <button type="submit" id="remove_button">
              remove
            </button>
          </form>
        </div>
      ) : (
        <div>
          Added by {blog.user.name}
        </div>
      )}
      <Headers.three value={'comments'} />
      <ul>
        {blog.comments.map((comment) => (
          <li>
            {comment}
          </li>
        ))}
      </ul>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog
