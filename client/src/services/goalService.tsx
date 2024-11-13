import axios from "axios"
import { apiUrl } from "../util/config"

export const getCurrentGoalsForUser = async (token: string) => {
  try {
    const authHeader = {"headers": {
      "Authorization": "Bearer " + token
    }}
    const response = await axios.get(`${apiUrl}/api/goals/current`, authHeader)
    return response.data
  } catch(err) {
    console.error("Error fetching current goals for user", err)
  }
}

export const addGoal = async (token: string, goal: string, startTime: Date, endTime: Date) => {
  try {
    const authHeader = {"headers": {
      "Authorization": "Bearer " + token
    }}
    const data = {goal, startTime, endTime}
    const response = await axios.post(`${apiUrl}/api/goals`,data, authHeader)
    return response.data
  } catch(err) {
    console.error("Error fetching current goals for user", err)
  }
}

export default { getCurrentGoalsForUser, addGoal }