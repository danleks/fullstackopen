import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const read = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (content) => {
  const newNote = {
    content,
    votes: 0
  }
  const response = await axios.post(baseUrl, newNote)
  return response.data
}

const update = async (anecdote) => {
  const updatedAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1
  }
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, updatedAnecdote)
  return response.data
}

export default {
  read,
  create,
  update,
}