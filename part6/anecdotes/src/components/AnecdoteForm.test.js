import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import AnecdoteForm from './AnecdoteForm'
import { createStore } from 'redux'
import anecdoteReducer from '../reducers/anecdoteReducer'
import { Provider } from 'react-redux'

const store = createStore(anecdoteReducer)

describe('<AnecdoteForm />', () => {
  test('renders component', () => {
    render(<Provider store={store}><AnecdoteForm /></Provider>)
  })
  test('user can type text into input and click add button. After clicking add button input is cleared', async () => {
    render(<Provider store={store}><AnecdoteForm /></Provider>)
    const input = screen.getByPlaceholderText('add new anecdote')
    const button = screen.getByRole('button')
    const user = userEvent.setup()

    await user.type(input, 'testing functionality')
    await user.click(button)
  })
})