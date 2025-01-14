import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './blogForm'

test('BlogForm calls the event handler it received as props with the right details when a new blog is created', async () => {
    const blog = {
        title: 'test-title',
        author: 'Test Author',
        likes: '5',
        url: 'www.test.com',
  }
    const createBlog = vi.fn()
    const user = userEvent.setup()
    render(<BlogForm addBlog={createBlog} />)

    const inputs = screen.getAllByRole('textbox')

    await user.type(inputs[0], 'testing a form...')
    await user.type(inputs[1], 'test author...')    
    await user.type(inputs[2], 'www.test.com...')

    const sendButton = screen.getByText('create')

    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    console.log(createBlog.mock.calls[0][0])
    expect(createBlog.mock.calls[0][0].title).toBe('testing a form...')
    expect(createBlog.mock.calls[0][0].author).toBe('test author...')
    expect(createBlog.mock.calls[0][0].url).toBe('www.test.com...')


})