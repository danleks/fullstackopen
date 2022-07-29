import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm'

describe('<NewBlogForm />', () => {
  test('form calls the event handler it received as props with the right details when a new blog is created', async () => {
    const addNoteMock = jest.fn()
    const handleMessageMock = jest.fn()
    const user = userEvent.setup()

    render(<NewBlogForm addNote={addNoteMock} handleMessage={handleMessageMock} />)

    const title = screen.getByRole('textbox', { name: 'title' })
    const author = screen.getByRole('textbox', { name: 'author' })
    const url = screen.getByRole('textbox', { name: 'url' })
    const createBtn = screen.getByText('create')

    await user.type(title, 'testing new blog')
    await user.type(author, 'jest')
    await user.type(url, 'www')
    await user.click(createBtn)

    expect(addNoteMock.mock.calls[0][0].title).toBe('testing new blog')
    expect(addNoteMock.mock.calls[0][0].author).toBe('jest')
    expect(addNoteMock.mock.calls[0][0].url).toBe('www')
  })
})