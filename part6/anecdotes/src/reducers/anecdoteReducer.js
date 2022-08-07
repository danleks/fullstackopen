import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    updateAnecdote(state, action) {
      return state.map(anecdote => anecdote.id === action.payload.id ? action.payload : anecdote)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})
export const { appendAnecdote, updateAnecdote, setAnecdotes } = anecdoteSlice.actions
export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotesAtStart = await anecdoteService.read()
    dispatch(setAnecdotes(anecdotesAtStart))
  }
}
export const addAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}
export const increaseVote = (anecdote) => {
  return async dispatch => {
    const returnedAnecdote = await anecdoteService.update(anecdote)
    dispatch(updateAnecdote(returnedAnecdote))
  }
}
export default anecdoteSlice.reducer