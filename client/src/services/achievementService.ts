import axios from "axios"
import { apiUrl } from "../util/config"

export const getAchievements = async (token: string) => {
  try {
		const authHeader = {"headers": {
				"Authorization": "Bearer " + token
		}}
		const response = await axios.get(`${apiUrl}/api/achievements`, authHeader)
		return response.data
		} catch(err) {
		console.error("Error in fetching achievements", err)
  }
}

export const getAchievementsForUser = async (token: string) => {
  try {
		const authHeader = {"headers": {
				"Authorization": "Bearer " + token
		}}
		const response = await axios.get(`${apiUrl}/api/achievements/completed`, authHeader)
		return response.data
		} catch(err) {
		console.error("Error in fetching achievements for user", err)
  }
}