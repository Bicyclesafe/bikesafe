import axios from "axios"
import { apiUrl } from "../util/config"

export const getAll = async () => {
  return await axios.get(`${apiUrl}/api/coordinates`)
}

export default { getAll }