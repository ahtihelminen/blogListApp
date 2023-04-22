import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TogglableBlogs from './TogglableBlogs'
import Blog from './Blog'

describe('<TogglableBlogs />', () => {
    let container
    const blog = {
        title: 'Test blog title',
        author: 'Test Author',
        url: 'testurl.com',
        user: {
            name: 'Test User',
        },
    }

    const mockLikeHandler = jest.fn((e) => e.preventDefault())

    beforeEach(() => {
        container = render(
            <TogglableBlogs buttonLabel="view" blog={blog}>
                <Blog
                    blog={blog}
                    handleDeleteBlog={() => {}}
                    handleLike={mockLikeHandler}
                />
            </TogglableBlogs>
        ).container
    })

    test('renders its title and author', () => {
        screen.getAllByText('Test blog title Test Author')
    })

    test('in the beginning the children are not displayed', () => {
        const div = container.querySelector('.childrenVisible')
        expect(div).toHaveStyle('display: none')
    })

    test('after clicking "view" button -> children visible', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('view')

        window.document.getSelection = jest.fn()

        await user.click(button)

        const div = container.querySelector('.childrenVisible')
        expect(div).not.toHaveStyle('display: none')
    })

    test('clicking like button twice calls handleLike twice', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('like')

        await user.click(button)
        await user.click(button)

        expect(mockLikeHandler.mock.calls).toHaveLength(2)
    })
})
