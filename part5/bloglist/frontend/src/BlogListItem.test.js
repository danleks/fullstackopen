import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import BlogListItem from './BlogListItem'

const blog = {
  title: 'user: jest',
  author: 'author: jest',
  url: 'url: www',
  likes: 0,
  user: {
    username: 'jest',
  }
}
const testUser = {
  username: 'jest'
}

describe('<BlogListItem />', () => {
  beforeEach(() => {
    window.localStorage.setItem('LOGGED_IN_USER', JSON.stringify(testUser))
  })
  test('component is rendered and only blog title and author', () => {

    const mockLike = jest.fn()
    const mockDelete = jest.fn()

    render(<BlogListItem blog={blog} handleLike={mockLike} handleDelete={mockDelete} />)

    const username = screen.getByText('user', { exact: false })
    const author = screen.getByText('author', { exact: false })

    expect(username).toBeDefined()
    expect(author).toBeDefined()
  })
  test('the blog\'s url and number of likes are shown when the button controlling the shown details has been clicked', async () => {
    const user = userEvent.setup()
    const mockLike = jest.fn()
    const mockDelete = jest.fn()

    const container = render(<BlogListItem blog={blog} handleLike={mockLike} handleDelete={mockDelete} />).container

    const showButton = container.querySelector('.showButton')
    await user.click(showButton)

    const url = screen.getByText('url', { exact: false })
    const likes = screen.getByText('likes', { exact: false })

    expect(url).toBeDefined()
    expect(likes).toBeDefined()
  })
  test('if like button is clicked twice, the event handler the component received as props is called twice', async () => {
    const user = userEvent.setup()
    const mockLike = jest.fn()
    const mockDelete = jest.fn()

    const container = render(<BlogListItem blog={blog} handleLike={mockLike} handleDelete={mockDelete} />).container

    const showButton = container.querySelector('.showButton')
    await user.click(showButton)

    const likeButton = container.querySelector('.likeButton')

    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockLike.mock.calls).toHaveLength(2)
  })
})

