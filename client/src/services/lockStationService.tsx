import axios from "axios"
import { apiUrl } from "../util/config"
import { LatLng } from "leaflet"

export const getAllLockStations = async () => {
  return await axios.get(`${apiUrl}/api/lock_stations`)
}

export const addLockStation = async (coordinates: LatLng) => {
  const res = await axios.post(`${apiUrl}/api/lock_stations`, coordinates)
  return res.data
}

export default { getAllLockStations, addLockStation }