import axios from "axios"
import { apiUrl } from "../util/config"

export const addUser = async (token: string) => {
  try {
    const authHeader = {"headers": {
      "Authorization": "Bearer " + token
  }}
    const data = null
    const response = await axios.post(`${apiUrl}/api/users`, data, authHeader)
    return response.data
  } catch(err) {
    console.error("Error adding user", err)
  }
}

export default { addUser }