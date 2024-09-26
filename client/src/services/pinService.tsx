import axios from "axios"
import { apiUrl } from "../util/config"

export const getAll = async () => {
  try {
    return await axios.get(`${apiUrl}/api/coordinates`)
  } catch (err) {
    console.error("Error in fetching pins", err)
    throw new Error("There was an error in fetching the pins.")

  }
}

export default { getAll }