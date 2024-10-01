import axios from "axios"
import { apiUrl } from "../util/config"
import { LatLng } from "leaflet"

export const getAllLockStations = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/lock_stations`)
    return response.data
  } catch(err) {
    console.error("Error in adding lock station", err) 
    throw new Error("There was an error in adding the lock station")
  }
}

export const addLockStation = async (coordinates: LatLng) => {
  try {
    const res = await axios.post(`${apiUrl}/api/lock_stations`, coordinates)
    return res.data
  } catch(err) {
    console.error("Error in adding lock station", err)
    throw new Error("There was an error in adding the lock station")
  }
}

export default { getAllLockStations, addLockStation }