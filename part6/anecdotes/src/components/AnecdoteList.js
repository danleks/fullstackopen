import { useDispatch, useSelector } from 'react-redux'
import { increaseVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteListItem = ({ anecdote: { id, content, votes }, handleVote }) => {
  return (
    <li className='listItem' id={id} key={id} style={{ margin: '20px' }}>
      <div>
        <span>{content}</span>
      </div>
      <div>
        <span className='votes'>has {votes}</span>
        <button onClick={handleVote}>vote</button>
      </div>
    </li>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)
  const sortedAnecdotes = useSelector(state => {
    return [...state.anecdotes]
      .sort((a, b) => b.votes - a.votes)
      .filter(s => s.content.toLowerCase().includes(filter.toLowerCase()))
  })

  const handleVote = (anecdote) => {
    dispatch(increaseVote(anecdote))
    console.log(setNotification(`you voted ${anecdote.content}`))
    dispatch(setNotification(`you voted ${anecdote.content}`))
  }

  return (
    <ul className='list' style={{ listStyle: 'none' }}>
      {sortedAnecdotes
        .map(anecdote => (
          <AnecdoteListItem key={anecdote.id} anecdote={anecdote} handleVote={() => handleVote(anecdote)}/>
        ))}
    </ul>
  )
}

export default AnecdoteList