import axios from "axios"
import { apiUrl } from "../util/config"

export const getCompany = async (token: string) => {
  try {
    const authHeader = {"headers": {
      "Authorization": "Bearer " + token
  }}
    const response = await axios.get(`${apiUrl}/api/companies`, authHeader)
    return response.data
  } catch(err) {
    console.error("Error fetching company (Service: companyService)", err)
  }
}

export default { getCompany }