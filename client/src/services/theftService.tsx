import axios from "axios"
import { apiUrl } from "../util/config"
import { LatLng } from "leaflet"

export const getAllThefts = async () => {
  return await axios.get(`${apiUrl}/api/bike_thefts`)
}

export const sendTheftReport = async (coordinates: LatLng) => {
  const res = await axios.post(`${apiUrl}/api/bike_thefts`, coordinates)
  return res.data
}

export default { getAllThefts, sendTheftReport }