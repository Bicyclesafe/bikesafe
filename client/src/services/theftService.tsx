import axios from "axios"
import { apiUrl } from "../util/config"
import { LatLng } from "leaflet"

export const getAllThefts = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/bike_thefts`)
    return response.data
  } catch(err) {
    console.error("Error in fetching thefts", err) 
    throw new Error("There was an error in fetching thefts")
  }
}

export const sendTheftReport = async (coordinates: LatLng) => {
  try {
    const res = await axios.post(`${apiUrl}/api/bike_thefts`, coordinates)
    return res.data
  } catch(err) {
    console.error("Error adding lock station:", err) 
    throw new Error("There was an error in adding the lock station")
  }
}

export const deleteTheft = async (id: number) => {
  try {
    const res = await axios.delete(`${apiUrl}/api/bike_thefts/${id}`)
    return res.data
  } catch(err) {
    console.error("Error deleting theftmarker:", err)
    throw new Error("There was an error in deleting the theftmarker")
  }
}

export default { getAllThefts, sendTheftReport, deleteTheft }