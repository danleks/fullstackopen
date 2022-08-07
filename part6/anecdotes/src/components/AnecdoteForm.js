import { addAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(addAnecdote(inputValue))
    dispatch(setNotification(`you added ${inputValue}`))

    setInputValue('')
  }

  const handleInputValue = (e) => {
    setInputValue(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input id='content' value={inputValue} onChange={handleInputValue} placeholder='add new anecdote'/>
      <button id='add' type='submit'>add</button>
    </form>
  )
}

export default AnecdoteForm