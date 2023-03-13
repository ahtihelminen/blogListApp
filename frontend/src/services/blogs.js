import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {

  const response = await axios.get(baseUrl)
  return response.data
}

const postNewBlog = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response
}

const likeBlog = async updatedBlog => {
  const config = {
    headers: { Authorization: token }
  }
  const idUrl = `api/blogs/${updatedBlog.id}`
  const response = await axios.put(idUrl, updatedBlog, config)

  return response
}

const removeBlog = async blog => {
  const config = {
    headers: { Authorization: token }
  }
  const idUrl = `api/blogs/${blog.id}`
  const response = await axios.delete(idUrl, config)

  return response
}

export default { setToken, getAll, postNewBlog, likeBlog, removeBlog }