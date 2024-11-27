import axios from "axios"
import { apiUrl } from "../util/config"
import { BaseTrip, TripProps } from "../types"

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

export const getSumOfTripsBetweenDates = async (token: string, startTime: Date, endTime: Date) => {
  try {
    const authHeader = {"headers": {
      "Authorization": "Bearer " + token
    }}
    const response = await axios.get(`${apiUrl}/api/trips/sum-date-range`, {
      ...authHeader,
      params: {
        startTime,
        endTime
      },
    })

    return response.data
  } catch(err) {
    console.error("Error fetching sum of trips between dates", err)
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

export const addWorkTrip = async (token: string, trip: BaseTrip) => {
  try {
    const authHeader = {"headers": {
      "Authorization": "Bearer " + token
    }}

    const response = await axios.post(`${apiUrl}/api/trips/commute`, trip, authHeader)
    return response.data
  } catch(err) {
    console.error("", err)
  }
}

export const addTrip = async (token: string, trip: TripProps) => {
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

export const getAllTrips = async (token: string, year: string, month?: string | null) => {
  try {
    const authHeader = {"headers": {
      "Authorization": "Bearer " + token
    }}

    const response = await axios.get(`${apiUrl}/api/trips`, {
      ...authHeader,
      params: {
        year,
        month
      },
    })
    return response.data
  } catch(err) {
    console.error("", err)
  }
}

export const getTripsForAllUsers = async (token: string, startTime: Date, endTime: Date) => {
  try {
    const authHeader = {"headers": {
      "Authorization": "Bearer " + token
    }}

    const response = await axios.get(`${apiUrl}/api/trips/all-users`, {
      ...authHeader,
      params: {
        startTime,
        endTime
      },
    })
    return response.data
  } catch(err) {
    console.error("", err)
  }


}

export default {
  getTotalDistanceForUser,
  getTripsBetweenDates,
  getAllTrips,
  getSumOfTripsBetweenDates,
  addWorkTrip,
  addTrip,
}