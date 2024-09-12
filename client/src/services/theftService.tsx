import axios from "axios"
import { LatLng } from "leaflet"

export const sendTheftReport = async (coordinates: LatLng) => {
  const res = await axios.post('http://localhost:3000/api/coordinates', coordinates)
  return res.data
}