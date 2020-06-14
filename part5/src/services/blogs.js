import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = tk => {
  token = `bearer ${tk}`
}

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(response => response.data)
}

const newBlog = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.post(baseUrl, newBlog, config)
  return res.data
}

export default { getAll, newBlog, setToken }