import axios from "axios"
import { apiUrl } from "../util/config"

export const getTotalDistanceForUser = async (uid: string | undefined) => {
  try {
    const response = await axios.get(`${apiUrl}/api/users/${uid}/total-distance`)
    return response.data
  } catch(err) {
    console.error("Error fetching total distance for user", err)
  }
}

export default { getTotalDistanceForUser }