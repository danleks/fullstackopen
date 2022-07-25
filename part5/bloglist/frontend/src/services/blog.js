import axios from 'axios'
const baseUrl = '/api/blogs'
let token

// UPDATE
// DELETE

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const read = async () => {
  const response = await axios.get(baseUrl)
  console.log(response)
  return response.data
}

const create = async newNote => {
  const config = {
    headers: {
      'authorization': token
    }
  }
  const response = await axios.post(baseUrl, newNote, config)
  return response.data
}
export default {
  read,
  create,
  setToken,
}