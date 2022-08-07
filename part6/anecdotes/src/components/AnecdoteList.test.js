import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import AnecdoteList from './AnecdoteList'
import ProviderHoc from '../store'

describe('<AnecdoteList />', () => {
  test.only('render the component', () => {
    render(<ProviderHoc><AnecdoteList /></ProviderHoc>)
    expect(screen.getByText('If it hurts, do it more often')).toBeInTheDocument()
  })
  test('clicking vote button increases votes by 1', async () => {
    const container = render(<ProviderHoc><AnecdoteList /></ProviderHoc>).container
    const user = userEvent.setup()
    const button = await screen.getAllByRole('button')[0]

    await user.click(button)

    expect(container.querySelector('.votes')).toHaveTextContent('has 1')
  })
})