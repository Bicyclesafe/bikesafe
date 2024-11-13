import axios from "axios"
import { apiUrl } from "../util/config"

export const getCurrentGoalsForUser = async (token: string) => {
  try {
    const authHeader = {"headers": {
      "Authorization": "Bearer " + token
    }}
    const response = await axios.get(`${apiUrl}/api/goals/current`, authHeader)
    return response.data
  } catch(err) {
    console.error("Error fetching current goals for user", err)
  }
}

export default { getCurrentGoalsForUser }