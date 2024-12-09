import axios from "axios"
import { apiUrl } from "../util/config"

export const addCommuteDistance = async (token: string, distance: number) => {
  try {
		const authHeader = {"headers": {
				"Authorization": "Bearer " + token
		}}
		const response = await axios.post(`${apiUrl}/api/commute`, {distance}, authHeader)
		console.log(response.data)
		} catch(err) {
		console.error("Error in saving the commute distance", err)
  }
}

export const getCommuteDistance = async (token: string) => {
	try {
		const authHeader = {"headers": {
				"Authorization": "Bearer " + token
		}}

		const response = await axios.get(`${apiUrl}/api/commute`, authHeader)
		console.log(typeof(response.data), "response")
    return response.data
	} catch(err) {
		console.error("Error in saving the commute distance", err)
  }
}
