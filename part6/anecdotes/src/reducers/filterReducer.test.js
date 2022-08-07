import filterReducer from './filterReducer'
import deepFreeze from 'deep-freeze'

describe('<FilterReducer />', () => {
  it('return default state, when no value present', () => {
    const state = ''
    const action = {
      type: 'unknown',
      action: ''
    }

    const newState = filterReducer(state, action)

    expect(newState).toEqual(state)
  })
  it('updates state when new value is provided', () => {
    const state = ''
    deepFreeze(state)

    const action = {
      type: 'filter/createFilter',
      payload: 'firs'
    }

    const newState = filterReducer(state, action)
    expect(newState).toContain('firs')
  })
})