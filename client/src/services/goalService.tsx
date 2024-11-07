import axios from "axios"
import { apiUrl } from "../util/config"

export const getCurrentGoalsForUser = async (uid: string | undefined) => {
  try {
    const response = await axios.get(`${apiUrl}/api/users/${uid}/goals/current`)
    return response.data
  } catch(err) {
    console.error("Error fetching current goals for user", err)
  }
}

export default { getCurrentGoalsForUser }