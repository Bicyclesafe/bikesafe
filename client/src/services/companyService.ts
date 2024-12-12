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

export const getCompanyStatistics = async (year: string, token: string) => {
  try {
    const authHeader = {"headers": {
      "Authorization": "Bearer " + token
    }}

    const response = await axios.get(`${apiUrl}/api/companies/${year}`, {
      ...authHeader,
    })

    return response.data
  } catch(err) {
    console.error("Error fetching company (Service: companyService, getCompanyStatistics)", err)
  }
}

export default { getCompany, getCompanyStatistics }