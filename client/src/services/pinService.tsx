import axios from "axios"

export const getAll = async () => {
  return await axios.get('http://localhost:3000/api/coordinates')
}

export default { getAll }