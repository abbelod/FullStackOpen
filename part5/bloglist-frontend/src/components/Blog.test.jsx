import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', async () => {
  const blog = {
    title: 'test-title',
    author: 'Test Author',
    likes: '5',
    url: 'www.test.com',
  }
  const username = 'abbelod'

  const mockHandler = vi.fn()


  render(<Blog blog={blog} username={username} />)

  const element = screen.getByText('test-title Test Author')
  const likes = screen.queryByText('5')
  expect(element).toBeDefined()
  expect(likes).not.toBeInTheDocument();

  const user = userEvent.setup()
  const button = screen.getByText('show')
  await user.click(button)
  const like_element = screen.getByText('Likes: 5')
  const url_element = screen.getByText('Url: www.test.com')
  expect(like_element).toBeDefined()
  expect(url_element).toBeDefined()

})
