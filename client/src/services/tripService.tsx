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

export const getTripsBetweenDates = async (uid: string | undefined, startTime: Date, endTime: Date) => {
  try {
    const response = await axios.get(`${apiUrl}/api/users/${uid}/trips/date-range`, {
      params: {
        startTime,
        endTime
      }
    })

    console.log(response)

    return response.data
  } catch(err) {
    console.error("Error fetching trips between dates", err)
  }
}

export default { getTotalDistanceForUser, getTripsBetweenDates }