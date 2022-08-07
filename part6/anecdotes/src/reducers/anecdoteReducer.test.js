import deepFreeze from 'deep-freeze'
import anecdoteReducer from './anecdoteReducer'
import { initialState } from './anecdoteReducer'

describe('anecdoteReducer()', () => {
  test('returns initial state, if state is undefined', () => {
    const action = { type: 'UNKNOWN' }
    const newState = anecdoteReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })
  test('clicking vote button increases the number of votes and saves it to redux store', () => {
    const state = initialState
    deepFreeze(state)

    const action = {
      type: 'anecdotes/increaseVote',
      payload: {
        id: state[0].id
      }
    }

    const newState = anecdoteReducer(state, action)

    expect(newState).toContainEqual({
      id: newState[0].id,
      content: newState[0].content,
      votes: 1,
    })
  })
  test('clicking add button adds new anecdote and saves it to redux store', () => {
    const state = initialState
    deepFreeze(state)

    const action = {
      type: 'anecdotes/addAnecdote',
      payload: 'testing functionality'
    }

    const newState = anecdoteReducer(state, action)

    expect(newState).toContainEqual(expect.objectContaining({ content: 'testing functionality' }))
  })
})