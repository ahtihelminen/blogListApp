import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  
  const blog = {
    title: 'Test blog title',
    author: 'Test Author',
    url: 'testurl.com',
    user: {
      name: 'Test User'
    }
  }
  
  const mockCreateBlogHandler = jest.fn(e => e.preventDefault())

  let container
  beforeEach(() => {
    container = render(
      <BlogForm handleCreateBlog={mockCreateBlogHandler} />
    ).container
  })
  
  test('blogform calls handleCreateBlog', async () => {
    const user = userEvent.setup()
    
    window.document.getSelection = jest.fn()

    const titleInput = screen.getByPlaceholderText('title textbox')
    await user.type(titleInput, blog.title)

    const authorInput = screen.getByPlaceholderText('author textbox')
    await user.type(authorInput, blog.author)

    const urlInput = screen.getByPlaceholderText('url textbox')
    await user.type(urlInput, blog.url)

    const button = screen.getByText('create')
    await user.click(button)

    expect(mockCreateBlogHandler.mock.calls).toHaveLength(1)
    expect(mockCreateBlogHandler.mock.calls[0][1]).toEqual({
      title: blog.title,
      author: blog.author,
      url: blog.url
    })

  })

})