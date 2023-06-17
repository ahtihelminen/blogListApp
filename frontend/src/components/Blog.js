import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Row, Col } from 'react-bootstrap'

import Headers from './Headers'

const Blog = ({ blog, handleLike, handleComment, handleDeleteBlog, username }) => {
  const [newComment, setNewComment] = useState('')
  
  
  const likeHandler = async (event) => {
    const updatedBlog = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1
    }

    await handleLike(event, updatedBlog)
  }

  const commentHandler = async (event) => {
    const updatedBlog = {
      ...blog,
      user: blog.user.id,
      comments: [...blog.comments, newComment]
    }


    await handleComment(event, updatedBlog)
    setNewComment('')
  }


  const deleteHandler = async (event) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`))
      await handleDeleteBlog(event, blog)
  }

  return (
    <div className="blogTest">
      <div>
        <Headers.two value={`${blog.title} ${blog.author}`} />
        <form onSubmit={likeHandler}>
          <a href={`${blog.url}`}>{blog.url}</a> 
          <br></br>
          {blog.likes} &nbsp;{' '}
          <Button variant='outline-primary' type="submit" id="like_button">
            like
          </Button>{' '}
          <br></br>
        </form>
      </div>
      {username === blog.user.username ? (
        <div>
          <form onSubmit={deleteHandler}>
            Added by you &nbsp;
            <Button variant='outline-danger' type="submit" id="remove_button">
              remove
            </Button>
          </form>
        </div>
      ) : (
        <div>
          Added by {blog.user.name}
        </div>
      )}
      <Headers.three value={'comments'} />
      <form onSubmit={commentHandler}>
        <input
          type='text'
          value={newComment} 
          onChange={({ target }) => setNewComment(target.value)}
        >
        </input> &nbsp;
        <Button variant='outline-success' type='submit'>
          add comment
        </Button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment}>
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
