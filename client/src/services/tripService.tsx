import axios from "axios"
import { apiUrl } from "../util/config"

export const getTotalDistanceForUser = async (token: string) => {
  try {
    const authHeader = {"headers": {
      "Authorization": "Bearer " + token
  }}
    const response = await axios.get(`${apiUrl}/api/trips/total-distance`, authHeader)
    return response.data
  } catch(err) {
    console.error("Error fetching total distance for user", err)
  }
}

export default { getTotalDistanceForUser }