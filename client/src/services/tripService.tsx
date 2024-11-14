import axios from "axios"
import { apiUrl } from "../util/config"
import { Trip } from "../types"

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

export const getTripsBetweenDates = async (token: string, startTime: Date, endTime: Date) => {
  try {
    const authHeader = {"headers": {
      "Authorization": "Bearer " + token
    }}
    const response = await axios.get(`${apiUrl}/api/trips/date-range`, {
      ...authHeader,
      params: {
        startTime,
        endTime
      },
    })

    return response.data
  } catch(err) {
    console.error("Error fetching trips between dates", err)
  }
}

export const addTrip = async (token: string, trip: Trip) => {
  try {
    const authHeader = {"headers": {
      "Authorization": "Bearer " + token
    }}

    const response = await axios.post(`${apiUrl}/api/trips`, trip, authHeader)
    return response.data
  } catch(err) {
    console.error("", err)
  }
}

export default {getTotalDistanceForUser, getTripsBetweenDates}