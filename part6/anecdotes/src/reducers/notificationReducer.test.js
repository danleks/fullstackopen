import notificationReducer from './notificationReducer'
import deepFreeze from 'deep-freeze'

describe('<Notification />', () => {
  it('returns initial state by default', () => {
    const action = {
      type: 'unknown',
      payload: ''
    }

    const newState = notificationReducer(undefined, action)
    expect(newState).toContain('')
  })
  it('renders new notification when user votes for an anecdote', () => {
    const state = ''
    deepFreeze(state)

    const action = {
      type: 'notification/addNotification',
      payload: 'If it hurts, do it more often'
    }

    const newState = notificationReducer(state, action)
    expect(newState).toContain('If it hurts, do it more often')
  })
  it('removes notification after 5 sek', () => {
    const state = ''
    deepFreeze(state)

    const action = {
      type: 'notification/removeNotification',
      payload: ''
    }

    const newState = notificationReducer(state, action)
    expect(newState).toEqual('')
  })
})