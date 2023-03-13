import React from 'react'
import { useState } from 'react'

const CreateBlogForm = ({ handleCreateBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuhtor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const blogHandler = async (event) => {
    const newBlog = {
      title: newBlogTitle,
      author: newBlogAuhtor,
      url: newBlogUrl
    }
    await handleCreateBlog(event, newBlog)
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  return (
    <div>
      <form onSubmit={blogHandler}>
        <div>
          title:
          <input
            type="text"
            value={newBlogTitle}
            name="title"
            onChange={({ target }) => setNewBlogTitle(target.value)}
            placeholder='title textbox'
            id='title_textbox'
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={newBlogAuhtor}
            name="author"
            onChange={({ target }) => setNewBlogAuthor(target.value)}
            placeholder='author textbox'
            id='author_textbox'
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={newBlogUrl}
            name="url"
            onChange={({ target }) => setNewBlogUrl(target.value)}
            placeholder='url textbox'
            id='url_textbox'
          />
        </div>
        <button type='submit' id='create_button'>create</button>
      </form>
    </div>
  )
}

export default CreateBlogForm