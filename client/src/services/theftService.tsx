import axios from "axios"
import { apiUrl } from "../util/config"
import { LatLng } from "leaflet"

export const getAllThefts = async (token: string) => {
  try {
    const authHeader = {"headers": {
      "Authorization": "Bearer " + token
    }}
    const response = await axios.get(`${apiUrl}/api/bike_thefts`, authHeader)
    return response.data
  } catch(err) {
    console.error("Error in fetching thefts", err) 
    throw new Error("There was an error in fetching thefts")
  }
}

export const sendTheftReport = async (token: string, coordinates: LatLng) => {
  try {
    const authHeader = {"headers": {
      "Authorization": "Bearer " + token
    }}
    const res = await axios.post(`${apiUrl}/api/bike_thefts`, coordinates, authHeader)
    return res.data
  } catch(err) {
    console.error("Error adding bike theft:", err) 
    throw new Error("There was an error in adding the bike theft")
  }
}

export const deleteTheft = async (token: string, id: number) => {
  try {
    const authHeader = {"headers": {
      "Authorization": "Bearer " + token
    }}
    const res = await axios.delete(`${apiUrl}/api/bike_thefts/${id}`, authHeader)
    return res.data
  } catch(err) {
    console.error("Error deleting theftmarker:", err)
    throw new Error("There was an error in deleting the theftmarker")
  }
}

export default { getAllThefts, sendTheftReport, deleteTheft }