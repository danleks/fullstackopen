import axios from 'axios'
const baseUrl = '/api/blogs'
let token

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const read = async () => {
  const response = await axios.get(baseUrl)
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

const update = async (id, updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog)
  return response.data
}

const remove = async id => {
  const config = {
    headers: {
      'authorization': token
    }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default {
  read,
  create,
  update,
  remove,
  setToken,
}