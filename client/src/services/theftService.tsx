import axios from "axios"
import { apiUrl } from "../util/config"
import { LatLng } from "leaflet"

export const sendTheftReport = async (coordinates: LatLng) => {
  const res = await axios.post(`${apiUrl}/api/coordinates`, coordinates)
  return res.data
}